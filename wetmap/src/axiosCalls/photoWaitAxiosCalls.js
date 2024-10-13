import axios from 'axios';

export const photoWaits = () => {
  return axios
    .post('/api/photoWait')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertPhotoWaits = (values) => {
  return axios
    .post('/api/photoWaitAdd', {
      File:   values.PicFile,
      Animal: values.Animal,
      Date:   values.PicDate,
      Lat:    values.Latitude,
      Lng:    values.Longitude,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const grabPhotoWaitById = (id) => {
  return axios
    .get(`/api/photoWait/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const deletePhotoWait = (id) => {
  return axios
    .delete(`api/photoWait/delete/${id}`, { id })
    .then((response) => {
    })
    .catch((err) => {
      return err;
    });
};
