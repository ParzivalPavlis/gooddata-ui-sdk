// (C) 2007-2025 GoodData Corporation
import React from "react";
import cx from "classnames";
import { stringUtils } from "@gooddata/util";
import noop from "lodash/noop.js";
import { IButtonProps } from "./typings.js";

const getGeneratedTestId = (effectiveValue: React.ReactNode, title: string, ariaLabel: string) => {
    if (effectiveValue && typeof effectiveValue === "string") {
        return `${stringUtils.simplifyText(effectiveValue)}`;
    }
    return ariaLabel ? `${stringUtils.simplifyText(ariaLabel)}` : `${stringUtils.simplifyText(title)}`;
};

/**
 * @internal
 */
export class Button extends React.Component<IButtonProps> {
    public static defaultProps = {
        className: "",
        disabled: false,
        onClick: noop,
        tabIndex: 0,
        tagName: "button",
        type: "button",
        iconLeft: null as string,
        iconRight: null as string,
    };

    public buttonNode: HTMLElement;

    public render() {
        const {
            id,
            tagName,
            title,
            disabled,
            tabIndex,
            type,
            iconLeft,
            iconRight,
            accessibilityConfig,
            buttonRef,
            dataId,
            dataTestId,
        } = this.props;
        const {
            isExpanded,
            popupId,
            ariaLabel,
            ariaLabelledBy,
            ariaDescribedBy,
            role = "button",
        } = accessibilityConfig ?? {};
        const TagName = tagName as any;
        const effectiveValue = this.getEffectiveValue();

        const ariaDropdownProps = {
            ...(popupId && isExpanded ? { "aria-controls": popupId } : {}),
            ...(popupId ? { "aria-haspopup": !!popupId } : {}),
            ...(isExpanded !== undefined ? { "aria-expanded": isExpanded } : {}),
        };

        const testId = dataTestId ? dataTestId : getGeneratedTestId(effectiveValue, title, ariaLabel);

        return (
            <TagName
                id={id}
                data-id={dataId}
                ref={(ref: HTMLElement) => {
                    this.buttonNode = ref;
                    if (buttonRef) {
                        buttonRef.current = ref;
                    }
                }}
                title={title}
                className={this.getClassnames()}
                type={type}
                onClick={this._onClick}
                tabIndex={tabIndex}
                aria-disabled={disabled}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
                {...ariaDropdownProps}
                role={role}
                data-testid={testId}
            >
                {this.renderIcon(iconLeft)}
                {effectiveValue ? <span className="gd-button-text">{effectiveValue}</span> : null}
                {this.renderIcon(iconRight)}
            </TagName>
        );
    }

    private getEffectiveValue() {
        return this.props.value ?? this.props.children;
    }

    private getClassnames() {
        const { className, variant, size, intent, disabled } = this.props;
        const effectiveValue = this.getEffectiveValue();
        const generatedSeleniumClass =
            effectiveValue && typeof effectiveValue === "string"
                ? `s-${stringUtils.simplifyText(effectiveValue)}`
                : "";
        return cx([
            "gd-button",
            generatedSeleniumClass,
            className,
            {
                [`gd-button-${variant}`]: !!variant,
                [`gd-button-${size}`]: !!size,
                [`gd-button-${intent}`]: !!intent,
                disabled: disabled,
            },
        ]);
    }

    private _onClick = (e: React.MouseEvent) => {
        if (!this.props.disabled) {
            this.props.onClick(e);
        }
    };

    private renderIcon(icon: string) {
        if (!icon) {
            return null;
        }

        return (
            <span className={cx("gd-button-icon", icon)} data-testid="gd-button-icon" aria-hidden="true" />
        );
    }
}
