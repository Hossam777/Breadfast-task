import Post from "../../models/Post"
import User from "../../models/User"

export enum PostsActions {
    FETCH_ALL_POSTS = "FETCH_ALL_POSTS",
    FETCH_ALL_POSTS_SUCCESS = "FETCH_ALL_POSTS_SUCCESS",
    FETCH_ALL_POSTS_FAILED = "FETCH_ALL_POSTS_FAILED",

    FETCH_ALL_USERS = "FETCH_ALL_USERS",
    FETCH_ALL_USERS_SUCCESS = "FETCH_ALL_USERS_SUCCESS",
    FETCH_ALL_USERS_FAILED = "FETCH_ALL_USERS_FAILED",
}

export const postsActions = {
    fetchAllPosts: () => ({
        type: PostsActions.FETCH_ALL_POSTS
    }),
    fetchAllPostsSuccess: (posts: Post[]) => ({
        type: PostsActions.FETCH_ALL_POSTS_SUCCESS,
        payload: posts
    }),
    fetchAllPostsFailed: () => ({
        type: PostsActions.FETCH_ALL_POSTS_FAILED
    }),
    fetchAllUsers: () => ({
        type: PostsActions.FETCH_ALL_USERS
    }),
    fetchAllUsersSuccess: (posts: User[]) => ({
        type: PostsActions.FETCH_ALL_USERS_SUCCESS,
        payload: posts
    }),
    fetchAllUsersFailed: () => ({
        type: PostsActions.FETCH_ALL_USERS_FAILED
    })
}