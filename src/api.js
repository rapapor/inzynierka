import axios from 'axios';
import { getCurrentPositionType } from './utils/helpers'
class API {
  constructor(apiURL) {
    this.baseURL = apiURL
    this.state = {
      token: '',
    }
  }

  login(user){
    return axios.post(`${this.baseURL}/auth/`,
    user)
    .then(res => {
      return res.data
    }).catch(error => {
      console.log(error)
    })
  }

  resolveAlert(propID, alertID){
    var token = localStorage.getItem('token')
    return axios.put(`${this.baseURL}/properties/${propID}/alerts/${alertID}`,{visible: false}, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        return res
      }).catch(error => {
        console.log(error)
      })
  }

  getTenantList(token) {
    return axios.get(`${this.baseURL}/tenats`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      }).catch(error => {
        console.log(error)
      })
  }

  deleteTenant(id, token) {
    return axios.delete(`${this.baseURL}/tenats/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        return res.data
      }).catch(error => {
        console.log(error)
      })
  }

  createTenant(tenant, token){
    return axios.post(`${this.baseURL}/tenats`,tenant, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        return res
      }).catch(error => {
        console.log(error)
      })
    
  }

  createBill(propertyId, dataToSend ){
    var token = localStorage.getItem('token')
    return axios.post(`${this.baseURL}/properties/${propertyId}/bills`,dataToSend, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        return res
      }).catch(error => {
        console.log(error)
      })
  }
  deleteBill(propertyId, billId) {
    var token = localStorage.getItem('token')
    return axios.delete(`${this.baseURL}/properties/${propertyId}/bills/${billId}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        return res
      }).catch(error => {
        console.log(error)
      })
  }

  calculateBill(id, status, billType) {
    var token = localStorage.getItem('token')
    const type = getCurrentPositionType(billType)
    return axios.get(`${this.baseURL}/properties/${id}/bills/calculate?billType=${type.type}&rate=${type.rate}&status=${status}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      }).catch(error => {
        console.log(error)
      })
  }

  createInvoice(propertyID, billID){
    var token = localStorage.getItem('token')
    return axios.get(`${this.baseURL}/properties/${propertyID}/bills/${billID}/invoice`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        return res
      }).catch(error => {
        console.log(error)
      })
  }
  

  getFlatsList(token,id = ''){
    return axios.get(`${this.baseURL}/properties/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        return res.data
      }).catch(error => {
        console.log(error)
      })
  }

  createProperty(property, token, items, images){
    let my_property = {
      availableFrom: "2019-04-14T12:37:37.141Z",
      bail: property.bail,
      buildingMaterial: property.materialType,
      buildingType: property.buildingType,
      city: property.city,
      description: property.description,
      floor: property.floor,
      floorsNumber: property.numberFloors,
      heating: property.heating,
      images: images,
      additionalInformation: items,
      postCode: property.postCode,
      price: property.price,
      propertyStatus: "FOR_RENT",
      roomsNumber: property.rooms,
      street: property.street,
      surface: property.surface,
      title: property.title,
      windows: property.windowsType
    }
    return axios.post(`${this.baseURL}/properties`,my_property, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer ' + token
    }})
    .then(res => {
      return res
    }).catch(error => {
      console.log(error)
    })
  }

  deleteProperty(id, token) {
    return axios.delete(`${this.baseURL}/properties/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        return res.data
      }).catch(error => {
        console.log(error)
      })
  }

  updateProperty(id, token, status) {
    let my_property = {
      propertyStatus: status
    }
    return axios.put(`${this.baseURL}/properties/${id}`,my_property, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        return res.data
      }).catch(error => {
        console.log(error)
      })
  }
}


function createAPI() {
  const apiURL = 'https://ffr-api.herokuapp.com'
  return new API(apiURL);
}
const api = createAPI();
export default api;