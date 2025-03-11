/**
 * @file KanbanBoard.tsx
 * @description A Kanban board component for displaying and managing tasks in columns.
 * Include information about:
 * - Displays tasks in columns based on their status
 * - Supports drag and drop functionality for moving tasks between columns
 * - Visual indicators for task status and deadlines
 * - Integration with TaskContext for data management
 *
 * @dependencies
 * - Components: KanbanColumn
 * - Hooks: useTaskContext from TaskContext
 * - Libraries: @hello-pangea/dnd (DragDropContext)
 * - Types: Task interface
 *
 * @implementation
 * This component implements a Kanban board with drag and drop functionality.
 * It uses the TaskContext to access and update tasks, and renders KanbanColumn
 * components for each status column. The component handles the drag and drop
 * logic to move tasks between columns.
 */

import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskContext } from "../../context/TaskContext";
import { KanbanColumn } from "./components/KanbanColumn/KanbanColumn";
import { Task } from "../../types/Task";
import "./KanbanBoard.css";

export const KanbanBoard = () => {
    const { tasks, moveTask } = useTaskContext();

    // Group tasks by status
    const columns = {
        todo: tasks.filter((task) => task.status === "todo"),
        inProgress: tasks.filter((task) => task.status === "inProgress"),
        done: tasks.filter((task) => task.status === "done"),
    };

    // Handle drag end event
    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        // If there's no destination or the item was dropped back in its original position
        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return;
        }

        // Get the new status from the destination droppable ID
        const newStatus = destination.droppableId as
            | "todo"
            | "inProgress"
            | "done";

        // Move the task to the new status
        moveTask(draggableId, newStatus);
    };

    return (
        <div className="kanban-board-container">
            <div className="kanban-board-header">
                <h2 className="kanban-board-title">Task Board</h2>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="kanban-board">
                    <KanbanColumn
                        id="todo"
                        title="To Do"
                        tasks={columns.todo}
                    />
                    <KanbanColumn
                        id="inProgress"
                        title="In Progress"
                        tasks={columns.inProgress}
                    />
                    <KanbanColumn id="done" title="Done" tasks={columns.done} />
                </div>
            </DragDropContext>
        </div>
    );
};
