export class Post {
  constructor(
    public id: number,
    public title: string,
    public content: string
  ) {}
}

export class PostService {
  private posts: Post[] = [
    new Post(1, 'First Post', 'This is the content of the first post.'),
  ]

  all() {
    return this.posts
  }

  one(id: number) {
    const post = this.posts.find((post) => post.id === id)
    if (!post) throw new Error(`Post with id ${id} not found`)
    return post
  }

  create(post: Omit<Post, 'id'>) {
    const newId =
      this.posts.length > 0 ? Math.max(...this.posts.map((p) => p.id)) + 1 : 1
    const newPost = new Post(newId, post.title, post.content)
    this.posts.push(newPost)

    return post
  }

  update(id: number, updatedPost: Partial<Omit<Post, 'id'>>) {
    const postIndex = this.posts.findIndex((post) => post.id === id)
    if (postIndex === -1) throw new Error(`Post with id ${id} not found`)
    this.posts[postIndex] = { ...this.posts[postIndex], ...updatedPost } as Post
    return this.posts[postIndex]
  }

  delete(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id)
    if (postIndex === -1) throw new Error(`Post with id ${id} not found`)
    const deletedPost = this.posts.splice(postIndex, 1)[0]
    return deletedPost
  }
}
