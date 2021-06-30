import { Circle } from 'better-react-spinkit'
import Image from 'next/image'

const Loading = () => {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div>
        <div style={{ marginBottom: 10 }}>
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png'
            alt='whatsapp icon'
            width={200}
            height={200}
          />
        </div>
        <Circle color='#3cbc20' size={60} />
      </div>
    </center>
  )
}

export default Loading
