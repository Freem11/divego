import axios from 'axios';

export const diveSiteWaits = () => {
  return axios
    .post('api/diveSiteWait')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertDiveSiteWaits = (values) => {
  return axios
    .post('api/diveSiteWaitAdd', {
      Name: values.Site,
      Lat:  values.Latitude,
      Lng:  values.Longitude,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const grabDiveSiteWaitById = (id) => {
  return axios
    .get(`api/diveSiteWait/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deleteDiveSiteWait = (id) => {
  return axios
    .delete(`/api/diveSiteWait/delete/${id}`, { id })
    .then((response) => {
    })
    .catch((err) => {
      return err;
    });
};
