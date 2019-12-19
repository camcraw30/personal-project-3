import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from "./Header";

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            redirect: false,
            post: "",
            editStatus: false
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        axios.get("/api/social/posts").then(response => {
            console.log(response.data)
            this.setState({
                posts: response.data})
            }).catch(err => {
                console.log(err)
                this.setState({ redirect: true })
        })
    }

    findPost = id => {
        console.log(id);
        axios.get("/api/social/post/:id", {id}).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    addPost = () => {
        console.log(this.state.post)
        axios.post("/api/social/post/add", {post: this.state.post}).then(response => {
            console.log(response.data)
            this.setState({posts: response.data})
        }).catch(err => {
            console.log(err)
        })
    }

    editPost = id => {
        console.log(id);
        axios.put(`/api/social/post/${id}`, {post: this.state.post}).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    toEdit = () => {
        this.setState({editStatus: !this.state.editStatus})
    }

    deletePost = id => {
        console.log(id);
        axios.delete(`/api/social/post/${id}`).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    handleChange = (e) => {
        this.setState({post: e.target.value})
    }

    render() {

        if (this.state.redirect === true) { 
            return <Redirect to='/' />
        };

        return (
            <>
            <section>
                    <Header />
                    <input onChange={this.handleChange} /><button onClick={() => this.addPost()}>Add Post</button>
                <div className='post_container'>
                    {this.state.posts.map(posts => {
                        console.log(posts.post_id)
                        return (
                            <div className='post_card'>
                                <h2>{posts.comment_id}</h2>
                                <h3>{posts.post}</h3>
                                <button onClick={this.toEdit}>Edit Post</button>
                                {this.state.editStatus === true ? <><input className="edit__input" placeholder="Edit post" onChange={this.handleChange} /> <button onClick={() => this.editPost(posts.post_id)}>Save</button> </>: null}
                                <button onClick={() => this.deletePost(posts.post_id)}>Delete Post</button>
                            </div>
                        )
                    })}
                </div>
            </section>
            </>
        )
    }
}
