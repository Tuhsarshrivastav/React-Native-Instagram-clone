import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import BottomTabs, { bottomTabIcons } from "../components/home/BottomTabs";
import Header from "../components/home/Header";
import Post from "../components/home/Post";
import Stories from "../components/home/Stories";
import { POSTS } from "../data/posts";
import { db, app } from "../firebaseConfig";
import {
  collection,
  getDocs,
  collectionGroup,
  onSnapshot,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

const firebase = app;
const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() =>
    // onSnapshot(collectionGroup(db, "posts"), (snapshot) => {
    //   setPosts(snapshot.docs.map((doc) => ({...doc.data(), id : doc.id })));
    // }),
    {
      const postRef = collectionGroup(db, "posts");
      const orderedOrders = query(postRef, orderBy("createdAt", "desc"));
      onSnapshot(orderedOrders, snapshot => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    }, []);

  // console.log(posts);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default HomeScreen;
