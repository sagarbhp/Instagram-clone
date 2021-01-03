import React, { useState, useEffect } from 'react';
import './App.css';
import Posts from "./Posts"
import { db, auth } from "./firebase"
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from "./ImageUpload"


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Src() {
  const classes = useStyles();
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [modelStyle]=useState(getModalStyle)

  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  const [email, setEmail] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser)
        setUser(authUser)
        if(authUser.displayName){

        }else{
          return authUser.updateProfile({
            displayName: username,
          })
        }
      }else{
        setUser(null);
      }
    })
    return ()=>{
      unsubscribe()
    }
  }, [user, username])


  useEffect(() => {
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>
        ({
          id:doc.id,
          post:doc.data()
        })
          ))
    })
  }, [])

  const signUp =(e)=>{
    e.preventDefault()

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
       return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>alert(error.message))

    setOpen(false)
  }

  const signIn = (e) =>{
    e.preventDefault()

    auth.signInWithEmailAndPassword(email,  password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false)
  }
   
  return (
    <>


    <div className="app">
    
    <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
      <div style={modelStyle} className={classes.paper}>
        <center>
          <img
            className="app__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
            alt="instagram" 
            />
          </center>
          <form className="app__signup">
            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        
      </div>
        
      </Modal>

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
      <div style={modelStyle} className={classes.paper}>
        <center>
          <img
            className="app__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
            alt="instagram" 
            />
          </center>

          <form className="app__signup">
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        
      </div>
        
      </Modal>
     {/*----------------------------------------------------- Header goes here */}
        <div className="app__header">
          <img className="app__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
            alt="instagram" 
          />

          {user ?
          <Button onClick={()=>auth.signOut()}>Log out</Button>
          :(
            <div className="app__loginContainer">
              <Button variant="contained" color="primary" onClick={()=>setOpenSignIn(true)}>Login</Button>
              <Button onClick={()=>setOpen(true)}>Sign Up</Button>
            </div>
            
            )
          }
        </div>



        {user?.displayName?
        <ImageUpload username={user.displayName}/>
        :<h3>Login to Upload</h3>}
 
        {
          posts.map((post)=>{
            return <Posts key={post.id} user={user?.displayName} id={post.id} {...post}/>
          })
        }

     {/* -------------------------------------------------------Posts */}
    </div></>
  );
}

export default Src;
