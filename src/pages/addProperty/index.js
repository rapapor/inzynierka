import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import Button from './../../components/button'
import Input from './../../components/input'
import Textarea from './../../components/textArea'
import api from './../../api'

import './style.sass'


class AddProperty extends Component {
  constructor(props) {
    super(props)
    this.titleInput = React.createRef();
    this.priceInput = React.createRef();
    this.bailInput = React.createRef();
    this.surfaceInput = React.createRef();
    this.roomsInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.streetInput = React.createRef();
    this.houseNumberInput = React.createRef();
    this.cityInput = React.createRef();
    this.postCodeInput = React.createRef();
    this.buildingTypeInput = React.createRef();
    this.materialTypeInput = React.createRef();
    this.constructionYearInput = React.createRef();
    this.windowsTypeInput = React.createRef();
    this.floorInput = React.createRef();
    this.numberOfFloors = React.createRef();
    this.heatingInput = React.createRef();
    this.balconyInput = React.createRef();
    this.state = {
      property: {
        title: '',
        price: '',
        bail: '',
        surface: '',
        rooms: '',
        description: '',
        street: '',
        houseNumber: '',
        city: '',
        postCode: '',
        buildingType: '',
        materialType: '',
        constructionYear: '',
        windowsType: '',
        floor: '',
        numberFloors: '',
        heating: '',
        balcony: '',
        additionalInformation: {
          bike_storage: false,
          storage: false,
          tv_pack: false,
          internet: false,
          h_protection: false,
          parking_protection: false,
          oven: false,
          washer: false,
          w_machine: false,
          fridge: false
        },
      }
    }
  }

  handleChange = (event) => {
      this.setState({ property: {
        ...this.state.property,
        title: this.titleInput.current.value,
        price: this.priceInput.current.value,
        bail: this.bailInput.current.value,
        surface: this.surfaceInput.current.value,
        rooms: this.roomsInput.current.value,
        description: this.descriptionInput.current.value,
        street: this.streetInput.current.value,
        houseNumber: this.houseNumberInput.current.value,
        city: this.cityInput.current.value,
        postCode: this.postCodeInput.current.value,
        buildingType: this.buildingTypeInput.current.value,
        materialType: this.materialTypeInput.current.value,
        constructionYear: this.constructionYearInput.current.value,
        windowsType: this.windowsTypeInput.current.value,
        floor: this.floorInput.current.value,
        numberFloors: this.houseNumberInput.current.value,
        heating: this.heatingInput.current.value,
        balcony: this.balconyInput.current.value
      }})
      const target = event.target;
      if (target.type === 'checkbox') {
        const value = target.checked
        const name = target.name;
        this.setState({
          property: { ...this.state.property, additionalInformation: { ...this.state.property.additionalInformation, [name]: value } }
        });
      } 
  }

  onFormSubmit = () => {
    var token = localStorage.getItem('token')
    api.createProperty(this.state.property, token)
  }

  render(){
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/login/" />
      )
    }
    return (
      <div className="addProperty-container">
        <div className="addProperty-form"> {/* onSubmit={this.onFormSubmit */}
          <div className="base-info-container card-style">
            <span className="section-label">Informacje podstawowe</span>
            <div className="left-side-form-add-property">
            <Input
              placeholder={'Tytuł'}
              onChange={this.handleChange}
              refs={this.titleInput}
              value={this.state.property.title}
              // error={this.state.error}
            />
            <Input
              placeholder={'Cena'}
              onChange={this.handleChange}
              refs={this.priceInput}
              value={this.state.property.price}
              // error={this.state.error}
            />
            <Input
              placeholder={'Kaucja'}
              onChange={this.handleChange}
              refs={this.bailInput}
              value={this.state.property.bail}
              // error={this.state.error}
            />
            <Input
              placeholder={'Powierzchnia'}
              onChange={this.handleChange}
              refs={this.surfaceInput}
              value={this.state.property.surface}
              // error={this.state.error}
            />
            <Input
              placeholder={'Liczba pokoi'}
              onChange={this.handleChange}
              refs={this.roomsInput}
              value={this.state.property.rooms}
              // error={this.state.error}
            />
            </div>
            <div className="right-side-form-add-property">
            <Textarea
              rows={"10"}
              cols={"100"}
              placeholder={'Opis'}
              onChange={this.handleChange}
              refs={this.descriptionInput}
              value={this.state.property.description}
              // error={this.state.error}
            />
            <input type="file" name="img" multiple />
            </div>
          </div>
          <div className="specialize-container">
            <div className="localization-container card-style">
              <span className="section-label">Lokalizacja</span>
              <div className="form-container">
                <Input
                  placeholder={'Ulica'}
                  onChange={this.handleChange}
                  refs={this.streetInput}
                  value={this.state.property.street}
                // error={this.state.error}
                />
                <Input
                  placeholder={'Numer domu'}
                  onChange={this.handleChange}
                  refs={this.houseNumberInput}
                  value={this.state.property.houseNumber}
                // error={this.state.error}
                />
                <Input
                  placeholder={'Miasto'}
                  onChange={this.handleChange}
                  refs={this.cityInput}
                  value={this.state.property.city}
                // error={this.state.error}
                />
                <Input
                  placeholder={'Kod pocztowy'}
                  onChange={this.handleChange}
                  refs={this.postCodeInput}
                  value={this.state.property.postCode}
                // error={this.state.error}
                />
              </div>
            </div>
            <div className="otherInfo-container card-style">
              <span className="section-label">Informacje szczegółowe</span>
              <div className="form-container">
                <div className="col-6">
                  <Input
                    placeholder={'Rodzaj zabudowy'}
                    onChange={this.handleChange}
                    refs={this.buildingTypeInput}
                    value={this.state.property.buildingType}
                  // error={this.state.error}
                  />
                  <Input
                    placeholder={'Materiały budynku'}
                    onChange={this.handleChange}
                    refs={this.materialTypeInput}
                    value={this.state.property.materialType}
                  // error={this.state.error}
                  />
                  <Input
                    placeholder={'Rok budowy'}
                    onChange={this.handleChange}
                    refs={this.constructionYearInput}
                    value={this.state.property.constructionYear}
                  // error={this.state.error}
                  />
                  <Input
                    placeholder={'Okna'}
                    onChange={this.handleChange}
                    refs={this.windowsTypeInput}
                    value={this.state.property.windowsType}
                  // error={this.state.error}
                  />
                </div>
                <div className="col-6">
                  <Input
                    placeholder={'Piętro'}
                    onChange={this.handleChange}
                    refs={this.floorInput}
                    value={this.state.property.floor}
                  // error={this.state.error}
                  />
                  <Input
                    placeholder={'Ilość pięter w budynku'}
                    onChange={this.handleChange}
                    refs={this.houseNumberInput}
                    value={this.state.property.numberFloors}
                  // error={this.state.error}
                  />
                  <Input
                    placeholder={'Ogrzewanie'}
                    onChange={this.handleChange}
                    refs={this.heatingInput}
                    value={this.state.property.heating}
                  // error={this.state.error}
                  />
                  <Input
                    placeholder={'Balkon'}
                    onChange={this.handleChange}
                    refs={this.balconyInput}
                    value={this.state.property.balcony}
                  // error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="additional-special-info-container card-style">
            <span className="section-label">Dodatkowe informacje</span>
            <div className="form-container container-checkbox">
            <div className="col-4 ">
              <span className="label-checkbox-section">Sprzęt</span>
              <div className="checkbox-section">
                <div><input type="checkbox" name="oven" value="Piekarnik" onChange={this.handleChange} checked={this.state.property.additionalInformation.oven}/> <span className="single-label-checkbox">Piekarnik</span></div>
                <div><input type="checkbox" name="washer" value="Pralka" onChange={this.handleChange} checked={this.state.property.additionalInformation.washer} /> <span className="single-label-checkbox">Pralka</span></div>
                <div><input type="checkbox" name="w_machine" value="Zmywarka" onChange={this.handleChange} checked={this.state.property.additionalInformation.w_machine}/> <span className="single-label-checkbox">Zmywarka</span></div>
                <div><input type="checkbox" name="fridge" value="Lodówka" onChange={this.handleChange} checked={this.state.property.additionalInformation.fridge}/> <span className="single-label-checkbox">Lodówka</span></div>
              </div>
            </div>
            <div className="col-4">
              <span className="label-checkbox-section">Media</span>
              <div className="checkbox-section">
                <div><input type="checkbox" name="tv_pack" value="Pakiet telewizyjny" onChange={this.handleChange} checked={this.state.property.additionalInformation.tv_pack}/> <span className="single-label-checkbox">Pakiet telewizyjny</span></div>
                <div><input type="checkbox" name="internet" value="Internet" onChange={this.handleChange} checked={this.state.property.additionalInformation.internet}/> <span className="single-label-checkbox">Internet</span></div>
              </div>
            </div>
            <div className="col-4">
              <span className="label-checkbox-section">Pozostałe informacje</span>
              <div className="checkbox-section">
                <div><input type="checkbox" name="h_protection" value="Ochrona osiedla" onChange={this.handleChange} checked={this.state.property.additionalInformation.h_protection}/> <span className="single-label-checkbox">Ochrona osiedla</span></div>
                <div><input type="checkbox" name="parking_protection" value="Parking strzezony" onChange={this.handleChange} checked={this.state.property.additionalInformation.parking_protection}/> <span className="single-label-checkbox">Parking strzeony</span></div>
                <div><input type="checkbox" name="storage" value="Komórka lokatorska" onChange={this.handleChange} checked={this.state.property.additionalInformation.storage}/> <span className="single-label-checkbox">Komórka lokatorska</span></div>
                <div><input type="checkbox" name="bike_storage" value="Rowerownia" onChange={this.handleChange} checked={this.state.property.additionalInformation.bike_storage}/> <span className="single-label-checkbox">Rowerownia</span></div>
              </div>
            </div>
            </div>
          </div>
          <div className="confirm-btn-container">
            <Button type="accept" label={'Zapisz'} btnType={'submit'} onClick={this.onFormSubmit}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AddProperty