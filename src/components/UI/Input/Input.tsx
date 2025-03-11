/**
 * @file Input.tsx
 * @description A reusable input component with various styles and states.
 * Include information about:
 * - Customizable input with different variants
 * - Support for validation states
 * - Label and error message integration
 * - Accessibility considerations
 *
 * @dependencies
 * - Components: None
 * - Hooks: None
 * - Utilities: None
 *
 * @implementation
 * This component implements a flexible input field that can be styled in different ways
 * based on props. It handles various states like error and disabled, and ensures
 * proper accessibility attributes are set.
 */

import { InputHTMLAttributes, forwardRef } from "react";
import "./Input.css";

export type InputVariant = "default" | "filled" | "outlined";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    variant?: InputVariant;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            variant = "default",
            fullWidth = false,
            className = "",
            id,
            ...rest
        },
        ref
    ) => {
        const inputId =
            id || `input-${Math.random().toString(36).substring(2, 9)}`;
        const errorId = error ? `${inputId}-error` : undefined;

        const inputClasses = [
            "input",
            `input--${variant}`,
            fullWidth ? "input--full-width" : "",
            error ? "input--error" : "",
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <div
                className={`input-container ${
                    fullWidth ? "input-container--full-width" : ""
                }`}
            >
                {label && (
                    <label htmlFor={inputId} className="input-label">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={inputClasses}
                    aria-invalid={!!error}
                    aria-describedby={errorId}
                    {...rest}
                />
                {error && (
                    <div id={errorId} className="input-error">
                        {error}
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
