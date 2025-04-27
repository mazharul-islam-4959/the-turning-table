import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes.</p>
        <button onClick={() => {
          const element = document.getElementById('food-display');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}>View menu</button>
      </div>
    </div>
  )
}

export default Header
