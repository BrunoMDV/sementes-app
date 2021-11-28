import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import PlacesNavigation from "./navigation/PlacesNavigation";
import photosReducer from "./store/photos-reducer";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("inicialized database success");
  })
  .catch((err) => {
    console.log("Initializing db failed");
    console.log(err);
  });

const rootReducer = combineReducers({
  photos: photosReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigation />
    </Provider>
  );
}
