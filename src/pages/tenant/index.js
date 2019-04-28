import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import api from './../../api'
import Input from './../../components/input'
import Button from './../../components/button'
import swal from '@sweetalert/with-react'

import CardComponent from './../../components/cardComponent'
import './style.sass'
 
class Tenant extends Component {
  constructor(props) {
    super(props)
    this.nameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.peselInput = React.createRef();
    this.idNumberInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneNumberInput = React.createRef();
    this.state = {
      name: '',
      lastName: '',
      pesel: '',
      idNumber: '',
      email: '',
      phoneNumber: '',
      propertyId: '1',
      myFlats: [],
      myTenant: []
    }
  }

  componentDidMount(){
    this.loadFlats()
    this.loadTenant()
   }


  loadFlats = () => {
    var token = localStorage.getItem('token')
    api.getFlatsList(token).then(res => {
      console.log(res)
      this.setState({myFlats: res})
    }).catch(error => {
      console.log(error)
    })
  }

  loadTenant = () => {
    var token = localStorage.getItem('token')
    api.getTenantList(token).then(res => {
      console.log(res)
      this.setState({myTenant: res})
    }).catch(error => {
      console.log(error)
    })
  }


  handleChange = (event) => {
    this.setState({
      name: this.nameInput.current.value,
      lastName: this.lastNameInput.current.value,
      pesel: this.peselInput.current.value,
      idNumber: this.idNumberInput.current.value,
      email: this.emailInput.current.value,
      phoneNumber: this.phoneNumberInput.current.value,
    })
  }

  deleteTenant = (id) => {
    const token = localStorage.getItem('token')
    // api.deleteTenant(id, token).then(res => {
    //   this.loadFlats()
    //   this.loadTenant()
    // })
    console.log(id)
  }

  onFormSubmit = () => {
    const { name, lastName, pesel, idNumber, email, phoneNumber, propertyId} = this.state
    var token = localStorage.getItem('token')
    const tenant = {
      name: name,
      lastName: lastName,
      pesel: pesel,
      idNumber: idNumber,
      email: email,
      phoneNumber: phoneNumber,
      propertyId: propertyId,
    }
    api.createTenant(tenant, token).then(res => {
      swal({
        title: "Dodałeś Nowego najemce!",
        text: "Dziękujemy za zaufanie!",
        icon: "success",
        button: "Dziękuję!",
      }).then((value) => {
        window.location.replace('/tenant/')
      });
    })
  }

  handleChangeSelect = ( event ) => {
    this.setState({ propertyId: event.target.value })
  }

  generateMyTenant =(tenant, index) => {
    return (
      <tr key={tenant.pesel}>
        <td>{tenant.propertyAddress}</td>
        <td>{tenant.name}</td>
        <td>{tenant.lastName}</td>
        <td>{tenant.pesel}</td>
        <td>{tenant.email}</td>
        <td>{tenant.idNumber}</td>
        <td>{tenant.phoneNumber}</td>
        <td><span onClick={() => this.deleteTenant(tenant.id)} className="delete-btn">&#10008;</span></td>
      </tr>
    )
  }

  render(){
    const { myFlats, myTenant } = this.state
    if(!localStorage.getItem('token')){
      return (
        <Redirect to="/login/" />
      )
    }
    return (
      <section>
        <main className="tenant-container">
          <CardComponent label={"Twoi najemcy"}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Mieszkanie</th>
                  <th>Imie</th>
                  <th>Nazwisko</th>
                  <th>Pesel</th>
                  <th>Adres email</th>
                  <th>Numer dowodu</th>
                  <th>Telefon</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {myTenant.map(tenant => this.generateMyTenant(tenant))}
              </tbody>
            </table>

          </CardComponent>
          <CardComponent label={"Dodaj najemce"}>
            <div className="add-tenant-container">
              <div className="single-section-add-tenant">
                <select
                onChange={this.handleChangeSelect}
                className="custom-select"
                id="inputGroupSelect01"
                value={this.state.propertyId}
                >
                  {myFlats.map((flat, index) => <option key={flat.id} value={flat.id}>{flat.city} {flat.street}</option>)}
                </select>
                <Input
                placeholder={'Imię'}
                onChange={this.handleChange}
                refs={this.nameInput}
                value={this.state.name}
                />
                <Input 
                placeholder={'Nazwisko'}
                onChange={this.handleChange}
                refs={this.lastNameInput}
                value={this.state.lastName}
                />
              </div>
              <div className="single-section-add-tenant">
                <Input 
                placeholder={'Pesel'}
                onChange={this.handleChange}
                refs={this.peselInput}
                value={this.state.pesel}
                />
                <Input 
                placeholder={'Numer dowodu'}
                onChange={this.handleChange}
                refs={this.idNumberInput}
                value={this.state.idNumber}
                />
                <Input 
                placeholder={'Adres email'}
                onChange={this.handleChange}
                refs={this.emailInput}
                value={this.state.email}
                />
                <Input 
                placeholder={'nr telefonu'}
                onChange={this.handleChange}
                refs={this.phoneNumberInput}
                value={this.state.phoneNumber}
                />
              </div>
              <Button type="accept" label={'Zapisz'} btnType={'submit'} onClick={this.onFormSubmit}/>
            </div>
          </CardComponent>
        </main>
      </section>
    )
  }
}

export default Tenant