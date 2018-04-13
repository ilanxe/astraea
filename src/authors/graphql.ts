import {IResolvers, ITypedef} from 'graphql-tools'
import {Comment} from '../comments/dao'
import * as CommentsGQL from '../comments/graphql'
import {Value} from '../common/graphql'
import {Post} from '../posts/dao'
import * as PostsGQL from '../posts/graphql'
import * as DAO from './dao'

/** Author schema */
export interface Author extends DAO.BaseAuthor {
  comments: CommentsGQL.Comment[]
  posts: PostsGQL.Post[]
}

// Arguments for author query
type AuthorArgs = Pick<Author, 'id'>

/** Resolvers */
export interface Resolvers extends IResolvers {
  Author: {
    comments(author: DAO.Author): Value<Comment[]>
    posts(author: DAO.Author): Value<Post[]>
  }
  Query: {
    author(root: {}, args: AuthorArgs): Value<DAO.Author>
  }
}

/**
 * Schema definition generator
 * @return Schema definition
 */
export function typeDefs(): ITypedef[] {
  return [
    `
      type Author {
        id: Int!
        name: String!
        posts: [Post!]!
        comments: [Comment!]!
      }

      extend type Query {
        author(id: Int!): Author!
      }
    `,
    CommentsGQL.typeDefs,
    PostsGQL.typeDefs,
  ]
}