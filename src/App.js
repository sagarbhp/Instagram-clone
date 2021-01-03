import React from 'react'
import Src from "./src"
import Header from "./Components/header"
import Feed from "./Components/Feed"
import { useState } from 'react'

function App() {
  const [user, setUser] = useState(null)
  return (
    <div>
      <Header setUser = {setUser}/>
      <Feed />
    </div>
  )
}

export default App
