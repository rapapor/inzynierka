import React, { Component } from 'react';
import './style.sass'

class SmallCardProperty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ishide: false,
    }

  }

  showMore = () => {
    this.setState({ishide: !this.state.ishide})
  }

  render() {
    
    const { ishide } = this.state
    const {flat, onClickBills, onChangeStatus, id, onDelete, status, img='https://thumbs.img-sprzedajemy.pl/1000x901c/c6/87/16/komfortowe-mieszkanie-dwupoziomowe-rzeszow-455238192.jpg'} = this.props
    return (
      <section className='card-property-dashboard card-style'>
        <span onClick={() => onChangeStatus(id)} className={`status ${status.color}`}>{status.text}</span>
        <header className='card-property-dashboard-img'>
          <img alt='' src={img} />
        </header>
        <main className='property-info'>
          <span className='street'>{flat.street}</span>
          <i onClick={this.showMore} className='fas fa-chevron-circle-up icon-up'></i>
        </main>
        <div className={`card-revard ${ishide}`}>
          <i onClick={this.showMore} className='fas fa-chevron-circle-down icon-up icon-down'></i>
          <div className="col-12 row">
            <div className="col-8">
              <p className="detail-label">Adres: <span className='detail-value'>{flat.street}</span></p>
              <p className="detail-label">Miasto: <span className='detail-value'>{flat.city}</span></p>
              <p className="detail-label">Opis: <span className='detail-value'>{flat.description}</span></p>
              <p className="detail-label">Kop pocztowy: <span className='detail-value'>{flat.postCode}</span></p>
              <p className="detail-label">Cena: <span className='detail-value'>{flat.price}</span></p>
              <p className="detail-label">Powierzchnia: <span className='detail-value'>{flat.surface}</span></p>
            </div>
            <div className="col-4">
            {flat.imagesUrls.map((image, index) => <img key={index} className="p-2" width="100" src={image} alt="..."/>)}
            </div>
          </div>
          <div className="col-12 row action-container">
            <span  onClick={() => onClickBills(flat.id)}>
              <i className='fas fa-comment-dollar bill-action'></i>
            </span>
            <span onClick={() => onDelete(flat.id)} >
              <i className='fas fa-trash-alt trash-action'></i>
            </span>
          </div>
        </div>
      </section>
    )
  }
}

export default SmallCardProperty