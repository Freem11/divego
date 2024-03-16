import { supabase } from "../supabase";

export const diveSites = async (GPSBubble) => {

  let minLatx, maxLatx, minLngx, maxLngx;

  if (GPSBubble.minLat) {
    minLatx = GPSBubble.minLat;
    maxLatx = GPSBubble.maxLat;
    minLngx = GPSBubble.minLng;
    maxLngx = GPSBubble.maxLng;
  } else {
    minLatx = GPSBubble.southWest.latitude;
    maxLatx = GPSBubble.northEast.latitude;
    minLngx = GPSBubble.southWest.longitude;
    maxLngx = GPSBubble.northEast.longitude;
  }

  const { data, error } = await supabase
  .from("diveSites")
  .select()
  .gte('lat', minLatx)
  .gte('lng', minLngx)
  .lte('lat', maxLatx)
  .lte('lng', maxLngx)

if (error) {
  console.log("couldn't do it,", error)
  return([])
}

if (data) {
  return data
}
};

export const getDiveSitesWithUser = async (values) => {
  const { data, error } = await supabase.rpc("get_divesites_with_username", {
    max_lat: values.maxLat,
    min_lat: values.minLat,
    max_lng: values.maxLng,
    min_lng: values.minLng,
    userid: values.myDiveSites,
  });

  if (error) {
    console.log("couldn't do it 27,", error);
    return [];
  }

  if (data) {
    // console.log(data)
    return data;
  }
};

export const getSiteNamesThatFit = async (GPSBubble, value) => {

  if(value === "") {
    return [];
  }

  let minLatx, maxLatx, minLngx, maxLngx;

  if (GPSBubble.minLat) {
    minLatx = GPSBubble.minLat;
    maxLatx = GPSBubble.maxLat;
    minLngx = GPSBubble.minLng;
    maxLngx = GPSBubble.maxLng;
  } else {
    minLatx = GPSBubble.southWest.latitude;
    maxLatx = GPSBubble.northEast.latitude;
    minLngx = GPSBubble.southWest.longitude;
    maxLngx = GPSBubble.northEast.longitude;
  }

  const { data, error } = await supabase
    .from("diveSites")
    .select()
    .gte('lat', minLatx)
    .gte('lng', minLngx)
    .lte('lat', maxLatx)
    .lte('lng', maxLngx)
    .ilike("name", "%" + value + "%");

  if (error) {
    console.log("couldn't do it,", error);
    return [];
  }

  if (data) {
    return data;
  }
};


export const insertDiveSite = async (values) => {

  const { data, error } = await supabase
  .from("diveSites")
  .insert([
    {
      name: values.name,
      lat: values.lat,
      lng: values.lng,
      UserID: values.UserID,
      userName: values.userName
    },
  ]);

if (error) {
  console.log("couldn't do it,", error);
}

if (data) {
  console.log(data);
}
};

export const getDiveSiteByName = async (value) => {

  const { data, error } = await supabase
  .from("diveSites")
  .select()
  .eq("name", value)

if (error) {
  console.log("couldn't do it 7,", error);
  return [];
}

if (data) {
  return data;
}
};