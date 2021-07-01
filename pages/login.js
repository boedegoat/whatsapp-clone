import styled from 'styled-components'
import Head from 'next/head'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()

  function signIn() {
    auth.signInWithPopup(provider).catch(alert)
  }

  useEffect(() => {
    router.push('/login')
  }, [])

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LogoContainer>
        <Logo>
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png'
            width={200}
            height={200}
            alt='logo'
          />
        </Logo>
        <Button variant='outlined' onClick={signIn}>
          Sign In with Google
        </Button>
      </LogoContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background: whitesmoke;
`

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const Logo = styled.div`
  margin-bottom: 1rem;
`
