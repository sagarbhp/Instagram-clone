import React from 'react'
import { Avatar } from '@material-ui/core';
import "./css/Post.css"

function Post({post}) {
    
    return (
        <div className="post">
            <div className="post__header">
                <Avatar />
                <h3>{post.username}</h3>
            </div>
            
            <div >
                <img className="post__image" src={post.imageUrl} alt="hithere" />
            </div>

            <div className="post__text">
                <p>{post.caption}</p>
            </div>
            
        </div>
    )
}

export default Post
