export interface Post {
    id: number,
    authorId: number,
    caption: string,
    likes: number,
    reposts: number,
    isLiked: boolean,
    isReposted: boolean
}
