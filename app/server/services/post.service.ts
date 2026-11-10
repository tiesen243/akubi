import { env } from 'cloudflare:workers'

export interface Post {
  id: number
  title: string
  content: string
}

export class PostService {
  constructor(private readonly db = env.DB) {}

  async all() {
    const posts = await this.db.prepare('SELECT * FROM posts').all<Post>()
    return posts.results
  }

  async one(id: number) {
    const post = await this.db
      .prepare('SELECT * FROM posts WHERE id = ?')
      .bind(id)
      .first<Post>()
    if (!post) throw new Error(`Post with id ${id} not found`)
    return post
  }

  async create(post: Omit<Post, 'id'>) {
    const result = await this.db
      .prepare('INSERT INTO posts (title, content) VALUES (?, ?)')
      .bind(post.title, post.content)
      .run()
    if (!result.success) throw new Error('Failed to create post')
  }

  async update(id: number, updatedPost: Partial<Omit<Post, 'id'>>) {
    const post = await this.one(id)
    const newPost = { ...post, ...updatedPost }
    const result = await this.db
      .prepare('UPDATE posts SET title = ?, content = ? WHERE id = ?')
      .bind(newPost.title, newPost.content, id)
      .run()
    if (!result.success) throw new Error(`Failed to update post with id ${id}`)
  }

  async delete(id: number) {
    const result = await this.db
      .prepare('DELETE FROM posts WHERE id = ?')
      .bind(id)
      .run()
    if (!result.success) throw new Error(`Failed to delete post with id ${id}`)
  }
}
