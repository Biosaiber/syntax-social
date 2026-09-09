import { Post } from '../models/post.interface';

export const posts: Post[] = [
  {
    id: 1,
    authorId: 1,
    image: 'https://picsum.photos/seed/syntax-social-1/800/500',
    caption: 'Coffee first. TypeScript second.',
    likes: 42,
    reposts: 6,
    isLiked: false,
    isReposted: false
  },
  {
    id: 2,
    authorId: 2,
    image: 'https://picsum.photos/seed/syntax-social-2/800/500',
    caption: 'Found a quiet place to disappear for a while.',
    likes: 87,
    reposts: 13,
    isLiked: true,
    isReposted: false
  },
  {
    id: 3,
    authorId: 3,
    image: 'https://picsum.photos/seed/syntax-social-3/800/500',
    caption: 'Today the compiler and I are on speaking terms.',
    likes: 128,
    reposts: 21,
    isLiked: false,
    isReposted: true
  },
  {
    id: 4,
    authorId: 4,
    image: 'https://picsum.photos/seed/syntax-social-4/800/500',
    caption: 'Signals changed how I think about Angular state.',
    likes: 164,
    reposts: 38,
    isLiked: true,
    isReposted: true
  },
  {
    id: 5,
    authorId: 5,
    image: 'https://picsum.photos/seed/syntax-social-5/800/500',
    caption: 'A suspicious amount of code was written here today.',
    likes: 69,
    reposts: 8,
    isLiked: false,
    isReposted: false
  },
  {
    id: 6,
    authorId: 6,
    image: 'https://picsum.photos/seed/syntax-social-6/800/500',
    caption: 'Computed signals doing the work so I do not have to.',
    likes: 103,
    reposts: 17,
    isLiked: true,
    isReposted: false
  },
  {
    id: 7,
    authorId: 1,
    image: 'https://picsum.photos/seed/syntax-social-7/800/500',
    caption: 'One more commit and then I definitely stop coding.',
    likes: 91,
    reposts: 15,
    isLiked: false,
    isReposted: false
  },
  {
    id: 8,
    authorId: 3,
    image: 'https://picsum.photos/seed/syntax-social-8/800/500',
    caption: 'Somewhere between clean architecture and controlled chaos.',
    likes: 147,
    reposts: 29,
    isLiked: true,
    isReposted: false
  }
];