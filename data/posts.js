import { StyleSheet } from "react-native";
import { USERS } from "./users";

export const POSTS = [
  {
    imageUrl:
      "https://tse4.mm.bing.net/th?id=OIP.Rhy5lpv-rT_vhgdIGNtHPwHaEK&pid=Api&P=0&w=320&h=180",
    user: USERS[0].user,
    likes: 1000,
    caption: "SHEESH SHEESH SHIT",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "Kiernan Shipka",
        comment: "NICE JOB",
      },
      {
        user: "Kathryn Newton",
        comment: "Good JOB",
      },
      {
        user: "Chole Bennet",
        comment: "Splendid JOB",
      },
    ],
  },
  {
    imageUrl:
      "https://tse2.mm.bing.net/th?id=OIP.3BASKIWWs3yWPpyX0B2oBAHaEK&pid=Api&P=0&w=306&h=172",
    user: USERS[1].user,
    likes: 8800,
    caption: "KEmist",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "Lonely boy",
        comment: "Eat shit",
      },
      {
        user: "Depressed boy",
        comment: "Life is shit",
      },
    ],
  },
];
