/**
 * @file dateUtils.ts
 * @description Utility functions for date formatting and manipulation.
 * Include information about:
 * - Functions for formatting dates in user-friendly formats
 * - Helper functions for deadline calculations
 * - Date comparison utilities
 * 
 * @dependencies
 * - None
 * 
 * @implementation
 * This file provides utility functions for working with dates throughout the application,
 * particularly for displaying deadlines in a user-friendly format and determining if
 * deadlines are approaching or overdue.
 */

/**
 * Formats a date to a user-friendly string (e.g., "Mar 11, 2025")
 */
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Formats a date to include time (e.g., "Mar 11, 2025, 10:30 AM")
 */
export const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
};

/**
 * Checks if a deadline is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  const deadline = new Date(date);
  
  return (
    deadline.getDate() === today.getDate() &&
    deadline.getMonth() === today.getMonth() &&
    deadline.getFullYear() === today.getFullYear()
  );
};

/**
 * Checks if a deadline is approaching (within the next 2 days)
 */
export const isApproaching = (date: Date): boolean => {
  const today = new Date();
  const deadline = new Date(date);
  const twoDaysFromNow = new Date(today);
  twoDaysFromNow.setDate(today.getDate() + 2);
  
  return deadline <= twoDaysFromNow && deadline > today;
};

/**
 * Checks if a deadline is overdue
 */
export const isOverdue = (date: Date): boolean => {
  const today = new Date();
  const deadline = new Date(date);
  
  return deadline < today;
};

/**
 * Returns a status string based on deadline
 */
export const getDeadlineStatus = (date: Date): 'overdue' | 'today' | 'approaching' | 'upcoming' => {
  if (isOverdue(date)) return 'overdue';
  if (isToday(date)) return 'today';
  if (isApproaching(date)) return 'approaching';
  return 'upcoming';
};
