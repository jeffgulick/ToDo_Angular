import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root', // This component is the root of the application
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Link to global styles if needed, or component-specific
})
export class AppComponent implements OnInit {
  title = 'simple-notes-app'; // Default title, can be used in the template
  currentYear: number = new Date().getFullYear();
  currentTime: string = '';

  ngOnInit() {
    this.updateTime();
    // Update time every second (optional)
    // setInterval(() => this.updateTime(), 1000);
  }

  updateTime() {
     // Get current time formatted for Lubbock (America/Denver approximates Central Time well enough for this example)
     this.currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour12: true });
  }
}
