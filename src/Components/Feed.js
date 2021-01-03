import React, {useState, useEffect} from 'react'
import { db, auth } from "../firebase"
import Post from './Post'

function Feed() {
    const [posts, setPosts] =useState([])

    useEffect(()=>{
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>(
                {
                    id:doc.id,
                    post:doc.data()
                }
            )))
        })
        
    } , [])


    return (
        <div>
            {
                posts.map(post=>{
                    return <Post key={post.id} {...post} />
                })
            }
            
        </div>
    )
}

export default Feed
