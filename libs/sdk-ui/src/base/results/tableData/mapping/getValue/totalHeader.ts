// (C) 2019-2025 GoodData Corporation
import { IResultTotalHeader } from "@gooddata/sdk-model";

/**
 * @internal
 */
export function getTotalHeaderValue(totalHeader: IResultTotalHeader): string {
    return totalHeader.totalHeaderItem.name;
}
