import axios from 'axios';

const initialState = {
    userId: null,
    name: '',
    email: '',
    password: '',
    user: {}
};

const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export function registerUser(userInfo) {
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/user/new', userInfo)
    }
}

export function loginUser(userInfo) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/user/login', userInfo)
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: axios.post('/auth/user/logout')
    }
}

export function updateUser(user) {
    return {
        type: "UPDATE_USER",
        payload: user
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "UPDATE_USER":
            return {
                ...state, user: payload
            }
        case `${REGISTER_USER}_FULFILLED`:
            return {
                userId: payload.data.userId,
                name: payload.data.name,
                email: payload.data.email,
                password: payload.data.password
            }
        case `${LOGIN_USER}_FULFILLED`:
            console.log(payload)
            return {
                userId: payload.data.userId,
                name: payload.data.name,
                email: payload.data.email,
                password: payload.data.password
            }
        case `${LOGOUT_USER}_FULFILLED`:
            return initialState;
        default: return state;
    }
}