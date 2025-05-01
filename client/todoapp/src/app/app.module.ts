import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <-- Import HttpClientModule for API calls
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule for ngModel

import { AppComponent } from './app.component';
import { NotesComponent } from './components/notes/notes.component'; // <-- Import the NotesComponent

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent // <-- Declare the NotesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // <-- Add HttpClientModule to imports
    FormsModule       // <-- Add FormsModule to imports
  ],
  providers: [
    // Services are typically provided in root (see ApiService) or specific modules
  ],
  bootstrap: [AppComponent] // The main component to bootstrap
})
export class AppModule { }
