// (C) 2019-2025 GoodData Corporation
import { IMeasureDimensionInfo } from "./collectMeasureDimensionMeta.js";

/**
 * @internal
 */
export type ITranspositionInfo = {
    isTransposed: boolean;
};

/**
 * @internal
 */
export function collectTranspositionInfo(measureDimensionInfo: IMeasureDimensionInfo) {
    const { hasMeasures, measureDimension } = measureDimensionInfo;

    const isTransposed = hasMeasures && measureDimension === "rows";

    return {
        isTransposed,
    };
}
