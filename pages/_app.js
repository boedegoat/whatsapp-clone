import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import Login from './login'
import Loading from '../components/Loading'
import { useEffect } from 'react'
import firebase from 'firebase'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    nProgress.configure({ showSpinner: false })

    function handleStart(url) {
      console.log(`loading : ${url}`)
      nProgress.start()
    }

    function handleStop(url) {
      nProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  useEffect(() => {
    if (user) {
      router.push('/')
      db.collection('users').doc(user.uid).set(
        {
          email: user.email,
          displayName: user.displayName,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      )
    }
  }, [user])

  if (loading) return <Loading />
  if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
