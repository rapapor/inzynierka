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
    return axios.get(`${this.baseURL}/flats`, {
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
}


function createAPI() {
  const apiURL = 'https://ffr-api.herokuapp.com'
  return new API(apiURL);
}
const api = createAPI();
export default api;