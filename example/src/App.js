import React, { useState } from 'react'
import data from "./data.json"
import { CommentSection } from 'react-comments'
import 'react-comments/dist/index.css'
import uuid from 'react-uuid'
import "./App.css"


const App = () => {
  const [comment, setComment] = useState(data)
  const userId = "01a"
  const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random"
  const name = "xyz"
  let count = 0
  comment.map(i => {count+=1; i.replies && i.replies.map(i=> count+=1)} )

  return <div className="commentSection">
<div className="header">{count} Comments</div>

<CommentSection currentUser={{ userId: userId, avatarUrl: avatarUrl }} commentsArray={comment}
    onSubmit={(text, parentId, child) => {
      if (text.length > 0) {
        if (!parentId && !child) {
          setComment([...comment,
          {
            userId: userId,
            comId: uuid(),
            avatarUrl: avatarUrl,
            fullName: name,
            text: text
          }]
          );
          return
        }
        else if (parentId && child) {
          const newList = [...comment]
          let index = newList.findIndex(x => x.comId === parentId)
          newList[index].replies.push({
            userId: userId,
            comId: uuid(),
            avatarUrl: avatarUrl,
            fullName: name,
            text: text
          })
          setComment(newList)
          return
        }
        else if (parentId && !child) {
          let newList = [...comment]
          let index = newList.findIndex(x => x.comId === parentId)
          let newReplies = newList[index].replies === undefined ? [] : [...newList[index].replies]
          newReplies.push({
            userId: userId,
            comId: uuid(),
            avatarUrl: avatarUrl,
            fullName: name,
            text: text
          })
          newList[index].replies = newReplies
          setComment(newList)
          return
        }
      }
    }} editText={(id, text, parentId) => {
      if (parentId === undefined) {
        let newList = [...comment]
        let index = newList.findIndex(x => x.comId === id)
        newList[index].text = text
        setComment(newList)
      }
      else if (parentId !== undefined) {
        let newList = [...comment]
        let index = newList.findIndex(x => x.comId === parentId)
        let replyIndex = newList[index].replies.findIndex(i => i.comId === id)
        newList[index].replies[replyIndex].text = text
        setComment(newList)
      }
    }
    } deleteText={(id, parentId) => {
      if (parentId === undefined) {
        let newList = [...comment]
        let filter = newList.filter(x => x.comId !== id)
        setComment(filter)
      }
      else if (parentId !== undefined) {
        let newList = [...comment]
        let index = newList.findIndex(x => x.comId === parentId)
        let filter = newList[index].replies.filter(x => x.comId !== id)
        newList[index].replies = filter
        setComment(newList)
      }
    }
    } />
    </div>
}

export default App
