import React from 'react';
import './style.sass'

const SmallCardProperty = ({ onClickBills, onChangeStatus, id, onDelete, surface, bail, street, status, img='https://thumbs.img-sprzedajemy.pl/1000x901c/c6/87/16/komfortowe-mieszkanie-dwupoziomowe-rzeszow-455238192.jpg'}) => {
return (
  <div className="card small-card col-md-4">
    <div className="card-image waves-effect waves-block waves-light">
      <img className="activator" src={img} alt=""/>
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{street}<i className="material-icons right">more_vert</i></span>
      <span onClick={() => onChangeStatus(id)} className={`status ${status.color}`}>{status.text}</span>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">{street}<i className="material-icons right">close</i></span>
      <p>Przekazujemy wiecej informacji z flats i wyświetlamy tutaj (ładnie sformatowane!)</p>

      <span className='tip-property'>Cena</span>
      <span className='street'>{street}</span>
      <span className='price'>{bail}</span>
      <span className='surface'>{surface}</span>
      <div>
        <div className="fixed-action-btn click-to-toggle direction-top direction-left active">
          <span className="btn-floating btn-large red">
            <i className="material-icons">mode_edit</i>
          </span>
          <ul>
            <li>
              <span className="btn-floating green" onClick={() => onClickBills(id)}>
                <i className="material-icons">attach_money</i>
              </span>
            </li>
            <li>
              <span className="btn-floating red darken-1" onClick={() => onDelete(id)}>
                <i className="material-icons">delete</i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SmallCardProperty