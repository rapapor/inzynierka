import React, { Component } from 'react';
import Menu from './../../containers/menu'
import CardComponent from './../../components/cardComponent'
import Button from './../../components/button'
import DatePicker from "react-datepicker"
import * as moment from 'moment';
import api from './../../api'
import './style.sass'

class AddBills extends Component {
  initialStateForm = {
    coldWater: '',
    electricity: '',
    heating: '',
    hotWater: '',
    trash: '',
    repairFund: ''
  }
  state = {
    startDate: new Date(),
    propertyID: this.props.location.state.id,
    formData: this.initialStateForm,
    myFlat: {},
    amountTab: {
      coldWater: {},
      electricity: {},
      heating: {},
      hotWater: {},
      trash: {},
      repairFund: {}
    },
    myBills: [{
      coldWater: {
        amount: "0",
        currency: "PLN",
        date: "",
        id: 0,
        rate: "0",
        unit: "m3",
        used: "0"
      },
      commonPart: {
        amount: "0",
        currency: "PLN",
        date: "",
        id: 0,
        rate: "0",
        unit: "",
        used: "0"
      },
      electricity: {
        amount: "0",
        currency: "PLN",
        date: "",
        id: 0,
        rate: "0",
        unit: "kWh",
        used: "0"
      },
      heating: {
        amount: "0",
        currency: "PLN",
        date: "",
        id: 0,
        rate: "0",
        unit: "GJ",
        used: "0"
      },
      hotWater: {
        amount: "0",
        currency: "PLN",
        date: "",
        id: 0,
        rate: "0",
        unit: "m3",
        used: "0"
      },
      repairFund: {
        amount:"0",
        currency: "PLN",
        date: "",
        id: 0,
        rate: "0",
        unit: " - ",
        used: "0"
      },
      trash: {
        amount: "0",
        currency: "PLN",
        date: "",
        id: 0,
        rate: "0",
        unit: "os.",
        used: "0"
      }
    }]
  }
  
  componentDidMount() {
    const { propertyID } = this.state
    this.loadProperty(propertyID)
  }

  loadProperty = (id) => {
    var token = localStorage.getItem('token')
    api.getFlatsList(token, id).then(res => {
      this.setState({myFlat: res, myBills: res.bills})
    }).catch(error => {
      console.log(error)
    })
  }

  generateMyBillsTable = (bill, index) => {
    return (
      <section key={index} className="col-lg-6 col-sm-12 media-table">
        <CardComponent label={`Rachunki i zużycia z dnia ${bill.coldWater.date}`}>
          <table key={index} className="table table-sm table-striped text-center">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Stan licznika</th>
                <th>Symb. j.m.</th>
                <th>Ilość</th>
                <th>Cena jednostkowa</th>
                <th>Kwota</th>
              </tr>
            </thead>
            <tbody>
              {this.genTrTable('Zimna woda', bill.coldWater)}
              {this.genTrTable('Energia elektryczna', bill.electricity)}
              {this.genTrTable('Ogrzewanie CO2', bill.heating)}
              {this.genTrTable('Ciepła woda', bill.hotWater)}
              {this.genTrTable('Śmieci', bill.trash)}
              {this.genTrTable('Fundusz remontowy', bill.repairFund)}
            </tbody>
          </table>
        </CardComponent>
      </section>
    )
  }

  genTrTable = (label, obj) => {
    let status = obj.status ? obj.status : "-"
    return (
      <tr>
        <th>{label}</th>
        <td>{status}</td>
        <td>{obj.unit}</td>
        <td>{obj.used}</td>
        <td>{obj.rate} {obj.currency}</td>
        <td>{obj.amount} {obj.currency}</td>
      </tr>
    )
  }

  handeChange = (e) => {
    const {propertyID} = this.state
    const name = e.target.name
    let formData = Object.assign({}, this.state.formData);
        formData[e.target.name] = e.target.value;
        this.setState({formData})
        api.calculateBill(propertyID, e.target.value, name).then(res => {
          let amountTab = Object.assign({}, this.state.amountTab)
          amountTab[name] = res
          this.setState({ amountTab })
        }).catch(error => {
          console.log(error)
        })
  }

  handleChangeDate = (e) => {
    this.setState({startDate: e})
  }

  genTrTableWithInput = (label, obj, name) => {
    const {amountTab} = this.state
    let used = amountTab[name] ? amountTab[name].used : 0
    let amount = amountTab[name] ? amountTab[name].amount : 0
    return (
      <tr>
        <th>{label}</th>
        <td><input type='number' name={name} className="input-in-table" onChange={this.handeChange} value={this.state.formData[name]}/></td>
        <td>{obj.unit}</td>
        <td>{used}</td>
        <td>{obj.rate} {obj.currency}</td>
        <td>{amount} {obj.currency}</td>
      </tr>
    )
  }

  genImageSingleProperty = (image, index) => {
    return (
      <div key={index} className="col-sm-3 col-12 thumbnail-container-detail">
        <img className="single-thumb" width="100%" src={image} alt="thumbnail"/>
      </div>
    )
  }

  onFormSubmit = () => {
    const { startDate, formData} = this.state
    let dateToSend = moment(startDate).format('YYYY/MM/DD');
    this.setState({ formData: this.initialStateForm})
    console.log(formData, dateToSend)
  }

  render(){
    const { myFlat, myBills } = this.state
    return (
      <React.Fragment>
      <Menu />
      <section className="col-sm-12">
        <CardComponent label={`Mieszkanie: ${myFlat.city} ${myFlat.street}`}>
          <div className="head-property-detail col-xs-12 col-sm-12">
            {myFlat.imagesUrls && myFlat.imagesUrls.map((image, index) => this.genImageSingleProperty(image, index))}
          </div>
          <div className="d-flex mt-5">
          <div className="col-sm-3">
            <p>cena</p>
          </div>
          <div className="col-sm-9">
            <p>opis</p>
          </div>
          </div>
        </CardComponent>
      </section>
      <section className="col-sm-12">
        <CardComponent label={`Wystaw rachunek`}>
        <DatePicker selected={this.state.startDate} onChange={this.handleChangeDate} dateFormat='YYYY/MM/dd' />
        <table className="table table-striped text-center">
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Stan licznika</th>
                <th>Symb. j.m.</th>
                <th>Ilość</th>
                <th>Cena jedn.</th>
                <th>Kwota</th>
              </tr>
            </thead>
            <tbody>
              {this.genTrTableWithInput('Zimna woda', myBills[0].coldWater, 'coldWater')}
              {this.genTrTableWithInput('Energia elektryczna', myBills[0].electricity, 'electricity')}
              {this.genTrTableWithInput('Ogrzewanie CO2', myBills[0].heating, 'heating')}
              {this.genTrTableWithInput('Ciepła woda', myBills[0].hotWater, 'hotWater')}
              {this.genTrTableWithInput('Śmieci', myBills[0].trash, 'trash')}
              {this.genTrTableWithInput('Fundusz remontowy', myBills[0].repairFund, 'repairFund')}
            </tbody>
          </table>
          <div className="confirm-btn-container">
            <Button type="accept" label={'Zapisz'} btnType={'submit'} onClick={this.onFormSubmit}/>
          </div>
        </CardComponent>
      </section>
      <section className="d-lg-flex">
        {myBills.map((bill, index) => this.generateMyBillsTable(bill, index))}
      </section>
      </ React.Fragment>
      
    )
  }
}

export default AddBills