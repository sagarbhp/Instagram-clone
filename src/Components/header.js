import React, {useState, useEffect} from 'react'
import { Button, Input } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import {getModalStyle, useStyles} from "./Modal/Modal"
import "./css/header.css"
import Login from "./Login"


function Header({setUser}) {
    
    
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };


    return (
    <>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div>
              <Login setUser={setUser}/>
          </div>
        </Modal>

        <div>
            <div className="header">
                <img className="header__image"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" 
                    alt="instagram" 
                />
                <div className="header__buttons">
                    <Button variant="contained" color="primary" onClick={handleOpen}>Log in</Button>
                    <Button>Register</Button>
                </div>
            </div>
            
        </div>

        </>
    )
}

export default Header