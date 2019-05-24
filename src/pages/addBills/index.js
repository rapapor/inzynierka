import React, { Component } from 'react';
import Menu from './../../containers/menu'
import CardComponent from './../../components/cardComponent'
import Button from './../../components/button'
import DatePicker from "react-datepicker"
import * as moment from 'moment';
import api from './../../api'
import ContentWrapper from './../../components/contentWrapper'
import swal from '@sweetalert/with-react'
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
  initialMyBills = [{
    coldWater: {
      amount: "0",
      currency: "PLN",
      date: "",
      id: 0,
      rate: "14.36",
      unit: "m3",
      used: "0"
    },
    commonPart: {
      amount: "0",
      currency: "PLN",
      date: "",
      id: 0,
      rate: "12",
      unit: "",
      used: "0"
    },
    electricity: {
      amount: "0",
      currency: "PLN",
      date: "",
      id: 0,
      rate: "0.62",
      unit: "kWh",
      used: "0"
    },
    heating: {
      amount: "0",
      currency: "PLN",
      date: "",
      id: 0,
      rate: "80",
      unit: "GJ",
      used: "0"
    },
    hotWater: {
      amount: "0",
      currency: "PLN",
      date: "",
      id: 0,
      rate: "28.36",
      unit: "m3",
      used: "0"
    },
    repairFund: {
      amount:"0",
      currency: "PLN",
      date: "",
      id: 0,
      rate: "70",
      unit: " - ",
      used: "0"
    },
    trash: {
      amount: "0",
      currency: "PLN",
      date: "",
      id: 0,
      rate: "15",
      unit: "os.",
      used: "0"
    }
  }]
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
    myBills: this.initialMyBills
  }
  
  componentDidMount() {
    const { propertyID } = this.state
    this.loadProperty(propertyID)
  }

  loadProperty = (id) => {
    var token = localStorage.getItem('token')
    api.getFlatsList(token, id).then(res => {
      this.setState({myFlat: res})
    }).catch(error => {
      console.log(error)
    })
    api.getAllBills(id).then(res => {
      if (res.length > 1) {
        this.setState({myBills: res})
      }
    }).catch(error => {
      console.log(error)
    })

  }

  genInvoice = (billID) => {
    const {propertyID, myFlat} =this.state
    if(myFlat.propertyStatus === "RENTED") {
      api.createInvoice(propertyID, billID).then(res => {
        if(res && res.status === 200 ) {
          swal({
            title: "Brawo!!",
            text: "Wygenerowałeś fakturę, to twój kolejny przychód",
            icon: "success",
            button: "OK",
            content: (
              <div>
                <a rel="noopener noreferrer" target="_blank" href={res.data}>pobierz fakturę</a>
              </div>
            )
          })
        } else {
          swal({
            title: "Coś poszło nie tak",
            text: "Bardzo przepraszamy niestety nie udało się wygenerować faktury, spróbuj ponownie",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then( () => {
            this.setState(this.InitialState )
          })
        }
      })
    } else {
      swal({
        title: "Mieszkanie nie jest wynajęte",
        text: "Aby wystawić fakturę najpierw przypisz najemcę do mieszkania",
        icon: "info"
      })
    }
  }

  deleteBill = (billID) => {
    const { propertyID } =this.state
    api.deleteBill(propertyID, billID).then(res => {
      if( res && res.status === 200) {
        swal({
          title: "Bill został usunięty",
          text: "Aby wygenerować nowy rachunek wypełnij formularz",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then( () => {
          this.loadProperty(propertyID)
        })
      } else {
        swal({
          title: "Coś poszło nie tak",
          text: "Bardzo przepraszamy niestety nie udało się usunąć rachunku, spróbuj ponownie",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then( () => {
          this.setState(this.InitialState )
        })
      }
    })
  }

  generateMyBillsTable = (bill, index) => {
    return (
      <section key={index} className="col-lg-6 col-sm-12 media-table">
        <CardComponent label={`Rachunki i zużycia z dnia ${bill.coldWater.date}`}>
          <div className="genInvoice-button">
            <span className="genInvoice-button--action" onClick={() => this.genInvoice(bill.id)}>Wygeneruj fakturę</span>
            <span className="genInvoice-button--delete" onClick={() => this.deleteBill(bill.id)}>Usuń</span>
            </div>
          <table key={index} className="table table-sm table-striped text-center">
            <thead  className="text-primary">
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

  handleChange = (e) => {
    const {propertyID} = this.state
    const name = e.target.name
    let formData = Object.assign({}, this.state.formData);
        formData[e.target.name] = e.target.value;
        this.setState({formData})
        let val = e.target.value === '' ? '0' : e.target.value
        api.calculateBill(propertyID, val, name).then(res => {
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
        <td><input type='number' name={name} className="input-in-table" onChange={this.handleChange} value={this.state.formData[name]}/></td>
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
    const { startDate, formData, amountTab, propertyID, myFlat} = this.state
    let dateToSend = moment(startDate).format('YYYY/MM/DD');
    this.setState({ formData: this.initialStateForm})
    const dataToSend = {
      coldWater: {
        amount: amountTab.coldWater.amount,
        currency: "PLN",
        date: dateToSend,
        rate: amountTab.coldWater.rate,
        status: formData.coldWater,
        unit: "m3",
        used: amountTab.coldWater.used
      },
      commonPart: {
        amount: "1",
        currency: "PLN",
        date: dateToSend,
        rate: "2",
        status: "123",
        unit: "-",
        used: "0"
      },
      electricity: {
        amount: amountTab.electricity.amount,
        currency: "PLN",
        date: dateToSend,
        rate: amountTab.electricity.rate,
        status: formData.electricity,
        unit: "kWh",
        used: amountTab.electricity.used
      },
      heating: {
        amount: amountTab.heating.amount,
        currency: "PLN",
        date: dateToSend,
        rate: amountTab.heating.rate,
        status: formData.heating,
        unit: "GJ",
        used: amountTab.heating.used
      },
      hotWater: {
        amount: amountTab.hotWater.amount,
        currency: "PLN",
        date: dateToSend,
        rate: amountTab.hotWater.rate,
        status: formData.hotWater,
        unit: "m3",
        used: amountTab.hotWater.used
      },
      repairFund: {
        amount: amountTab.repairFund.amount,
        currency: "PLN",
        date: dateToSend,
        rate: amountTab.repairFund.rate,
        status: formData.repairFund,
        unit: "-",
        used: amountTab.repairFund.used
      },
      trash: {
        amount: amountTab.trash.amount,
        currency: "PLN",
        date: dateToSend,
        rate: amountTab.trash.rate,
        status: formData.trash,
        unit: "os.",
        used: amountTab.repairFund.used
      }
    }

    api.createBill(propertyID, dataToSend).then(res => {
      if(res.status === 200) {
        if(myFlat.propertyStatus === "RENTED") {
          swal({
            title: "Czy chcesz wystawić fakturę",
            text: "Wystaw fakturę na podstawie tego rachunku!",
            icon: "success",
            buttons: {
              cancel: "Anuluj",
              catch: {
                text: "Wygeneruj fakturę",
                value: "accept",
              },
            },
          }).then((value) => {
            switch (value) {
              case "accept":
              this.genInvoice(res.data.id)
              break;
              default:
                swal("Zawsze mozesz wygenerować fakturę korzystając z przycisku 'Generuj fakturę' na karcie rachunku!");
            }          
          });
        } else {
          swal({
            title: "Mieszkanie nie jest wynajęte",
            text: "Aby wystawić fakturę najpierw przypisz najemcę do mieszkania",
            icon: "info"
          })
        }
        
      } else {
        swal({
          title: "Coś poszło nie tak",
          text: "Bardzo przepraszamy niestety nie udało się dodać rachunku, spróbuj ponownie",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then( () => {
          this.setState(this.InitialState )
        })
      }
      this.setState({myBills: this.initialMyBills, amountTab: this.initialStateForm})
      this.loadProperty(propertyID)
    }).catch(error => {
      console.log(error)
    })
  }

  render(){
    const { myFlat, myBills } = this.state
    return (
      <React.Fragment>
      <Menu />
      <ContentWrapper>
      <section className="col-sm-12">
        <CardComponent label={`Mieszkanie: ${myFlat.city} ${myFlat.street}`}>
          <div className="head-property-detail col-xs-12 col-sm-12">
            {myFlat.imagesUrls && myFlat.imagesUrls.map((image, index) => this.genImageSingleProperty(image, index))}
          </div>
          <div className="d-flex mt-5">
            <div className="col-sm-3">
              <p><label>Kaucja: </label> <span>{myFlat.bail}</span></p>
              <p><label>Czynsz: </label> <span>{myFlat.price}</span></p>
              <p><label>Metraż</label> <span>{myFlat.surface}</span></p>
              <p><label></label><span></span></p>
              <p><label></label><span></span></p>
            </div>
            <div className="col-sm-9">
              <p><label>Opis:</label> <span>{myFlat.description}</span></p>
              <p><label>Rodzaj budynku:</label> <span>{myFlat.buildingType}</span></p>
              <p><label>Liczba pokoi:</label> <span>{myFlat.roomsNumber}</span></p>
              <p><label>Ilość okien:</label> <span>{myFlat.windows}</span></p>
              <p><label>Materiał:</label> <span>{myFlat.buildingMaterial}</span></p>
              <p><label></label><span></span></p>
            </div>
            
          </div>
          <div className="additional-info-list">
            {myFlat.additionalInformation && myFlat.additionalInformation.map((item, index) => <div className="add-info-item" key={index}>{item}</div>)}
          </div>
        </CardComponent>
      </section>
      <section className="col-sm-12">
        <CardComponent label={`Wystaw rachunek`}>
        <div className="dataPicker-container">
          <div className="dataPicker-item">
            <DatePicker selected={this.state.startDate} onChange={this.handleChangeDate} dateFormat='YYYY/MM/dd' />
          </div>
        </div>
        <table className="table table-striped text-center">
            <thead className="text-primary">
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
      <section className="d-lg-flex flex-wrap">
        {myBills.map((bill, index) => this.generateMyBillsTable(bill, index))}
      </section>
      </ContentWrapper>
      </ React.Fragment>
      
    )
  }
}

export default AddBills