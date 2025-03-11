/**
 * @file TaskContext.tsx
 * @description Context provider for managing tasks throughout the application.
 * Include information about:
 * - Global state management for tasks
 * - CRUD operations for tasks
 * - Integration with localStorage for persistence
 * - Type-safe context implementation
 *
 * @dependencies
 * - Components: None
 * - Hooks: useState, useEffect, createContext, useContext
 * - Utilities: saveTasks, getTasks from storageUtils
 * - Types: Task interface
 *
 * @implementation
 * This file implements the Context API pattern to provide global state management
 * for tasks. It offers methods for adding, updating, completing, and deleting tasks,
 * while ensuring data persistence through localStorage integration. The context
 * is designed to be consumed by any component that needs to interact with tasks.
 */

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../types/Task";
import { saveTasks, getTasks } from "../utils/storageUtils";

// Define the shape of our context
interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
    updateTask: (
        id: string,
        updates: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>
    ) => void;
    deleteTask: (id: string) => void;
    completeTask: (id: string, completed: boolean) => void;
}

// Create the context with a default value
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider props type
interface TaskProviderProps {
    children: ReactNode;
}

// Provider component
export const TaskProvider = ({ children }: TaskProviderProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load tasks from localStorage on initial render
    useEffect(() => {
        const storedTasks = getTasks();
        setTasks(storedTasks);
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    // Add a new task
    const addTask = (
        taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
    ) => {
        const now = new Date();
        const newTask: Task = {
            ...taskData,
            id: uuidv4(),
            createdAt: now,
            updatedAt: now,
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    // Update an existing task
    const updateTask = (
        id: string,
        updates: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>
    ) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? { ...task, ...updates, updatedAt: new Date() }
                    : task
            )
        );
    };

    // Delete a task
    const deleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    // Toggle task completion status
    const completeTask = (id: string, completed: boolean) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? { ...task, completed, updatedAt: new Date() }
                    : task
            )
        );
    };

    // Context value
    const value = {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        completeTask,
    };

    return (
        <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
    );
};

// Custom hook for using the task context
export const useTaskContext = (): TaskContextType => {
    const context = useContext(TaskContext);

    if (context === undefined) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }

    return context;
};
