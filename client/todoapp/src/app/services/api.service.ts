import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5038/api/todoapp';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves all notes from the API.
   * @returns An Observable of Note array.
   */
  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/GetNotes`);
  }

  /**
   * Adds a new note to the API.
   * @param newNote An object containing the new note description.
   * @returns An Observable of the added Note.
   */
  addNote(newNote: { newNotes: string }): Observable<Note> { // Expecting an object
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set the Content-Type header
    return this.http.post<Note>(`${this.apiUrl}/AddNotes`, newNote, { headers: headers });
  }

  /**
   * Deletes a note from the API by its ID.
   * @param id The ID of the note to delete.
   * @returns An Observable of any type, typically indicating success.
   */
  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteNotes?id=${id}`);
  }
}