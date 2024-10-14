import axios from 'axios';

export const heatPoints = (GPSBubble, slider, animal) => {
  return axios
    .post('/api/heatPoints', { GPSBubble: GPSBubble, SliderValue: slider, AnimalValue: animal })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getLoneHeatPoint = (values) => {
  return axios
    .post('/api/heatPoint', {
      Lat:    values.lat,
      Lng:    values.lng,
      Animal: values.animal,
      Month:  values.month,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const insertHeatPoint = (values) => {
  return axios
    .post('/api/HeatPointAdd', {
      Lat:    values.lat,
      Lng:    values.lng,
      Animal: values.animal,
      Month:  values.month,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateHeatPoint = (values) => {
  return axios
    .post('/api/HeatPointUpdate', {
      Id:     values.id,
      Weight: values.weight,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
