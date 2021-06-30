import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import { Avatar, IconButton } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { useCollection } from 'react-firebase-hooks/firestore'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import firebase from 'firebase/app'
import { useState, useRef, useEffect } from 'react'
import getRecipientEmail from '../utils/getRecipientEmail'
import Message from '../components/Message'
import TimeAgo from 'timeago-react'

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const endOfMessageRef = useRef()

  // prettier-ignore
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(chat.users, user))
  )

  const [input, setInput] = useState('')

  function showMessages() {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  function scrollToBottom(behavior = 'auto') {
    endOfMessageRef.current.scrollIntoView({
      behavior: behavior,
      block: 'start',
    })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  function sendMessage(e) {
    e.preventDefault()

    // update last seen
    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    })

    setInput('')
    scrollToBottom('smooth')
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const recipientEmail = getRecipientEmail(chat.users, user)

  return (
    <Container>
      <Header>
        {recipient ? <Avatar src={recipient?.photoURL} /> : <Avatar>{recipientEmail[0]}</Avatar>}
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last active:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Unavailable'
              )}
            </p>
          ) : (
            <p>Loading Last Active...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>

      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type='submit' onClick={sendMessage}>
          SEND
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div``

const Header = styled.div`
  position: sticky;
  top: 0;
  height: 80px;
  background: white;
  z-index: 100;
  display: flex;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin: 0;
    margin-bottom: 3px;
  }

  > p {
    margin: 0;
    font-size: 14px;
    color: gray;
  }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div`
  padding: 30px;
  background: #e5ded8;
  min-height: 90vh;
`

const EndOfMessage = styled.div`
  margin-bottom: 52px;
`

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background: white;
  z-index: 100;
`

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  position: sticky;
  bottom: 0;
  background: whitesmoke;
  margin: 0 15px;
`
