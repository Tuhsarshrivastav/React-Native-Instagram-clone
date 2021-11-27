import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { db, app } from "../../firebaseConfig";
import { getAuth } from "@firebase/auth";
import {
  doc,
  updateDoc,
  FieldValue,
  arrayUnion,
  arrayRemove,
  collectionGroup,
  setDoc
} from "firebase/firestore";

const auth = getAuth();
const postFooterIcons = [
  {
    name: "Like",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/50/ffffff/like.png",
    likedImageUrl:
      "https://img.icons8.com/ios-glyphs/90/fa314a/filled-like.png",
  },
  {
    name: "Comment",
    imageUrl:
      "https://img.icons8.com/material-outlined/60/ffffff/speech-bubble.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/share.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/material-outlined/50/ffffff/bookmark-ribbon.png",
  },
];

const Post = ({ post }) => {
  const handleLike = async (post) => {
    const currentLikeStatus = post.likes_by_users.includes(auth.currentUser.email)
    // console.log(post.likes_by_users,post.owner_email,  auth.currentUser.email, currentLikeStatus);
    console.log(
      "users",
      post.owner_email,
      "posts",
      post.id,
      "loggedInUser",
      auth.currentUser.email,
      "currentLikeStatus",
      currentLikeStatus
    );
    const postRef = doc(db, "users", post.owner_email, "posts", post.id);
    await updateDoc(postRef, {
      likes_by_users: !currentLikeStatus
        ? arrayUnion(auth.currentUser.email)
        : arrayRemove(auth.currentUser.email),
    })
      .then(() => {
        console.log("LIKES UPDATE SUCCESS");
      })
      .catch((err) => console.log("LIKES UPDATE FAIL", err));
  };
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: post.profile_picture }} style={styles.story} />
        <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
          {post.username}
        </Text>
      </View>

      <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
    </View>
  );
};

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const Icon = ({ imageStyle, imageUrl, handleLike, post }) => (
  <TouchableOpacity onPress={() => handleLike ? handleLike(post) : null}>
    <Image style={imageStyle} source={{ uri: imageUrl }} />
  </TouchableOpacity>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
    <View style={styles.leftFooterIconContainer}>
      <Icon
        imageStyle={styles.footerIcon}
        imageUrl={(post && post.likes_by_users.includes(auth.currentUser.email)) ? postFooterIcons[0].likedImageUrl : postFooterIcons[0].imageUrl}
        handleLike={handleLike}
        post={post}
      />
      <Icon
        imageStyle={styles.footerIcon}
        imageUrl={postFooterIcons[1].imageUrl}
      />
      <Icon
        imageStyle={styles.footerIcon}
        imageUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View>
      <Icon
        imageStyle={styles.footerIcon}
        imageUrl={postFooterIcons[3].imageUrl}
      />
    </View>
  </View>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")}
      {post.likes_by_users.length > 1 ? " likes" : " like"}
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "grey" }}>
        View {post.comments.length > 1 && "all "}
        {post.comments.length}
        {post.comments.length > 1 ? " comments" : " comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <View>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user} </Text>
          {comment.comment}
        </Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.5,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconContainer: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "space-between",
  },
});

export default Post;
