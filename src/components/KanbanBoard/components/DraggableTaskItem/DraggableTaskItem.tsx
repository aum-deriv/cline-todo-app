/**
 * @file DraggableTaskItem.tsx
 * @description A draggable task item component for use in a Kanban board.
 * Include information about:
 * - Displays task details in a draggable card
 * - Visual indicators for task status and deadline
 * - Actions for completing, editing, and deleting tasks
 *
 * @dependencies
 * - Components: Button from UI components
 * - Hooks: useState from React, useTaskContext from TaskContext
 * - Libraries: react-beautiful-dnd (Draggable)
 * - Utilities: formatDate, getDeadlineStatus from dateUtils
 * - Types: Task interface
 *
 * @implementation
 * This component implements a draggable task card for use in a Kanban board.
 * It wraps the task information in a Draggable component and provides visual
 * feedback during drag operations.
 */

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Button } from "../../../UI/Button";
import { useTaskContext } from "../../../../context/TaskContext";
import { formatDate, getDeadlineStatus } from "../../../../utils/dateUtils";
import { Task } from "../../../../types/Task";
import "./DraggableTaskItem.css";

interface DraggableTaskItemProps {
    task: Task;
    index: number;
}

export const DraggableTaskItem = ({ task, index }: DraggableTaskItemProps) => {
    const { completeTask, deleteTask } = useTaskContext();
    const [isExpanded, setIsExpanded] = useState(false);

    const deadlineStatus = getDeadlineStatus(task.deadline);

    const handleToggleComplete = () => {
        completeTask(task.id, !task.completed);
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
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`draggable-task-item ${
                        task.completed ? "draggable-task-item--completed" : ""
                    } ${
                        snapshot.isDragging
                            ? "draggable-task-item--dragging"
                            : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="draggable-task-item__header">
                        <div className="draggable-task-item__checkbox-container">
                            <input
                                type="checkbox"
                                className="draggable-task-item__checkbox"
                                checked={task.completed}
                                onChange={handleToggleComplete}
                                aria-label={`Mark "${task.title}" as ${
                                    task.completed ? "incomplete" : "complete"
                                }`}
                            />
                        </div>

                        <div className="draggable-task-item__content">
                            <h3 className="draggable-task-item__title">
                                {task.title}
                            </h3>

                            <div className="draggable-task-item__meta">
                                <span
                                    className={`draggable-task-item__deadline draggable-task-item__deadline--${deadlineStatus}`}
                                >
                                    {formatDate(task.deadline)}
                                </span>
                            </div>

                            {isExpanded && task.description && (
                                <p className="draggable-task-item__description">
                                    {task.description}
                                </p>
                            )}
                        </div>

                        <button
                            className="draggable-task-item__expand-button"
                            onClick={handleToggleExpand}
                            aria-label={
                                isExpanded
                                    ? "Collapse task details"
                                    : "Expand task details"
                            }
                        >
                            <span
                                className={`draggable-task-item__expand-icon ${
                                    isExpanded
                                        ? "draggable-task-item__expand-icon--expanded"
                                        : ""
                                }`}
                            >
                                ▼
                            </span>
                        </button>
                    </div>

                    <div className="draggable-task-item__actions">
                        <Button
                            variant="danger"
                            size="small"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};
