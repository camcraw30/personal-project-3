import axios from 'axios';

const initialState = {
    posts: [],
};

const GET_ALL = 'GET_ALL';
const GET_ONE = 'GET_ONE';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';

export function getCertainPost(postId) {
    return {
        type: GET_ONE,
        payload: axios.get(`/api/social/post/${postId}`)
    }
}

export function getPosts() {
    return {
        type: GET_ALL,
        payload: axios.get('/api/social/posts')
    }
}

export function addPost(newPost) {
    return {
        type: ADD_POST,
        payload: axios.post('/api/social/add', newPost)
    }
}

export function editPost(postId, editedPost) {
    return {
        type: EDIT_POST,
        payload: axios.put(`/api/social/post/${postId}`, editedPost)
    }
}

export function deletePost(postId) {
    return {
        type: DELETE_POST,
        payload: axios.delete(`/api/social/post/${postId}`)
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case `${GET_ALL}_FULFILLED`:
            return {
                posts: payload.data
            }
        case `${GET_ONE}_FULFILLED`:
            return {
                posts: payload.data
            }
        case `${ADD_POST}_FULFILLED`:
            return {
                posts: payload.data
            }
        case `${EDIT_POST}_FULFILLED`:
            return {
                posts: payload.data
            }
        case `${DELETE_POST}_FULFILLED`:
            return {
                posts: payload.data
            }
        default: return state;
    }
}