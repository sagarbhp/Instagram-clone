import React, {useState} from 'react'
import {getModalStyle, useStyles} from "./Modal/Modal"


const Login=()=> {

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    return (
        <div style={modalStyle} className={classes.paper}>
            Hi there
        </div>
    )
}

export default Login
