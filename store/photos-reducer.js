import { ADD_PHOTO, SET_PHOTOS } from "./photos-actions";
import Photo from "../models/photo";
import PlaceItem from "../components/PlaceItem";

const inicialState = {
  photos: [],
};

export default (state = inicialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        photos: action.photos.map(
          (pl) =>
            new Photo(pl.id.toString(), pl.title, pl.imageUri, pl.lat, pl.lng)
        ),
      };
    case ADD_PHOTO:
      const newPhoto = new Photo(
        action.photoData.id.toString(),
        action.photoData.title,
        action.photoData.image,
        action.photoData.coords.lat,
        action.photoData.coords.lng
      );

      return { photos: state.photos.concat(newPhoto) };
    default:
      return state;
  }
};
