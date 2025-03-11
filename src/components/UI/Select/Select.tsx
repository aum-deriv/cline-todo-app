/**
 * @file Select.tsx
 * @description A reusable select component with various styles and states.
 * Include information about:
 * - Customizable select with different variants
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
 * This component implements a flexible select field that can be styled in different ways
 * based on props. It handles various states like error and disabled, and ensures
 * proper accessibility attributes are set.
 */

import { SelectHTMLAttributes, forwardRef, ReactNode } from "react";
import "./Select.css";

export type SelectVariant = "default" | "filled" | "outlined";

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    variant?: SelectVariant;
    fullWidth?: boolean;
    options: SelectOption[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            error,
            variant = "default",
            fullWidth = false,
            className = "",
            id,
            options,
            placeholder,
            ...rest
        },
        ref
    ) => {
        const selectId =
            id || `select-${Math.random().toString(36).substring(2, 9)}`;
        const errorId = error ? `${selectId}-error` : undefined;

        const selectClasses = [
            "select",
            `select--${variant}`,
            fullWidth ? "select--full-width" : "",
            error ? "select--error" : "",
            className,
        ]
            .filter(Boolean)
            .join(" ");

        return (
            <div
                className={`select-container ${
                    fullWidth ? "select-container--full-width" : ""
                }`}
            >
                {label && (
                    <label htmlFor={selectId} className="select-label">
                        {label}
                    </label>
                )}
                <div className="select-wrapper">
                    <select
                        ref={ref}
                        id={selectId}
                        className={selectClasses}
                        aria-invalid={!!error}
                        aria-describedby={errorId}
                        {...rest}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <div className="select-arrow"></div>
                </div>
                {error && (
                    <div id={errorId} className="select-error">
                        {error}
                    </div>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";
