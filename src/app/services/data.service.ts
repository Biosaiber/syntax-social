import { Injectable, WritableSignal, signal, computed } from '@angular/core';
import { Post } from '../models/post.interface';
import { User } from '../models/user.interface';
import { posts as initialPosts } from '../mock-data/post.mock';
import { users as initialUsers } from '../mock-data/user.mock';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private postStore: WritableSignal<Post[]> = signal(initialPosts);
  private userStore: WritableSignal<User[]> = signal(initialUsers);



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

  updateCaption(postId: number, newCaption: string): void {
    this.postStore.update(posts => {
      return posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            caption: newCaption
          }
        }
        return post;
      })
    })
  }

  calculateEngagementScore(post: Post): number {
    return post.likes + 2 * post.reposts;
  }


  toggleLike(postId: number): void {
    this.postStore.update(posts => {
      return posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked
          }
        }
        return post;
      })
    })
  }



  toggleRepost(postId: number): void {
    this.postStore.update(posts => {
      return posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
            isReposted: !post.isReposted
          }
        }
        return post;
      })
    })
  }

  toggleFollow(userId: number): void {
    this.userStore.update(users => {
      return users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            followers: user.isFollowed ? user.followers - 1 : user.followers + 1,
            isFollowed: !user.isFollowed
          }
        }
        return user;
      })
    })
  }
}
