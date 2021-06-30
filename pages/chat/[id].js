import styled from 'styled-components'
import Head from 'next/head'
import Sidebar from '../../components/Sidebar'
import ChatScreen from '../../components/ChatScreen'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipientEmail from '../../utils/getRecipientEmail'
import { useEffect, useState } from 'react'

export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id)

  // prettier-ignore
  // PREP the messages on the server
  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((message) => ({
      ...message,
      timestamp: message.timestamp.toDate().getTime(),
    }))

  // PREP the chats
  const chatRes = await ref.get()
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  }
}

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth)
  const [onMobile, setOnMobile] = useState(false)

  function handleWindowSize() {
    const windowWidth = window.innerWidth
    if (windowWidth <= 500) {
      setOnMobile(true)
    } else {
      setOnMobile(false)
    }
  }

  useEffect(() => {
    handleWindowSize()
    window.addEventListener('resize', handleWindowSize)
    return () => {
      window.removeEventListener('resize', handleWindowSize)
    }
  }, [])

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      {!onMobile && <Sidebar />}
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} onMobile={onMobile} />
      </ChatContainer>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  display: flex;
`

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`
