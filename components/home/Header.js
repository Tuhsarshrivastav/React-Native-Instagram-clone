import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { app } from "../../firebaseConfig"; 
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth()

const handleSignOut = () =>{
  try{
    signOut(auth).then(()=> Alert.alert("Sign Out", "Sign Out Completed"))
  }catch(error){
    Alert.alert("Sign Out Error", error.message)
  }
}

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image
          style={styles.logo}
          source={require("../../assets/instagram.png")}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={()=> navigation.push("NewPostScreen")}>
          <Image
            style={styles.icon}
            source={require("../../assets/add_icon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../assets/like_icon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
        <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
        </View>
          <Image
            style={styles.icon}
            source={require("../../assets/message_icon.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginHorizontal : 10
  },
  unreadBadge : {
      backgroundColor : "#ff3250",
      position : "absolute",
      left : 20,
      bottom : 18,
      width : 25,
      height : 18,
      alignItems : "center",
      justifyContent : "center",
      borderRadius : 25,
      zIndex : 1
  },
  unreadBadgeText : {
      color : "white",
      fontWeight : "600"
  }
});

export default Header;
