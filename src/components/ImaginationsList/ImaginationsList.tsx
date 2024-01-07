import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import Imagination from "./Imagination/Imagination";

const imaginations = [
  {
    author: "Tyomll",
    imageURL:
      "https://media.cnn.com/api/v1/images/stellar/prod/190417163838-21-earth-beautiful-places-restricted.jpg?q=w_5000,h_2813,x_0,y_0,c_fill/h_618",
    musicName: "Old town road",
    artistName: "Lil nas X",
  },
  {
    author: "Valodll",
    imageURL:
      "https://media.cnn.com/api/v1/images/stellar/prod/140630124917-12-canada-most-beautiful-places.jpg?q=w_2000,h_1363,x_0,y_0,c_fill/h_778",
    musicName: "Old town road",
    artistName: "Lil nas X",
  },
];

const ImaginationsList = () => {
  return (
    <View className="flex flex-col justify-center w-[90vw] ">
      <ScrollView>
        {imaginations.map((imagination, i) => (
          <Imagination
            key={i}
            author={imagination.author}
            imageURL={imagination.imageURL}
            musicName={imagination.musicName}
            artistName={imagination.artistName}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ImaginationsList;
