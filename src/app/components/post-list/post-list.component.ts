import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [NgOptimizedImage],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  private dataService = inject(DataService);

  posts = this.dataService.getPostsFromStore()();
}

// read the list of posts from DataService done
// render one PostComponent for each post done
// pass postId to each PostComponent ?