import React, {useState, useEffect} from 'react'
import "./Posts.css"
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import { Button, Input } from '@material-ui/core';


function Posts(props) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    console.log(props)
    useEffect(()=>{
        let unsubscribe;
        if(props.id){
             unsubscribe = db
            .collection("posts")
            .doc(props.id)
            .collection("comments")
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()))
            })
        }
        return()=>{
            unsubscribe();
        }
    },[props.id])

    const postComment = (e) =>{
        e.preventDefault()

        db.collection("posts").doc(props.id).collection("comments")
        .add({
            text: comment,
            username: props.user
        })

        setComment("")

    }

    console.log(props.user)


    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt="blah"
                />
                <h3>{props.post.username}</h3>
            {/* Avatar Username */}
            </div>


            <img className = "post__image"
                src={props.post.imageUrl}
                alt="kust some sunset"
            />
            {/* Image */}
            <h4 className="post__text"> <strong>{props.post.username} </strong> {props.post.caption}</h4>
            {/* username and caption */}
           
            <div className="post__comments">
            {comments.map((comment) => (
                <p>
                    <b>{comment.username}: </b>{comment.text}
                </p>
            ))}

            </div>
            
            {props.user&&
            <form>
                <input 
                    className="post__input"
                    type = "text"
                    placeholder = "Add a comment"
                    value = {comment}
                    onChange ={(e)=>{setComment(e.target.value)}}
                />
                <Button type="submit"
                    disabled = {!comment}
                    onClick={postComment}
                >Post</Button>
            </form>}
        </div>
    )
}

export default Posts
