// This component is responsible for displaying, adding, and deleting notes.
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'; // Adjust path as needed
import { Note } from '../../models/note.interface'; // Adjust path as needed
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-notes', // The tag used to embed this component in HTML
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[] = []; // Array to hold the notes fetched from the API
  newNoteDescription: string = ''; // Bound to the input field using ngModel
  isLoading: boolean = false; // Flag for showing loading indicators
  errorMessage: string | null = null; // To display error messages to the user

  // Inject the ApiService to interact with the backend
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  /**
   * Lifecycle hook called after Angular has initialized the component.
   * Good place to fetch initial data.
   */
  ngOnInit(): void {
    this.loadNotes();
  }

  /**
   * Fetches notes from the API service and updates the component's state.
   */
  loadNotes(): void {
    this.isLoading = true;
    this.errorMessage = null; // Clear previous errors
    console.log('NotesComponent: Loading notes...');

    this.apiService.getNotes().subscribe({
      next: (data) => {
        this.notes = data; // Assign fetched notes to the local array
        console.log('NotesComponent: Notes loaded successfully', this.notes);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('NotesComponent: Error loading notes:', err);
        // Display a user-friendly error message
        this.errorMessage = 'Failed to load notes. Please check the connection and ensure the backend server is running.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Called when the "Add Note" button is clicked.
   * Sends the new note description to the API service.
   */
  addNote(): void {
    // Basic validation: ensure the input is not empty
    if (!this.newNoteDescription.trim()) {
      this.errorMessage = 'Note description cannot be empty.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    console.log('NotesComponent: Adding note:', this.newNoteDescription);

    this.apiService.addNote({ newNotes: this.newNoteDescription }).subscribe({
      next: (newNote) => {
        console.log('NotesComponent: Note added successfully', newNote);
        this.notes = [...this.notes, newNote];
        this.newNoteDescription = '';
        this.isLoading = false;
        this.cdr.detectChanges();
        this.loadNotes(); // Reload notes to ensure the latest data 
      },
      error: (err) => {
        console.error('NotesComponent: Error adding note:', err);
        this.errorMessage = 'Failed to add the note. Please try again.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Called when the "Delete" button for a note is clicked.
   * Sends the ID of the note to delete to the API service.
   * @param id The id of the note to be deleted.
   */
  deleteNote(id: string): void {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    console.log('NotesComponent: Deleting note with ID:', id);

    this.apiService.deleteNote(id).subscribe({
      next: (response) => {
        console.log('NotesComponent: Note deleted successfully', response);
        this.notes = this.notes.filter(note => note.id !== id); // Filter by 'id'
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error deleting note:', err);
        this.errorMessage = 'Failed to delete the note. Please try again.';
        this.isLoading = false;
      }
    });
  }
}