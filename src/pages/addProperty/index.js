import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import Button from './../../components/button'
import CardComponent from './../../components/cardComponent'
import Input from './../../components/input'
import Textarea from './../../components/textArea'
import api from './../../api'
import swal from '@sweetalert/with-react'


import './style.sass'

class AddProperty extends Component {
  InitialState = {
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
    },
    term: '',
    items: [],
    images: []
  }
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
    this.state = this.InitialState
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
        numberFloors: this.numberOfFloors.current.value,
        heating: this.heatingInput.current.value,
        balcony: this.balconyInput.current.value
      }})
  }

  handleChangeAddInfo = (event) => {
    this.setState({term: event.target.value});
  }

  onSubmitAddInfo = (event) => {
    event.preventDefault()
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }
  
  onFormSubmit = () => {
    const {property, items, images} = this.state
    var token = localStorage.getItem('token')
    api.createProperty(property, token, items, images).then(res => {
      if(res.status === 200 ) {
        swal({
          title: "Dodałeś Nieruchomość!",
          text: "Dziękujemy za zaufanie!",
          icon: "success",
          button: "Dziękuję!",
        }).then((value) => {
          this.setState(this.InitialState)
        });
      } else {
        swal({
          title: "Coś poszło nie tak",
          text: "Bardzo przepraszamy niestety nie udało się dodać nieruchomości, spróbuj ponownie",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then( () => {
          this.setState(this.InitialState )
        })
      }
      
    })
  }

  

  onChangeFileInput = (e) => {
    let idCardBase64 = '';
    let file = e.target.files[0]
    this.getBase64(file, (result) => {
    idCardBase64 = result;
    if( this.state.images.length >= 3) {
      alert('Maksimum plików to 3')
    } else {
      this.setState({
        images: [...this.state.images, idCardBase64]
      })
    }
});
  }

  deleteItemFromAddInfo = (itemIndex) => {
    const { items } = this.state
    const filteredItems = items.slice(0, itemIndex).concat(items.slice(itemIndex + 1, items.length))
    this.setState({
      items: filteredItems
    })
  }

  deleteItemFromImages = (itemIndex)=> {
    const { images } = this.state
    const filteredItems = images.slice(0, itemIndex).concat(images.slice(itemIndex + 1, images.length))
    this.setState({
      images: filteredItems
    })
  }

  getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
  render(){
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/login/" />
      )
    }
    return (
      <div className="addProperty-container">
        <div className="addProperty-form">
          <div className="row col-12 flex-0">
            <CardComponent label='Informacje podstawowe' >
              <div className="base-info-container row col-12">
                <div className="row col-6">
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
                <div className="row col-6">
                  <Textarea
                    rows={"10"}
                    cols={"100"}
                    placeholder={'Opis'}
                    onChange={this.handleChange}
                    refs={this.descriptionInput}
                    value={this.state.property.description}
                    // error={this.state.error}
                  />
                  
                </div>
                <div className="row col-12 d-flex-inline align-items-baseline">
                  <input className="col-4" type="file" name="img" onChange={this.onChangeFileInput} />
                  <input className="col-4" type="file" name="img" onChange={this.onChangeFileInput} />
                  <input className="col-4" type="file" name="img" onChange={this.onChangeFileInput} />
                </div>
                <div className="row col-12 preview-container">
                  {this.state.images.map((item, index) => <div key={item} className="single-preview-container col-3"><img className="img-preview" alt="preview" src={item} /><span onClick={() => this.deleteItemFromImages(index)} className="delete-btn">&#10008;</span></div> )}
                </div>
              </div>
            </CardComponent>
          </div>
          <div className="row col-12 flex-0">
              <CardComponent label="Lokalizacja">
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
              </CardComponent>
            </div>
            <div className="row col-12 flex-0">
              <CardComponent label="Informacje szczegółowe">
                <div className="form-container">

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
                      refs={this.numberOfFloors}
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
              </CardComponent>
            </div>
          <div className="row col-12 flex-0">
            <div className="additional-special-info-container col-12">
              <CardComponent label="Dodatkowe informacje">
                <div className="input-addInfo-container">
                  <form className="add-info-form" onSubmit={this.onSubmitAddInfo}>
                      <Input
                          placeholder={'Dodatkowe informacje'}
                          onChange={this.handleChangeAddInfo}
                          value={this.state.term}
                        // error={this.state.error}
                        />
                      <Button className="asdf" type="accept" label={'Dodaj'} btnType={'submit'} />   
                  </form>
                  <div className="additional-info-list">
                    {this.state.items.map((item, index) => <div className="add-info-item" key={index}>{item}<span onClick={() => this.deleteItemFromAddInfo(index)} className="delete-btn">&#10008;</span></div>)}
                  </div>
                </div>
              </CardComponent>
            </div>
            <div className="confirm-btn-container">
              <Button type="accept" label={'Zapisz'} btnType={'submit'} onClick={this.onFormSubmit}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddProperty