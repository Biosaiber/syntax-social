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

  author = computed(() => {
    const currentPost = this.post();
    if (!currentPost) {
      return undefined;
    }
    return this.dataService.getUser(currentPost.authorId)();
  })

}


/* - receive `postId` using signal-based input : done
- read the current post from `DataService` : done
- read the related author from `DataService` : done
- display post content and author information : done
- display likes and reposts : done
- create and display the computed engagement score
- trigger like / unlike actions
- trigger repost / unrepost actions
- trigger follow / unfollow actions
- react to admin mode
- show an editable caption in admin mode
- trigger the caption autosave flow */