import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Comment from './Comment'

function Comments() {
  let [userList, setUserList] = useState([])
  let [triger, setTriger] = useState(0)

  let handleComments = () => {
    setTriger(triger++)
  }
  useEffect(() => {
    axios.get('http://localhost:8080/users').then(response => {
      setUserList(response.data)
      console.log('This is second?')
    })
  }, [triger])

  return (
    <div
      id="comments"
      className="bg-black text-zinc-50 h-fit-content  w-screen flex flex-col justify-center p-11 md:p-32"
    >
      <h1 className="text-4xl md:text-5xl pt-16 font-bold mb-[50px] md:mb-[100px] ">
        Comments:
      </h1>
      <div
        id="user_comments"
        className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-6"
      >
        {userList.map((val, key) => {
          return <Comment email={val.user_email} comment={val.comment} />
        })}
      </div>
    </div>
  )
}

export default Comments
