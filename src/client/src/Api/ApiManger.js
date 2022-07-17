import axios from 'axios';

export default class ApiService {
  static BaseUrl(){    
    return process.env.REACT_APP_SERVER_BASE_URL;
  }
  
  static async GetResourceRequest(url) {    
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return await axios.get(`${this.BaseUrl()}/${url}`).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.code, error.message);
    });
  }

  static async AddNewResourceRequest(url, data) {
    return await axios.post(`${this.BaseUrl()}/${url}`, data).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.code, error.message);
    });
  }

  static async DeleteResourceRequest(url) {
    return await axios.delete(`${this.BaseUrl()}/${url}`).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.code, error.message);
    });
  }

  static async PatchResourceRequest(url) {
    return await axios.patch(`${this.BaseUrl()}/${url}`).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.code, error.message);
    });
  }

  static async PutResourceRequest(url, data) {
    return await axios.put(`${this.BaseUrl()}/${url}`, data).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.code, error.message);
    });
  }

  static CreateError(code, message) {
    const error = new Error(message);
    error.statusCode = code;
    return error;
  }
}
