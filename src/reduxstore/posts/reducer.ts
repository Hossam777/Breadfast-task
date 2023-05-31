import { State } from "react-native-gesture-handler";
import { AnyAction } from 'redux';
import Post from "../../models/Post";
import { PostsActions, postsActions } from "./actions";
import User from "../../models/User";

export interface PostsState {
    posts: Post[];
    fetchingAllPosts: Boolean;
    users: User[];
    fetchingAllUsers: Boolean;
}

export const initialState: PostsState = {
    posts: [],
    fetchingAllPosts: false,
    users: [],
    fetchingAllUsers: false,
};

export const postsState = (
    state = initialState, 
    action: AnyAction
    ): PostsState => {
        switch(action.type){
            case PostsActions.FETCH_ALL_POSTS:
                return {
                    ...state,
                    fetchingAllPosts: true,
                };
            case PostsActions.FETCH_ALL_POSTS_SUCCESS:
                return {
                    ...state,
                    fetchingAllPosts: false,
                    posts: action.payload
                };
            case PostsActions.FETCH_ALL_POSTS_FAILED:
                return {
                    ...state,
                    fetchingAllPosts: false
                };
            case PostsActions.FETCH_ALL_USERS:
                return {
                    ...state,
                    fetchingAllUsers: true,
                };
            case PostsActions.FETCH_ALL_USERS_SUCCESS:
                return {
                    ...state,
                    fetchingAllUsers: false,
                    users: action.payload
                };
            case PostsActions.FETCH_ALL_USERS_FAILED:
                return {
                    ...state,
                    fetchingAllUsers: false
                };
            default:
                return state;
        }
};