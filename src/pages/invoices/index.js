import React, { Component } from 'react';
import CardComponent from './../../components/cardComponent'
import changeArrow from './../../assets/images/arrowChange.png'
import swal from '@sweetalert/with-react'
import api from './../../api'
import './style.sass'

class Invoices extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myInvoices: [
        {
          property_adress: '',
          date: '',
          invoiceUrl: '',
          invoiceType: '',
          id: 1,
          flat_id: ''
        },
      ],
    }
  }

  componentDidMount() {
    this.loadFlats()
  }

  deleteInvoice = (id) => {
    console.log(id)
  }

  loadFlats = () => {
    var token = localStorage.getItem('token')
    api.getFlatsList(token).then(res => {
      this.setState({
        myFlats: res,
        myInvoices: res.map(
          flat => flat.invoices.map(
            a => { return { ...a, flat_id: flat.id, property_adress: `${flat.city} ${flat.street}` } }
          )
        ).flat()
      })
    }).catch(error => {
      console.log(error)
    })
  }


  changeStatusInvoice = (id, flat_id, statusInvoice) => {
    const myInvoice = {
      invoiceType: statusInvoice === 'PAID' ? 'NOT_PAID' : 'PAID'
    }
    api.updateInvoices(flat_id, id, myInvoice).then(res => {
      if (res && res.status === 200) {
        swal({
          title: "Zmieniłeś status Faktury",
          icon: "success",
          button: "OK",
        }).then(() => {
          this.loadFlats()
        })
      }
    })
  }

  generateInvoiceList = (invoice, index) => {
    return (
      <tr key={invoice.id}>
        <td>{invoice.property_adress}</td>
        <td>{invoice.date}</td>
        <td><a href={invoice.invoiceUrl} download rel="noopener noreferrer" target="_blank">Pobierz </a></td>
        <td className={`status-invoice ${invoice.invoiceType}`}>{invoice.invoiceType === "PAID" ? 'opłacona' : 'nieopłacona'}</td>
        <td>
          <span
            onClick={() => this.changeStatusInvoice(invoice.id, invoice.flat_id, invoice.invoiceType)}
            className={`change-status-btn`}>
            <img src={changeArrow} alt={`Zmień status na ${invoice.invoiceType === "NOT_PAID" ? 'opłacona' : 'nieopłacona'}`} />

          </span>
        </td>
      </tr>
    )
  }

  render() {
    const { myInvoices } = this.state
    return (

      <CardComponent label={"Wystawione faktury"}>
        <table className="table table-striped">
          <thead className="text-primary">
            <tr>
              <th>Mieszkanie</th>
              <th>Data wystawienia</th>
              <th>Link do faktury</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myInvoices.map((invoice, index) => this.generateInvoiceList(invoice, index))}
          </tbody>
        </table>
      </CardComponent>
    )
  }
}

export default Invoices