  import React, {useState} from 'react'
  import { Button, Input } from '@material-ui/core';
  import {storage, db} from "./firebase"
  import firebase from "firebase"
  import "./ImageUpload.css"
  
  function ImageUpload({username}) {
      const [caption, setCaption] = useState()
      const [image, setImage] = useState(null)
      const [url, setUrl] = useState("")
      const [progress, setProgress] = useState(0)

      const handleChange = (e) =>{
          if (e.target.files[0]){
              setImage(e.target.files[0])
          }
      }

      const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                )
                setProgress(progress)
            },
            (error)=>{
                console.log(error)
                alert(error.message)
            },
            ()=>{
                storage.ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    })

                    setProgress(0)
                    setCaption("")
                    setImage(null)
                })
            }
        )
      }

      return (
          <div className="imageupload">
            
            <input type="file" onChange={handleChange}></input>
              <input type="text" placeholder="Enter a caption"
                value={caption} onChange={(e)=>setCaption(e.target.value)}
              />
              <progress className="imageupload__progress" value={progress} max="100" />
              
              <Button onClick={handleUpload}> Upload </Button>
          </div>
      )
  }
  
  export default ImageUpload
  