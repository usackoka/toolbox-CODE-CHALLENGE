import axios from 'axios';
import { REACT_API_BASE_URL } from '../variables';

export const getAnalisys = async (word) => { 
    var config = {
      method: 'get',
      url: `${REACT_API_BASE_URL}/iecho?text=${word}`,
      headers: {}
    };

    let response = { error: true }

    try {
        const res = await axios(config);
        response = { ...res.data, error: false };
    } catch (error) { 
        response = { ...response, msg: error }
    }

    return response;
}