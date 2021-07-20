

import api from './axios-config';


export class RequestsApi {
  getToken = async (userName: string) => {
    try {
      const response = await api.get(`/getToken?userName=${userName}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

}

export default new RequestsApi();
