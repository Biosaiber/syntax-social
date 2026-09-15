import { Component, input, inject, computed } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NgOptimizedImage } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-post',
  imports: [NgOptimizedImage],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  private dataService = inject(DataService);
  private adminService = inject(AdminService);
  isAdminOn = this.adminService.getAdminMode();
  captionChanges = new Subject<string>();
  postId = input.required<number>();
  isFirst = input.required<boolean>();
  post = computed(() => {
    return this.dataService.getPost(this.postId())();
  })

  engagementScore = computed(() => {
    const currentPost = this.post();
    if (!currentPost) {
      return undefined;
    }
    return this.dataService.calculateEngagementScore(currentPost);
  })

  author = computed(() => {
    const currentPost = this.post();
    if (!currentPost) {
      return undefined;
    }
    return this.dataService.getUser(currentPost.authorId)();
  })

  ngOnInit(): void {
    this.captionChanges.pipe(debounceTime(500)).subscribe(text => {
      this.dataService.updateCaption(this.postId(), text);
      console.log(this.post());
    })
  }

  toggleLike(): void {
    this.dataService.toggleLike(this.postId());
  }
  toggleRepost(): void {
    this.dataService.toggleRepost(this.postId());
  }
  toggleFollow(): void {
    const currentAuthorId = this.author()?.id;
    if (!currentAuthorId) {
      return;
    }
    this.dataService.toggleFollow(currentAuthorId);
  }
  captionChangeEvent(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const text = event.target.value;
      this.captionChanges.next(text);
    }
  }

}
