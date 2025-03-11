/**
 * @file KanbanColumn.tsx
 * @description A component for displaying a column of tasks in a Kanban board.
 * Include information about:
 * - Displays a list of tasks for a specific status
 * - Supports drag and drop functionality
 * - Visual indicators for column status and task count
 *
 * @dependencies
 * - Components: DraggableTaskItem
 * - Libraries: react-beautiful-dnd (Droppable)
 * - Types: Task interface
 *
 * @implementation
 * This component implements a column in a Kanban board. It renders a list of
 * DraggableTaskItem components and handles the droppable area for drag and drop.
 */

import { Droppable } from "@hello-pangea/dnd";
import { DraggableTaskItem } from "../DraggableTaskItem/DraggableTaskItem";
import { Task } from "../../../../types/Task";
import "./KanbanColumn.css";

interface KanbanColumnProps {
    id: string;
    title: string;
    tasks: Task[];
}

export const KanbanColumn = ({ id, title, tasks }: KanbanColumnProps) => {
    return (
        <div className="kanban-column">
            <div className="kanban-column__header">
                <h3 className="kanban-column__title">{title}</h3>
                <div className="kanban-column__count">{tasks.length}</div>
            </div>

            <Droppable
                droppableId={id}
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
            >
                {(provided, snapshot) => (
                    <div
                        className={`kanban-column__content ${
                            snapshot.isDraggingOver
                                ? "kanban-column__content--dragging-over"
                                : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.length === 0 ? (
                            <div className="kanban-column__empty">
                                <p>No tasks</p>
                            </div>
                        ) : (
                            tasks.map((task, index) => (
                                <DraggableTaskItem
                                    key={task.id}
                                    task={task}
                                    index={index}
                                />
                            ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};
