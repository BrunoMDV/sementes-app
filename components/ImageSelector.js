import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker"; //mudar isso para a biblioteca camera
//import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
//import { CAMERA_ROLL, MEDIA_LIBRARY } from "expo-permissions";

const imgPicker = (props) => {
  const [PickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Camera.requestPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    }); // mudar isso para a biblioteca camera

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };
  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!PickedImage ? (
          <Text>Nenhuma imagem foi adicionada ainda</Text>
        ) : (
          <Image style={styles.image} source={{ uri: PickedImage }}></Image>
        )}
      </View>
      <Button
        title="Adicionar imagem"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default imgPicker;
