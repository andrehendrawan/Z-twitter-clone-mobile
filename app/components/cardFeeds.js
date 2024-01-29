import { useNavigation } from "@react-navigation/native";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { GET_POSTS } from "../queries/getPost";
import { LIKE_POST } from "../queries/likePost";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { formatUnixTimestamp } from "../helpers/formattedDate"

const CardFeeds = ({ item }) => {
  const navigation = useNavigation()
  const countLikes = item.likes ? item.likes.length : 0;
  const countComments = item.comments ? item.comments.length : 0;
  const [isLiked, setIsLiked] = useState(false);

  const [likePost, { loading, error, data }] = useMutation(LIKE_POST, {
    refetchQueries: [
      GET_POSTS
    ]
  })

  const handleLike = () => {
    if (!loading) {
      likePost({
        variables: {
          likePostInput: {
            postId: item._id,
            username: ""
          },
        }
      });
      setIsLiked(!isLiked);
    }
  }

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate("Details", { post: item })
    }}>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: "https://placekitten.com/50/50" }} // Placeholder image
            style={styles.profileImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{item.author.username}</Text>
            <Text style={styles.postTime}>{formatUnixTimestamp(item?.createdAt)}</Text>
          </View>
        </View>
        <Image source={{ uri: item.imgUrl }} style={styles.postImage} />
        <Text style={styles.postContent} numberOfLines={4}>
          {item.content}
        </Text>

        <View style={styles.likeCommentContainer}>

          <TouchableOpacity onPress={handleLike}>
            <Text style={[styles.likeCommentText, { color: 'black' }]}>
              {countLikes} <FontAwesome name={isLiked ? 'heart' : 'heart-o'} size={14} color={isLiked ? "red" : "black"} />
            </Text>
          </TouchableOpacity>

          <Text style={styles.likeCommentText}>{countComments} Comments</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postTime: {
    color: "#777",
  },
  postContent: {
    marginVertical: 10,
  },
  likeCommentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeCommentText: {
    color: "#555",
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10
  },
});

export default CardFeeds;
