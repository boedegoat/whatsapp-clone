import { Circle } from 'better-react-spinkit'

const Loading = () => {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png'
          alt='whatsapp icon'
          height={200}
          style={{ marginBottom: 10 }}
        />
        <Circle color='#3cbc20' size={60} />
      </div>
    </center>
  )
}

export default Loading
