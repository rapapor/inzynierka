import axios from 'axios';

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

  createProperty(property, token){
    let equipment = []
    Object.keys(property.additionalInformation).map(key => 
      equipment.push({ [key]: property.additionalInformation[key] })
    )
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
      // "images": [
      //   "string"
      // ],
      // "imagesUrls": [
      //   "string"
      // ],
      // "media": [
      //   "string"
      // ],
      // "security": [
      //   "string"
      // ],
      // "equipment": [
      //   "string"
      // ],
      // "additionalInformation": [
      //   "string"
      // ],
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
}


function createAPI() {
  const apiURL = 'https://ffr-api.herokuapp.com'
  return new API(apiURL);
}
const api = createAPI();
export default api;