import React from 'react';
import './style.sass'

import addIcon from './../../assets/images/card-property-items/ikona_dodawania.png'
import editIcon from './../../assets/images/card-property-items/ikona_edycji.png'
import deleteIcon from './../../assets/images/card-property-items/ikona_usuwania.png'




const SmallCardProperty = ({onChangeStatus, id, onDelete, surface, bail, street, status, img='https://thumbs.img-sprzedajemy.pl/1000x901c/c6/87/16/komfortowe-mieszkanie-dwupoziomowe-rzeszow-455238192.jpg'}) => {
return (
    <section className='card-property-dashboard card-style'>
      <span onClick={() => onChangeStatus(id)} className={`status ${status.color}`}>{status.text}</span>
      <header className='card-property-dashboard-img'>
        <img alt='' src={img} />
      </header>
      <main className='property-info'>
        <span className='tip-property'>Cena</span>
        <span className='street'>{street}</span>
        <span className='price'>{bail}</span>
        <span className='surface'>{surface}</span>
      </main>
      <footer className='footer-single-cart'>
        <span className='action-button'><img alt='' src={addIcon} /></span>
        <span className='action-button'><img alt='' src={editIcon} /></span>
        <span className='action-button'><img alt='' src={deleteIcon} onClick={() => onDelete(id)}/></span>
      </footer>
    </section>
  )
}

export default SmallCardProperty