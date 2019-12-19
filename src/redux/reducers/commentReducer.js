import axios from 'axios';

const initialState = {
    comments: [],
};

const GET_ALL = 'GET_ALL';
const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

export function getAll() {
    return {
        type: GET_ALL,
        payload: axios.get('/api/comments')
    }
}

export function addReview(newComment) {
    return {
        type: ADD_COMMENT,
        payload: axios.post('/api/comments/add', newComment)
    }
}

export function editComment(commentId, editedComment) {
    return {
        type: EDIT_COMMENT,
        payload: axios.put(`/api/comments/${commentId}`, editedComment)
    }
}

export function deleteReview(commentId) {
    return {
        type: DELETE_COMMENT,
        payload: axios.delete(`/api/comments/${commentId}`)
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case `${GET_ALL}_FULFILLED`:
            return {
                reviews: payload.data
            }
        case `${ADD_COMMENT}_FULFILLED`:
            return {
                reviews: payload.data
            }
        case `${EDIT_COMMENT}_FULFILLED`:
            return {
                reviews: payload.data
            }
        case `${DELETE_COMMENT}_FULFILLED`:
            return {
                reviews: payload.data
            }
        default: return state;
    }
}