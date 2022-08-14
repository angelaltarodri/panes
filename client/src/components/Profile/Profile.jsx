import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Profile() {
  const history = useHistory()
  const gologout = () => {
    history.push('/tienda/signout')
  }
  return (
    <div>
      <div>Profile</div>
      <div onClick={gologout}>logout</div>
    </div>
  )
}
