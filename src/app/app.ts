import { Component } from '@angular/core';
import { PostListComponent } from './components/post-list/post-list.component';

@Component({
  selector: 'app-root',
  imports: [PostListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  
}

/* Responsibilities:

display the main application layout
provide the admin mode toggle
display PostListComponent */