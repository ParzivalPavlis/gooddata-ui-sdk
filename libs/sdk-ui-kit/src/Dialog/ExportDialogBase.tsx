// (C) 2020-2025 GoodData Corporation
import React from "react";
import cx from "classnames";
import noop from "lodash/noop.js";
import { IExportDialogBaseProps } from "./typings.js";
import { Checkbox } from "../Form/index.js";
import { ConfirmDialogBase } from "./ConfirmDialogBase.js";
import { usePropState } from "@gooddata/sdk-ui";
import { useIdPrefixed } from "../utils/useId.js";

/**
 * @internal
 */
export const ExportDialogBase = React.memo<IExportDialogBaseProps>(function ExportDialogBase({
    className,
    displayCloseButton = true,
    isPositive = true,
    isSubmitDisabled = false,

    headline = "Export to XLSX",
    cancelButtonText = "Cancel",
    submitButtonText = "Export",

    onCancel = noop,
    onSubmit = noop,

    filterContextText = "Include applied filters",
    filterContextTitle = "INSIGHT CONTEXT",
    filterContextVisible = true,

    mergeHeadersDisabled = false,
    mergeHeadersText = "Keep attribute cells merged",
    mergeHeadersTitle = "CELLS",

    includeFilterContext = true,
    mergeHeaders = true,
}) {
    const [isFilterContextIncluded, setIsFilterContextIncluded] = usePropState(includeFilterContext);
    const [shouldMergeHeaders, setShouldMergeHeaders] = usePropState(mergeHeaders);

    const mergeHeadersId = useIdPrefixed("mergeHeaders");

    const handleSubmit = React.useCallback(() => {
        onSubmit({
            includeFilterContext: isFilterContextIncluded,
            mergeHeaders: shouldMergeHeaders,
        });
    }, [isFilterContextIncluded, onSubmit, shouldMergeHeaders]);

    return (
        <ConfirmDialogBase
            className={cx("gd-export-dialog", className)}
            displayCloseButton={displayCloseButton}
            isPositive={isPositive}
            isSubmitDisabled={isSubmitDisabled}
            headline={headline}
            cancelButtonText={cancelButtonText}
            submitButtonText={submitButtonText}
            onCancel={onCancel}
            onSubmit={handleSubmit}
            initialFocus={mergeHeadersId}
        >
            {mergeHeadersTitle ? <h4>{mergeHeadersTitle}</h4> : null}
            <Checkbox
                id={mergeHeadersId}
                disabled={mergeHeadersDisabled}
                name="gs.dialog.export.checkbox.mergeHeaders"
                text={mergeHeadersText}
                value={shouldMergeHeaders}
                onChange={setShouldMergeHeaders}
            />
            {filterContextVisible ? (
                <div>
                    {filterContextTitle ? <h4>{filterContextTitle}</h4> : null}
                    <Checkbox
                        name="gs.dialog.export.checkbox.includeFilterContext"
                        text={filterContextText}
                        value={isFilterContextIncluded}
                        onChange={setIsFilterContextIncluded}
                    />
                </div>
            ) : null}
        </ConfirmDialogBase>
    );
});
