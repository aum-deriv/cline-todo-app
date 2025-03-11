/**
 * @file App.tsx
 * @description The main application component that serves as the entry point for the task management app.
 * Include information about:
 * - Main layout and structure of the application
 * - Integration of TaskContext provider
 * - Composition of TaskForm and TaskList components
 * - Overall application state management
 *
 * @dependencies
 * - Components: TaskForm, TaskList
 * - Hooks: useState from React
 * - Context: TaskProvider from TaskContext
 * - Utilities: None
 *
 * @implementation
 * This component implements the main layout of the application, including the header,
 * task form, and task list. It uses the TaskProvider to provide global state management
 * for tasks throughout the application.
 */

import { useState } from "react";
import { TaskProvider } from "../../context/TaskContext";
import { TaskForm } from "../TaskForm";
import { TaskList } from "../TaskList";
import "./App.css";

export const App = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <TaskProvider>
            <div className="app">
                <header className="app-header">
                    <h1 className="app-title">Task Manager</h1>
                    <button
                        className="app-add-button"
                        onClick={toggleFormVisibility}
                        aria-label={
                            isFormVisible ? "Hide task form" : "Show task form"
                        }
                    >
                        {isFormVisible ? "Cancel" : "Add Task"}
                    </button>
                </header>

                <main className="app-main">
                    {isFormVisible && (
                        <div className="app-form-container">
                            <TaskForm
                                onSubmit={() => setIsFormVisible(false)}
                            />
                        </div>
                    )}

                    <TaskList />
                </main>

                <footer className="app-footer">
                    <p>Task Manager App &copy; {new Date().getFullYear()}</p>
                </footer>
            </div>
        </TaskProvider>
    );
};
