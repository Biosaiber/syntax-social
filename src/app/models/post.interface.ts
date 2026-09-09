export interface Post {
    id: number,
    authorId: number,
    image: string,
    caption: string,
    likes: number,
    reposts: number,
    isLiked: boolean,
    isReposted: boolean
}
