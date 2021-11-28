import * as FileSystem from "expo-file-system";

export const ADD_PHOTO = "ADD_PHOTO";
export const SET_PHOTOS = "SET_PHOTOS";
import { insertPhoto, fetchPhotos } from "../helpers/db";

export const addPhoto = (title, image, location) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop(); // way to get filename from path
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await insertPhoto(
        title,
        newPath,
        location.lat,
        location.lng
      );

      dispatch({
        type: ADD_PHOTO,
        photoData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          coords: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
export const loadPhotos = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPhotos();

      dispatch({ type: SET_PHOTOS, photos: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
