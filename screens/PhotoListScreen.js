import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import PlaceItem from "../components/PlaceItem";
import * as photosActions from "../store/photos-actions";
const PhotoListScreen = (props) => {
  const photos = useSelector((state) => state.photos.photos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(photosActions.loadPhotos());
  }, [dispatch]);
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          //address={null}
          onSelect={() => {
            props.navigation.navigate("PhotoDetail", {
              photoTitle: itemData.item.title,
              photoId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};
PhotoListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Arroz App",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Adicionar foto"
          iconName={Platform.OS === "ios" ? "ios-add" : "md-add"}
          onPress={() => {
            navData.navigation.navigate("NewPhoto");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});
export default PhotoListScreen;
