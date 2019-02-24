import axios from 'axios';

class API {
  constructor(sessionId, apiURL) {
    this.baseURL = apiURL
  }

  login(user){
    console.log(user)
    // return axios.post(`${this.baseURL}/login/`,
    // user)
    //   .then(res => {
    //     // onSuccess(res.data, user)
    //   }).catch(error => {
    //   })
  }
}


function createAPI() {
  const apiURL = 'url do api'
  return new API(apiURL);
}
const api = createAPI();
export default api;