import axios from 'axios';
import { tenants } from './utils/tempData'
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

  getTenantList(token) {
    return axios.get(`${this.baseURL}/properties`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        // return res.data
        return tenants
      }).catch(error => {
        console.log(error)
        return tenants
      })
  }

  deleteTenant(id, token) {
    return axios.delete(`${this.baseURL}/tenant/${id}`, {
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
    return axios.post(`${this.baseURL}/tenant`,tenant, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }})
      .then(res => {
        // return res.data
        console.log(tenant)
      }).catch(error => {
        console.log(error)
        console.log(tenant)
      })
    
  }

  getFlatsList(token){
    return axios.get(`${this.baseURL}/properties`, {
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
    console.log(my_property)
    return axios.post(`${this.baseURL}/properties`,my_property, {
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