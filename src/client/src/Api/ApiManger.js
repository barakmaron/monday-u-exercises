import axios from 'axios';

export default class ApiService {
  static base_url = 'http://127.0.0.1:8000';
  static async GetResourceRequest(url) {
    return await axios.get(`${this.base_url}/${url}`).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.response.status, error.response.data.error);
    });
  }

  static async AddNewResourceRequest(url, data) {
    return await axios.post(`${this.base_url}/${url}`, data).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.response.status, error.response.data.error);
    });
  }

  static async DeleteResourceRequest(url) {
    return await axios.delete(`${this.base_url}/${url}`).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.response.status, error.response.data.error);
    });
  }

  static async PatchResourceRequest(url) {
    return await axios.patch(`${this.base_url}/${url}`).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.response.status, error.response.data.error);
    });
  }

  static async PutResourceRequest(url, data) {
    return await axios.put(`${this.base_url}/${url}`, data).then((response) => {
      return response.data;
    }).catch((error) => {
      throw this.CreateError(error.response.status, error.response.data.error);
    });
  }

  static CreateError(code, message) {
    const error = new Error(message);
    error.statusCode = code;
    return error;
  }
}
