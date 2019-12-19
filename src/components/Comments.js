import React, { Component } from 'react';
import axios from 'axios';

export default class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        axios.get("/api/comments").then(response => {
            console.log(response.data)
            this.setState({comments: response.data})
        }).catch(err => {
            console.log(err)
        })
    }

    updateComment = (e, id) => {
        // console.log(e.target.value)
        axios.put("/api/comments/edit", {
            comment: e.target.value,
            comment_id: id
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
