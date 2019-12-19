import React, { Component } from 'react'
import axios from 'axios';
import {registerUser, loginUser, updateUser} from '../redux/reducers/userReducer';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    registerUser = e => {
        axios.post("/auth/user/new", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            this.props.updateUser(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    loginUser = e => {
        axios.post("/auth/user/login", {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            this.props.updateUser(response.data)
        }).catch(err => {
            console.log(err)
        })
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();

        if (e.target.name === 'register') {
            this.props.registerUser(this.state)
        } else {
            this.props.loginUser({
                email: this.state.email,
                password: this.state.password
            })
        }
    }
    render() {
        console.log(this.props.userId)
        if (this.props.userId) return <Redirect to='/home' />

        return (
            <div>
                <h1>Login or Register</h1>
                <label>Email</label>
                <input
                    name='email'
                    onChange={this.handleInput}
                />
                <br /><br />
                <label>Password</label>
                <input
                    name='password'
                    type='password'
                    onChange={this.handleInput}
                />
                <br /><br />
                <label>Name</label>
                <input
                    name='name'
                    onChange={this.handleInput}
                />
                <br /><br />
                <button
                    name='register'
                    onClick={this.handleSubmit}
                >Sign Up</button>
                <button
                    name='login'
                    onClick={this.handleSubmit}
                >Log In</button>

            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userId: reduxState.userReducer.userId
    }
}

export default connect(mapStateToProps,
    {
        registerUser,
        loginUser,
        updateUser
    })(LoginPage)