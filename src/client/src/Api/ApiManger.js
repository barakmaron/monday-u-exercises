import axios from 'axios';

export default class ApiService {
  static base_url = 'http://127.0.0.1:8000';
  static async GetResourceRequest(url) {
    return await axios.get(`${this.base_url}/${url}`).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.code, error.message);
    });
  }

  static async AddNewResourceRequest(url, data) {
    return await axios.post(`${this.base_url}/${url}`, data).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.code, error.message);
    });
  }

  static async DeleteResourceRequest(url) {
    return await axios.delete(`${this.base_url}/${url}`).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.code, error.message);
    });
  }

  static async PatchResourceRequest(url) {
    return await axios.patch(`${this.base_url}/${url}`).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.code, error.message);
    });
  }

  static async PutResourceRequest(url, data) {
    return await axios.put(`${this.base_url}/${url}`, data).then((response) => {
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
