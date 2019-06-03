import React from 'react';
import loader from './../../assets/images/loader.gif'
import './style.sass'

const Loader = (absolute) => {
  return (
    <div className={`${absolute ? 'loaderAbsolute' : ''}`}>
      <img src={loader}  alt="loader"/>
    </div>
  )
}

export default Loader