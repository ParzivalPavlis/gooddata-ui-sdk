// (C) 2025 GoodData Corporation

import React, { useEffect, useRef, useCallback } from "react";
import { makeDialogKeyboardNavigation } from "../@utils/keyboardNavigation.js";
import { getFocusableElements, isElementTextInput } from "../../utils/domUtilities.js";

type NavigationDirection = "forward" | "backward";

/**
 * @internal
 */
export interface UiFocusTrapProps {
    children: React.ReactNode;
    autofocusOnOpen?: boolean;
    onDeactivate?: () => void;
    /**
     * Specify the element to return focus to when the trap is deactivated/closed.
     * If a string is provided, the focus will be returned to the element with the given id.
     * If a ref is provided, the focus will be returned to the element referenced by the ref.
     */
    returnFocusTo?: React.RefObject<HTMLElement> | string;

    /**
     * If true, the focus will be returned to the element referenced by the returnFocusTo prop when the trap is unmounted.
     */
    returnFocusOnUnmount?: boolean;
    /**
     * Specify the element that should receive focus when the trap is activated.
     * If not provided, the first focusable element will be focused.
     */
    initialFocus?: React.RefObject<HTMLElement> | string;
    /**
     * Specify a custom keyboard navigation handler.
     * If not provided, the default keyboard navigation handler will be used.
     */
    customKeyboardNavigationHandler?: (event: KeyboardEvent) => void;
}

/**
 * Attempts to find a truly focusable element by trying subsequent elements in the focusable elements collection
 * This is useful when some elements are focusable but not reachable (e.g., out of viewport or disabled)
 */
const focusAndEnsureReachableElement = (
    initialElement: HTMLElement,
    focusableElements: NodeListOf<HTMLElement>,
    direction: NavigationDirection,
): void => {
    let nextElement = initialElement;
    let attempts = 0;
    const maxAttempts = focusableElements.length;

    nextElement.focus();

    while (nextElement !== document.activeElement && attempts < maxAttempts) {
        attempts++;
        const currentIndex = Array.from(focusableElements).indexOf(nextElement);
        const nextIndex =
            direction === "backward"
                ? (currentIndex - 1 + focusableElements.length) % focusableElements.length
                : (currentIndex + 1) % focusableElements.length;
        nextElement = focusableElements[nextIndex];
        nextElement?.focus();
    }
};

const useDialogKeyboardNavigation = (
    trapRef: React.RefObject<HTMLDivElement>,
    returnFocus,
    onDeactivate?: () => void,
) => {
    const handleFocusNavigation = useCallback(
        (focusableElements: NodeListOf<HTMLElement>, direction: NavigationDirection) => {
            const elements = Array.from(focusableElements);
            const currentIndex = elements.indexOf(document.activeElement as HTMLElement);
            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];

            let nextElement;

            if (direction === "backward") {
                // Shift + Tab - moving backwards
                nextElement = currentIndex <= 0 ? lastElement : elements[currentIndex - 1];
            } else {
                // Tab - moving forwards
                nextElement =
                    currentIndex === elements.length - 1 ? firstElement : elements[currentIndex + 1];
            }

            if (nextElement) {
                focusAndEnsureReachableElement(nextElement, focusableElements, direction);
            }
        },
        [],
    );

    const keyboardNavigationHandler = useCallback(
        (event: KeyboardEvent) => {
            if (!trapRef.current?.contains(event.target as Node)) {
                return;
            }

            return makeDialogKeyboardNavigation<KeyboardEvent>({
                onFocusNext: () => {
                    const { focusableElements } = getFocusableElements(trapRef.current);
                    if (!focusableElements?.length) {
                        return;
                    }
                    handleFocusNavigation(focusableElements, "forward");
                },
                onFocusPrevious: () => {
                    const { focusableElements } = getFocusableElements(trapRef.current);
                    if (!focusableElements?.length) {
                        return;
                    }
                    handleFocusNavigation(focusableElements, "backward");
                },
                onClose: () => {
                    onDeactivate?.();
                    returnFocus();
                },
            })(event);
        },
        [handleFocusNavigation, onDeactivate, returnFocus, trapRef],
    );

    return {
        keyboardNavigationHandler,
    };
};

/**
 * @internal
 */
export const UiFocusTrap: React.FC<UiFocusTrapProps> = ({
    children,
    onDeactivate,
    returnFocusTo: returnFocusToProp,
    autofocusOnOpen = false,
    returnFocusOnUnmount = true,
    initialFocus,
    customKeyboardNavigationHandler,
}) => {
    const trapRef = useRef<HTMLDivElement>(null);
    const defaultReturnFocusToRef = useRef<HTMLElement | null>(document.activeElement as HTMLElement);

    const returnFocusTo = returnFocusToProp ?? defaultReturnFocusToRef;

    const returnFocus = useCallback(() => {
        if (
            // different browsers have different default focusable element
            document.activeElement !== document.body &&
            document.activeElement !== document.documentElement &&
            !trapRef.current?.contains(document.activeElement)
        ) {
            // if Trap was closed by clicking outside, do not return focus
            return;
        }
        if (typeof returnFocusTo === "string") {
            const element = document.getElementById(returnFocusTo);
            element?.focus();
        } else if (returnFocusTo?.current) {
            returnFocusTo.current.focus();
        }
    }, [returnFocusTo]);

    const { keyboardNavigationHandler } = useDialogKeyboardNavigation(trapRef, returnFocus, onDeactivate);

    const keyboardHandler = customKeyboardNavigationHandler ?? keyboardNavigationHandler;

    useEffect(() => {
        return () => {
            if (returnFocusOnUnmount) {
                returnFocus();
            }
        };
    }, [returnFocusOnUnmount, returnFocus]);

    useEffect(() => {
        const focusTrapTimeout = setTimeout(() => {
            if (!autofocusOnOpen) {
                return;
            }

            if (trapRef.current?.contains(document.activeElement)) {
                // Do not change focus, if the focused element is already inside the trap
                return;
            }

            if (isElementTextInput(document.activeElement)) {
                return;
            }

            if (initialFocus) {
                if (typeof initialFocus === "string") {
                    const element = document.getElementById(initialFocus);
                    element?.focus();
                    return;
                } else if (initialFocus.current) {
                    initialFocus.current.focus();
                    return;
                }
            }

            // Move focus to the first element in the trap at start
            const { firstElement } = getFocusableElements(trapRef.current);
            firstElement?.focus();
        }, 100);

        return () => {
            clearTimeout(focusTrapTimeout);
        };
    }, [autofocusOnOpen, initialFocus, returnFocus, keyboardHandler, returnFocusOnUnmount]);

    useEffect(() => {
        document.addEventListener("keydown", keyboardHandler);

        return () => {
            document.removeEventListener("keydown", keyboardHandler);
        };
    }, [keyboardHandler]);

    return (
        <div className="gd-focus-trap" ref={trapRef}>
            {children}
        </div>
    );
};
