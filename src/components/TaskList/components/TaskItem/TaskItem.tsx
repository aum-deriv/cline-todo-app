/**
 * @file TaskItem.tsx
 * @description A component for displaying an individual task item.
 * Include information about:
 * - Displays task details including title, description, and deadline
 * - Visual indicators for task status (completed, overdue, etc.)
 * - Actions for completing, editing, and deleting tasks
 * - Responsive design for different screen sizes
 *
 * @dependencies
 * - Components: Button from UI components
 * - Hooks: useState from React, useTaskContext from TaskContext
 * - Utilities: formatDate, getDeadlineStatus from dateUtils
 * - Types: Task interface
 *
 * @implementation
 * This component implements a card-like UI for displaying task information.
 * It provides buttons for task actions and visual indicators for task status.
 * The component uses the TaskContext to update or delete tasks.
 */

import { useState } from "react";
import { Button } from "../../../UI/Button";
import { useTaskContext } from "../../../../context/TaskContext";
import { formatDate, getDeadlineStatus } from "../../../../utils/dateUtils";
import { Task } from "../../../../types/Task";
import "./TaskItem.css";

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

export const TaskItem = ({ task, onEdit }: TaskItemProps) => {
    const { completeTask, deleteTask } = useTaskContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const deadlineStatus = getDeadlineStatus(task.deadline);

    const handleToggleComplete = () => {
        completeTask(task.id, !task.completed);
    };

    const handleEdit = () => {
        onEdit(task);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            deleteTask(task.id);
        }
    };

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            className={`task-item ${
                task.completed ? "task-item--completed" : ""
            }`}
        >
            <div className="task-item__header">
                <div className="task-item__checkbox-container">
                    <input
                        type="checkbox"
                        className="task-item__checkbox"
                        checked={task.completed}
                        onChange={handleToggleComplete}
                        aria-label={`Mark "${task.title}" as ${
                            task.completed ? "incomplete" : "complete"
                        }`}
                    />
                </div>

                <div className="task-item__content">
                    <h3 className="task-item__title">{task.title}</h3>

                    <div className="task-item__meta">
                        <span
                            className={`task-item__deadline task-item__deadline--${deadlineStatus}`}
                        >
                            {formatDate(task.deadline)}
                        </span>
                    </div>

                    {isExpanded && task.description && (
                        <p className="task-item__description">
                            {task.description}
                        </p>
                    )}
                </div>

                <button
                    className="task-item__expand-button"
                    onClick={handleToggleExpand}
                    aria-label={
                        isExpanded
                            ? "Collapse task details"
                            : "Expand task details"
                    }
                >
                    <span
                        className={`task-item__expand-icon ${
                            isExpanded ? "task-item__expand-icon--expanded" : ""
                        }`}
                    >
                        ▼
                    </span>
                </button>
            </div>

            <div className="task-item__actions">
                <Button variant="secondary" size="small" onClick={handleEdit}>
                    Edit
                </Button>
                <Button variant="danger" size="small" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
};
