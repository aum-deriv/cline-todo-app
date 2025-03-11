/**
 * @file Button.tsx
 * @description A reusable button component with various styles and states.
 * Include information about:
 * - Customizable button with different variants and sizes
 * - Support for disabled state and loading state
 * - Flexible styling options
 * - Accessibility considerations
 *
 * @dependencies
 * - Components: None
 * - Hooks: None
 * - Utilities: None
 *
 * @implementation
 * This component implements a flexible button that can be styled in different ways
 * based on props. It handles various states like disabled and loading, and ensures
 * proper accessibility attributes are set.
 */

import { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isLoading?: boolean;
}

export const Button = ({
    children,
    variant = "primary",
    size = "medium",
    fullWidth = false,
    isLoading = false,
    className = "",
    disabled = false,
    ...rest
}: ButtonProps) => {
    const buttonClasses = [
        "button",
        `button--${variant}`,
        `button--${size}`,
        fullWidth ? "button--full-width" : "",
        isLoading ? "button--loading" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            className={buttonClasses}
            disabled={disabled || isLoading}
            {...rest}
        >
            {isLoading ? (
                <span
                    className="button__loading-indicator"
                    aria-hidden="true"
                ></span>
            ) : null}
            <span className={isLoading ? "button__text--loading" : ""}>
                {children}
            </span>
        </button>
    );
};
