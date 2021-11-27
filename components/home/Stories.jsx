import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Users = [
  {
    id: 1,
    name: "Tushar",
    image:
      "https://yt3.ggpht.com/yti/APfAmoGOEHsCooA5rr4J4tJF5xGZVIGwlPTYLaU6agnWEg=s88-c-k-c0x00ffffff-no-rj-mo",
  },
];
const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Users.map((story, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text style={{ color: "white", marginLeft: 6 }}>
              {story.name.length > 11
                ? story.name.slice(0, 10).toLocaleLowerCase() + "..."
                : story.name.toLocaleLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
});
