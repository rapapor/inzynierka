import React from 'react';
import './style.sass'

import addIcon from './../../assets/images/card-property-items/ikona_dodawania.png'
import editIcon from './../../assets/images/card-property-items/ikona_edycji.png'
import deleteIcon from './../../assets/images/card-property-items/ikona_usuwania.png'

const SmallCardProperty = () => {
  return (
    <section className='card-property-dashboard card-style'>
      <span className='status'>Do wynajmu</span>
      <header className='card-property-dashboard-img'>
        <img alt='' src='https://thumbs.img-sprzedajemy.pl/1000x901c/c6/87/16/komfortowe-mieszkanie-dwupoziomowe-rzeszow-455238192.jpg' />
      </header>
      <main className='property-info'>
        <span className='tip-property'>Cena</span>
        <span className='street'>Szamotulska</span>
        <span className='price'>1200</span>
        <span className='surface'>57m2</span>
      </main>
      <footer className='footer-single-cart'>
        <span className='action-button'><img alt='' src={addIcon} /></span>
        <span className='action-button'><img alt='' src={editIcon} /></span>
        <span className='action-button'><img alt='' src={deleteIcon} /></span>
      </footer>
    </section>
  )
}

export default SmallCardProperty