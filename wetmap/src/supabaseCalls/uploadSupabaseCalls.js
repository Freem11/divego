import { supabase } from '../supabase';

export const uploadphoto = async (file, fileName) => {
  // console.log("supa", file, oldFileName)
  // let extension =  oldFileName.split('.').pop();
  // const fileName = Date.now() + "." + extension

  const { data, error } = await supabase.storage
    .from('animalphotos')
    .upload(`public/${fileName}`, file);

  if (error) {
    console.log('couldn\'t upload,', error);
  }

  if (data) {
    console.log(`Upload of photo: ${fileName} was sucessful`);
    return data.path;
  }
};

export const removePhoto = async (values) => {
  let shortPath = values.fileName.split('/').pop();

  const { data, error } = await supabase.storage
    .from('animalphotos')
    .remove(`public/${shortPath}`);

  if (error) {
    console.log('couldn\'t upload,', error);
  }

  if (data) {
    console.log(`Deletion of photo: ${shortPath} was sucessful`);
  }
};
