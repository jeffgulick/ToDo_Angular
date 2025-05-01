import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5038/api/todoapp';  // Adjust if your API is running elsewhere

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/GetNotes`);
  }

  addNote(newNote: { newNotes: string }): Observable<Note> { // Expecting an object
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set the Content-Type header
    return this.http.post<Note>(`${this.apiUrl}/AddNotes`, newNote, { headers: headers });
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteNotes?id=${id}`);
  }
}