import { AnyAction } from "redux";
import { put, takeEvery } from "redux-saga/effects";
import PostsHandlerAPI from "../../data/apis/PostsHandlerAPI";
import { PostsActions, postsActions } from "./actions";


export function* sagaPosts() {
    yield takeEvery(PostsActions.FETCH_ALL_POSTS, fetchAllPosts);
    yield takeEvery(PostsActions.FETCH_ALL_USERS, fetchAllUsers);
}

function* fetchAllPosts(action: AnyAction) {
    try{
        const response = yield PostsHandlerAPI.getAllPosts();
        yield put(postsActions.fetchAllPostsSuccess(response));
    }catch(e){
        yield put(postsActions.fetchAllPostsFailed());
    }
}

function* fetchAllUsers(action: AnyAction) {
    try{
        const response = yield PostsHandlerAPI.getAllUser();
        yield put(postsActions.fetchAllUsersSuccess(response));
    }catch(e){
        yield put(postsActions.fetchAllUsersFailed());
    }
}
