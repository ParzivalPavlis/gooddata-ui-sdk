// (C) 2023-2025 GoodData Corporation

import { ITigerClient } from "@gooddata/api-client-tiger";
import { IAutomationMetadataObject, IAutomationMetadataObjectDefinition } from "@gooddata/sdk-model";
import {
    IGetAutomationOptions,
    IGetAutomationsOptions,
    IWorkspaceAutomationService,
    IAutomationsQuery,
} from "@gooddata/sdk-backend-spi";

import { convertAutomation as convertAutomationFromBackend } from "../../../convertors/fromBackend/AutomationConverter.js";
import { convertAutomation as convertAutomationToBackend } from "../../../convertors/toBackend/AutomationConverter.js";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
import { AutomationsQuery } from "./automationsQuery.js";
import { getSettingsForCurrentUser } from "../settings/index.js";

export class TigerWorkspaceAutomationService implements IWorkspaceAutomationService {
    constructor(
        private readonly authCall: TigerAuthenticatedCallGuard,
        private readonly workspaceId: string,
    ) {}

    public getAutomations = async (options: IGetAutomationsOptions): Promise<IAutomationMetadataObject[]> => {
        const { loadUserData = false } = options ?? {};
        const enableAutomationFilterContext = await this.getEnableAutomationFilterContext();
        const enableNewScheduledExport = await this.getEnableNewScheduledExport();

        return this.authCall(async (client: ITigerClient) => {
            const result = await client.entities.getAllEntitiesAutomations({
                workspaceId: this.workspaceId,
                include: [
                    "notificationChannel",
                    "recipients",
                    "exportDefinitions",
                    "analyticalDashboard",
                    ...(loadUserData ? (["createdBy", "modifiedBy"] as const) : []),
                ],
                origin: "NATIVE", // ensures that no inherited automations are returned
            });

            const automations = result.data?.data || [];
            return automations.map((automation) =>
                convertAutomationFromBackend(
                    automation,
                    result.data.included ?? [],
                    enableAutomationFilterContext,
                    enableNewScheduledExport,
                ),
            );
        });
    };

    public getAutomationsQuery = (): IAutomationsQuery => {
        return new AutomationsQuery(this.authCall, {
            workspaceId: this.workspaceId,
        });
    };

    public getAutomation = async (
        id: string,
        options?: IGetAutomationOptions,
    ): Promise<IAutomationMetadataObject> => {
        const { loadUserData = false } = options ?? {};
        const enableAutomationFilterContext = await this.getEnableAutomationFilterContext();
        const enableNewScheduledExport = await this.getEnableNewScheduledExport();

        return this.authCall(async (client: ITigerClient) => {
            const result = await client.entities.getEntityAutomations({
                objectId: id,
                workspaceId: this.workspaceId,
                include: [
                    "notificationChannel",
                    "recipients",
                    "exportDefinitions",
                    "analyticalDashboard",
                    ...(loadUserData ? (["createdBy", "modifiedBy"] as const) : []),
                ],
            });
            return convertAutomationFromBackend(
                result.data.data,
                result.data.included ?? [],
                enableAutomationFilterContext,
                enableNewScheduledExport,
            );
        });
    };

    public createAutomation = async (
        automation: IAutomationMetadataObjectDefinition,
        options?: IGetAutomationOptions,
    ): Promise<IAutomationMetadataObject> => {
        const { loadUserData = false } = options ?? {};
        const enableAutomationFilterContext = await this.getEnableAutomationFilterContext();
        const enableNewScheduledExport = await this.getEnableNewScheduledExport();

        return this.authCall(async (client: ITigerClient) => {
            const convertedAutomation = convertAutomationToBackend(
                automation,
                enableAutomationFilterContext,
                enableNewScheduledExport,
            );
            const result = await client.entities.createEntityAutomations({
                workspaceId: this.workspaceId,
                jsonApiAutomationInDocument: {
                    data: convertedAutomation,
                },
                include: [
                    "notificationChannel",
                    "recipients",
                    "exportDefinitions",
                    "analyticalDashboard",
                    ...(loadUserData ? (["createdBy", "modifiedBy"] as const) : []),
                ],
            });

            return convertAutomationFromBackend(
                result.data.data,
                result.data.included ?? [],
                enableAutomationFilterContext,
                enableNewScheduledExport,
            );
        });
    };

    public updateAutomation = async (
        automation: IAutomationMetadataObject,
        options?: IGetAutomationOptions,
    ): Promise<IAutomationMetadataObject> => {
        const { loadUserData = false } = options ?? {};
        const enableAutomationFilterContext = await this.getEnableAutomationFilterContext();
        const enableNewScheduledExport = await this.getEnableNewScheduledExport();

        return this.authCall(async (client: ITigerClient) => {
            const convertedAutomation = convertAutomationToBackend(
                automation,
                enableAutomationFilterContext,
                enableNewScheduledExport,
            );
            const result = await client.entities.updateEntityAutomations({
                objectId: automation.id,
                workspaceId: this.workspaceId,
                jsonApiAutomationInDocument: {
                    data: convertedAutomation,
                },
                include: [
                    "notificationChannel",
                    "recipients",
                    "exportDefinitions",
                    "analyticalDashboard",
                    ...(loadUserData ? (["createdBy", "modifiedBy"] as const) : []),
                ],
            });
            return convertAutomationFromBackend(
                result.data.data,
                result.data.included ?? [],
                enableAutomationFilterContext,
                enableNewScheduledExport,
            );
        });
    };

    public deleteAutomation(id: string): Promise<void> {
        return this.authCall(async (client: ITigerClient) => {
            await client.entities.deleteEntityAutomations({ workspaceId: this.workspaceId, objectId: id });
        });
    }

    public unsubscribeAutomation(id: string): Promise<void> {
        return this.authCall(async (client: ITigerClient) => {
            await client.actions.unsubscribeAutomation({ workspaceId: this.workspaceId, automationId: id });
        });
    }

    private getEnableAutomationFilterContext = async (): Promise<boolean> => {
        const userSettings = await getSettingsForCurrentUser(this.authCall, this.workspaceId);
        return userSettings.enableAutomationFilterContext ?? true;
    };

    private getEnableNewScheduledExport = async (): Promise<boolean> => {
        const userSettings = await getSettingsForCurrentUser(this.authCall, this.workspaceId);
        return userSettings.enableNewScheduledExport ?? false;
    };
}
