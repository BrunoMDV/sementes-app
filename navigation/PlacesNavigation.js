import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import PhotoListScreen from "../screens/PhotoListScreen";
import MapScreen from "../screens/MapScreen";
import PhotoDetailScreen from "../screens/PhotoDetailScreenScreen";
import NewPhotoScreen from "../screens/NewPhotoScreen";
import Colors from "../constants/Colors";

const PlacesNavigator = createStackNavigator(
  {
    Photo: PhotoListScreen,
    PhotoDetail: PhotoDetailScreen,
    NewPhoto: NewPhotoScreen,
    Map: MapScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      headerTitle: "Nova Foto",
    },
  }
);

export default createAppContainer(PlacesNavigator);
