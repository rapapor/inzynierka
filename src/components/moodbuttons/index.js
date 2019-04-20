import React, { Component } from 'react';
import './style.sass'

const MoodButton = ({ label, val, id, onClick }) => (
  <button 
    data-rating={id}
    className={`mood-btn ${val}`} 
    onClick={() => onClick(id, val, label)}
  >{label}</button>
)


export default MoodButton