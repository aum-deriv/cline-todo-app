/**
 * @file TaskForm.tsx
 * @description A form component for creating and editing tasks.
 * Include information about:
 * - Form for adding new tasks with title, description, and deadline
 * - Support for editing existing tasks
 * - Form validation and error handling
 * - Integration with TaskContext for data management
 *
 * @dependencies
 * - Components: Button, Input from UI components
 * - Hooks: useState, useEffect from React, useTaskContext from TaskContext
 * - Utilities: None
 * - Types: Task interface
 *
 * @implementation
 * This component implements a form for creating and editing tasks. It uses the
 * TaskContext to add or update tasks in the global state. The form includes
 * validation for required fields and proper date formatting.
 */

import { useState, useEffect, FormEvent } from "react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { useTaskContext } from "../../context/TaskContext";
import { Task } from "../../types/Task";
import "./TaskForm.css";

interface TaskFormProps {
    task?: Task;
    onSubmit?: () => void;
    onCancel?: () => void;
}

export const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
    const { addTask, updateTask } = useTaskContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [errors, setErrors] = useState({
        title: "",
        deadline: "",
    });

    // If editing an existing task, populate the form
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);

            // Format the date to YYYY-MM-DD for the input
            const deadlineDate = new Date(task.deadline);
            const formattedDate = deadlineDate.toISOString().split("T")[0];
            setDeadline(formattedDate);
        }
    }, [task]);

    const validateForm = (): boolean => {
        const newErrors = {
            title: "",
            deadline: "",
        };
        let isValid = true;

        if (!title.trim()) {
            newErrors.title = "Title is required";
            isValid = false;
        }

        if (!deadline) {
            newErrors.deadline = "Deadline is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const deadlineDate = new Date(deadline);

        if (task) {
            // Update existing task
            updateTask(task.id, {
                title,
                description,
                deadline: deadlineDate,
            });
        } else {
            // Add new task
            addTask({
                title,
                description,
                deadline: deadlineDate,
                completed: false,
                status: "todo", // Default status for new tasks
            });
        }

        // Reset form
        setTitle("");
        setDescription("");
        setDeadline("");

        // Call onSubmit callback if provided
        if (onSubmit) {
            onSubmit();
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2 className="task-form__title">
                {task ? "Edit Task" : "Add New Task"}
            </h2>

            <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
                placeholder="Enter task title"
                fullWidth
                required
            />

            <div className="input-container">
                <label className="input-label">Description</label>
                <textarea
                    className="input input--default input--full-width"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description (optional)"
                    rows={3}
                />
            </div>

            <Input
                label="Deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                error={errors.deadline}
                fullWidth
                required
            />

            <div className="task-form__actions">
                {onCancel && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                )}
                <Button type="submit" variant="primary">
                    {task ? "Update Task" : "Add Task"}
                </Button>
            </div>
        </form>
    );
};
