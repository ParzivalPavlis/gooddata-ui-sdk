// (C) 2019-2025 GoodData Corporation
import { IAttributeDescriptor, IMeasureDescriptor } from "@gooddata/sdk-model";
import { ITableGrandTotalRowDefinition, ITableRowDefinition } from "../../interfaces/rows.js";
import { ITotalsInfo } from "./collectTotalsInfo.js";
import { IMeasureDimensionInfo } from "./collectMeasureDimensionMeta.js";
import { IHeadersInfo } from "./collectHeadersInfo.js";
import { IDescriptorsInfo } from "./collectDescriptorsInfo.js";
import { ITranspositionInfo } from "./collectTranspositionInfo.js";

export function collectRowDefinitions(
    headersInfo: IHeadersInfo,
    descriptorsInfo: IDescriptorsInfo,
    measureDimensionInfo: IMeasureDimensionInfo,
    transpositionInfo: ITranspositionInfo,
    totalsInfo: ITotalsInfo,
) {
    const { rowGrandTotals } = totalsInfo;
    const { hasMeasures, measureGroupDescriptor } = measureDimensionInfo;
    const { rowHeaders } = headersInfo;
    const { descriptorByLocalId } = descriptorsInfo;
    const { isTransposed } = transpositionInfo;

    const rowDefinitions: ITableRowDefinition[] = [];

    // Collect value and subtotal row definitions
    rowHeaders.forEach((rowHeader) => {
        const isRowSubtotalScope = rowHeader.rowScope.some(
            (scope) => scope.type === "measureTotalScope" || scope.type === "attributeTotalScope",
        );

        const isRowValueScope =
            !isRowSubtotalScope &&
            rowHeader.rowScope.every(
                (scope) => scope.type === "measureScope" || scope.type === "attributeScope",
            );

        if (isRowSubtotalScope) {
            rowDefinitions.push({
                type: "subtotal",
                rowIndex: rowDefinitions.length,
                rowScope: rowHeader.rowScope,
            });
        } else if (isRowValueScope) {
            rowDefinitions.push({
                type: "value",
                rowIndex: rowDefinitions.length,
                rowScope: rowHeader.rowScope,
            });
        }
    });

    // Collect grand total row definitions
    const rowGrandTotalsToUse: ITableGrandTotalRowDefinition[] = [];

    rowGrandTotals.forEach((rowGrandTotal, rowGrandTotalIndex) => {
        const totalToExtend = rowGrandTotalsToUse.find((total) => total.totalType === rowGrandTotal.type);
        if (!isTransposed && totalToExtend) {
            totalToExtend.measureDescriptors.push(
                descriptorByLocalId[rowGrandTotal.measureIdentifier] as IMeasureDescriptor,
            );
        } else {
            rowGrandTotalsToUse.push({
                type: "grandTotal",
                rowIndex: rowDefinitions.length,
                measureDescriptors: [
                    descriptorByLocalId[rowGrandTotal.measureIdentifier] as IMeasureDescriptor,
                ],
                attributeDescriptor: descriptorByLocalId[
                    rowGrandTotal.attributeIdentifier
                ] as IAttributeDescriptor,
                totalType: rowGrandTotal.type,
                rowGrandTotalIndex,
            });
        }
    });

    if (rowGrandTotalsToUse.length > 0) {
        rowDefinitions.push(...rowGrandTotalsToUse);
    }

    if (hasMeasures && rowDefinitions.length === 0) {
        rowDefinitions.push({
            type: "value",
            rowIndex: rowDefinitions.length,
            rowScope: [
                {
                    type: "measureGroupScope",
                    descriptor: measureGroupDescriptor,
                },
            ],
        });
    }

    return {
        rowDefinitions,
    };
}
