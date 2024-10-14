import axios from 'axios';

export const adminCheck = (pass) => {
  return axios
    .post('/api/session', { pass: pass })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
