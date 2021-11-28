import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as photosActions from "../store/photos-actions";
import ImagePicker from "../components/ImageSelector";
import LocationPicker from "../components/LocationPicker";
const NewPhotoScreen = (props) => {
  const [titleValue, setTitleValue] = useState("Adicione um título");
  const [selectedimage, setSelectedImage] = useState();
  const [selectedLocation, setselectedLocation] = useState();
  const dispatch = useDispatch();
  const titleChangeHandler = (text) => {
    //add validation
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };
  const onLocationPickedHandler = useCallback((location) => {
    setselectedLocation(location);
  }, []);
  const savePhotoHandler = () => {
    dispatch(
      photosActions.addPhoto(titleValue, selectedimage, selectedLocation)
    );
    props.navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={onLocationPickedHandler}
        />

        <Button
          title="Salvar Foto"
          color={Colors.primary}
          onPress={savePhotoHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  TextInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
export default NewPhotoScreen;
