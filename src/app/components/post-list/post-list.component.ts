import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  imports: [PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  private dataService = inject(DataService);

  posts = this.dataService.getPostsFromStore();
}
