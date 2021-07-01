import styled from 'styled-components'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import moment from 'moment'
import DoneAllIcon from '@material-ui/icons/DoneAll'

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth)

  const isSender = user === userLoggedIn.email
  const TypeOfMessage = isSender ? Sender : Receiver

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>{message.timestamp ? moment(message.timestamp).format('LT') : '...'}</Timestamp>
        {isSender && message.isRead && <ReadIcon />}
      </TypeOfMessage>
    </Container>
  )
}

export default Message

const Container = styled.div``

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`

const Timestamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`

const ReadIcon = styled(DoneAllIcon)`
  position: absolute;
  bottom: -10px;
  right: -5px;
  color: #1e76e8;
`
