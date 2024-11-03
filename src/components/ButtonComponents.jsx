import React from 'react'

export default function ButtonComponents(props) {
    const {text, onClick, background, type}=props
  return (
    <div>
      <button type={type} onClick={onClick} style={{background: background ? background: "wffff", color: '#fff',borderRadius: 10}}>
        {text}
      </button>
    </div>
  )
}
