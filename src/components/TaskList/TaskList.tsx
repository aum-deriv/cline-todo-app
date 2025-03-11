/**
 * @file TaskList.tsx
 * @description A component for displaying a list of tasks with filtering and sorting options.
 * Include information about:
 * - Displays a list of tasks with filtering by status
 * - Sorting options for tasks
 * - Integration with TaskContext for data access
 * - Empty state handling
 *
 * @dependencies
 * - Components: TaskItem from components/TaskItem, TaskForm from components/TaskForm
 * - Hooks: useState from React, useTaskContext from TaskContext
 * - Utilities: None
 * - Types: Task interface
 *
 * @implementation
 * This component implements a list view of tasks with filtering and sorting capabilities.
 * It uses the TaskContext to access the tasks data and renders TaskItem components for
 * each task. It also provides a form for editing tasks when a task is selected for editing.
 */

import { useState } from "react";
import { TaskItem } from "./components/TaskItem";
import { TaskForm } from "../TaskForm";
import { useTaskContext } from "../../context/TaskContext";
import { Task } from "../../types/Task";
import "./TaskList.css";

type FilterStatus = "all" | "active" | "completed";
type SortOption = "deadline" | "created" | "title";

export const TaskList = () => {
    const { tasks } = useTaskContext();
    const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
    const [sortOption, setSortOption] = useState<SortOption>("deadline");
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const handleSubmitEdit = () => {
        setEditingTask(null);
    };

    // Filter tasks based on selected filter
    const filteredTasks = tasks.filter((task) => {
        if (filterStatus === "all") return true;
        if (filterStatus === "active") return !task.completed;
        if (filterStatus === "completed") return task.completed;
        return true;
    });

    // Sort tasks based on selected sort option
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortOption === "deadline") {
            return (
                new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
            );
        }
        if (sortOption === "created") {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        }
        if (sortOption === "title") {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    return (
        <div className="task-list">
            <div className="task-list__header">
                <h2 className="task-list__title">Tasks</h2>
                <div className="task-list__filters">
                    <div className="task-list__filter-group">
                        <label
                            htmlFor="filter-status"
                            className="task-list__filter-label"
                        >
                            Status:
                        </label>
                        <select
                            id="filter-status"
                            className="task-list__filter-select"
                            value={filterStatus}
                            onChange={(e) =>
                                setFilterStatus(e.target.value as FilterStatus)
                            }
                        >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="task-list__filter-group">
                        <label
                            htmlFor="sort-option"
                            className="task-list__filter-label"
                        >
                            Sort by:
                        </label>
                        <select
                            id="sort-option"
                            className="task-list__filter-select"
                            value={sortOption}
                            onChange={(e) =>
                                setSortOption(e.target.value as SortOption)
                            }
                        >
                            <option value="deadline">Deadline</option>
                            <option value="created">Recently Added</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            </div>

            {editingTask && (
                <div className="task-list__edit-form">
                    <TaskForm
                        task={editingTask}
                        onSubmit={handleSubmitEdit}
                        onCancel={handleCancelEdit}
                    />
                </div>
            )}

            <div className="task-list__content">
                {sortedTasks.length === 0 ? (
                    <div className="task-list__empty">
                        <p>No tasks found. Add a new task to get started!</p>
                    </div>
                ) : (
                    sortedTasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onEdit={handleEditTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
