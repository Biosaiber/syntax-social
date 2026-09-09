import { Injectable, WritableSignal, signal, computed } from '@angular/core';
import { Post } from '../models/post.interface';
import { posts as initialPosts } from '../mock-data/post.mock';
import { users as initialUsers } from '../mock-data/user.mock';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  postStore: WritableSignal<Post[]> = signal(initialPosts);
  userStore: WritableSignal<User[]> = signal(initialUsers);



  getPostsFromStore() {
    return this.postStore.asReadonly();
  }
  getUsersFromStore() {
    return this.userStore.asReadonly();
  }


  getPost(id: number) {
    return computed(() => {
      return this.postStore().find(post => post.id === id);
    })
  }

  getUser(id: number) {
    return computed(() => {
      return this.userStore().find(user => user.id === id);
    })
  }

  updateCaption(postId: number, newCaption: string) {
    this.postStore.update(posts => {
      return posts.map(post => {
        if(post.id === postId) {
          return {
            ...post,
            caption: newCaption
          }
        }
        return post;
      })
    })
  }

  /*
calculateEngagementScore(post) {
 
}
toggleLike(postId) {
 
}
toggleRepost(postId) {
 
}
toggleFollow(userId) {
 
} */
}