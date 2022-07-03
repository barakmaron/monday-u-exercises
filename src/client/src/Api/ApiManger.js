import axios from 'axios';


const base_url = 'http://127.0.0.1:8000';
export async function GetResourceRequest(url) {
    return await axios.get(`${base_url}/${url}`).then((response) => {
        return response.data;
    }).catch((error) => {
        throw CreateError(error.response.status, error.response.data.error);
    });
  }
  
export async function AddNewResourceRequest(url, data) {
    return await axios.post(`${base_url}/${url}`, data).then((response) => {
        return response.data;
    }).catch((error) => {
        throw CreateError(error.response.status, error.response.data.error);
    });
}
  
export async function DeleteResourceRequest(url) {
    return await axios.delete(`${base_url}/${url}`).then((response) => {
        return response.data;
    }).catch((error) => {
        throw CreateError(error.response.status, error.response.data.error);
    });
}
  
  export async function PatchResourceRequest(url) {
    return await axios.patch(`${base_url}/${url}`).then((response) => {
        return response.data;
    }).catch((error) => {
        throw CreateError(error.response.status, error.response.data.error);
    });
  }
  
  export async function PutResourceRequest(url, data) {
    try {
      const response = await fetch(`${base_url}/${url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      // check if response is valid
      if (!response.ok) {
        throw new Error(`Cant patch ${url}`);
      }
      // parse response to json object
      const res_obj = await response.json();
      return res_obj;
    } catch (error) {
      throw error;
    }
  }

  function CreateError(code, message)
  {
    const error = new Error(message);
    error.statusCode = code;
    return error;
  }