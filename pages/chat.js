import React from 'react'
import { Chatting, Modal } from '../Components/Chat'

const chat = () => {
  return (
    <div>
      <Chatting />
      <Modal />

      {/* Scripts */}
      <script type='module' src='script.js'></script>
    </div>
  )
}

export default chat