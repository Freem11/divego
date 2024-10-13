import axios from 'axios';

export const getAnimalNames = () => {
  return axios
    .post('/api/photoLabels')
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertphoto = (values, monthId) => {
  return axios
    .post('/api/photoAdd', {
      File:   values.photofile,
      Animal: values.label,
      Date:   values.datetaken,
      Lat:    values.latitude,
      Lng:    values.longitude,
      month:  monthId,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAnimalNamesThatFit = (value) => {
  return axios
    .post('/api/photoLabelsThatFit', { content: value })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getPhotosforAnchor = (value) => {
  return axios
    .post(`/api/anchorPhotos`, { content: value })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
