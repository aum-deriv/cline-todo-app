/**
 * @file storageUtils.ts
 * @description Utility functions for local storage operations.
 * Include information about:
 * - Functions for saving and retrieving tasks from localStorage
 * - Data persistence between sessions
 * - Type-safe storage operations
 * 
 * @dependencies
 * - Types: Task (for type safety when storing and retrieving tasks)
 * 
 * @implementation
 * This file provides utility functions for persisting task data in the browser's
 * localStorage, ensuring that tasks remain available between sessions. It handles
 * serialization and deserialization of task objects, including proper date handling.
 */

import { Task } from '../types/Task';

const STORAGE_KEY = 'taskManager_tasks';

/**
 * Saves tasks to localStorage
 */
export const saveTasks = (tasks: Task[]): void => {
  try {
    // Convert Date objects to ISO strings for storage
    const tasksToSave = tasks.map(task => ({
      ...task,
      deadline: task.deadline.toISOString(),
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString()
    }));
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

/**
 * Retrieves tasks from localStorage
 */
export const getTasks = (): Task[] => {
  try {
    const tasksJson = localStorage.getItem(STORAGE_KEY);
    
    if (!tasksJson) {
      return [];
    }
    
    // Convert ISO strings back to Date objects and handle migration for status field
    const parsedTasks = JSON.parse(tasksJson);
    return parsedTasks.map((task: any) => {
      // Migrate tasks that don't have a status field
      if (!task.status) {
        task.status = task.completed ? 'done' : 'todo';
      }
      
      return {
        ...task,
        deadline: new Date(task.deadline),
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      };
    });
  } catch (error) {
    console.error('Error retrieving tasks from localStorage:', error);
    return [];
  }
};

/**
 * Clears all tasks from localStorage
 */
export const clearTasks = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing tasks from localStorage:', error);
  }
};
