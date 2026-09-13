import { Component, input, inject, computed } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [NgOptimizedImage],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  private dataService = inject(DataService);
  postId = input.required<number>();
  post = computed(() => {
    return this.dataService.getPost(this.postId())();
  })
}
