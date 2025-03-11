/**
 * @file Task.ts
 * @description Defines the Task interface used throughout the application.
 * Include information about:
 * - Core data structure for representing tasks in the application
 * - Properties that define a task's metadata and state
 * - Type safety for task operations
 * 
 * @dependencies
 * - None
 * 
 * @implementation
 * This file provides the fundamental data structure that represents a task in the
 * application. It ensures type safety when working with task objects across components.
 */

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
