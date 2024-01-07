import { aws3 } from "../aws";
import {
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
  } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export const addDeletedAccountInfo = async (values) => {

    console.log("passing", values)
    const { data, error } = await supabase
    .from("deletedUsers")
    .insert([
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        uuid: values.UserID
      },
    ]);
  
    if (error) {
      console.log("couldn't do it,", error);
    }
  
    if (data) {
      console.log(data);
    }
  };
