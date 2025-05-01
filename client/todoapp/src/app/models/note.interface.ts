/**
 * Defines the structure of a Note object, matching the data
 * expected from and sent to the backend API.
 */
export interface Note {
    _id: string; // MongoDB's unique identifier
    id: string; // Unique identifier for the note
    description: string;
  }
  