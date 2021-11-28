import React from "react";
import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
//import * as tf from '@tensorflow/tfjs';

import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";

const PhotoDetailScreen = (props) => {
  const photoId = props.navigation.getParam("photoId");
  const selectedPhoto = useSelector((state) =>
    state.photos.photos.find((photo) => photo.id === photoId)
  );

  const selectedLocation = { lat: selectedPhoto.lat, lng: selectedPhoto.lng };

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: selectedLocation,
    });
  };
  // const loadModel = async ()=> {
  //   model = await tf.loadLayersModel('Models_\MNIST\model.json');
  //   console.log ("model loaded");
  // }


  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: selectedPhoto.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <MapPreview
          style={styles.mapPreview}
          location={selectedLocation}
          onPress={showMapHandler}
        />
      </View>
      {/* <Button
          title="Carregar Modelo"
          color={Colors.primary}
          onPress={loadModel}
        /> */}
    </ScrollView>
  );
};
PhotoDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Detalhes da imagem",
    //headerTitle: navData.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },

  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
export default PhotoDetailScreen;
