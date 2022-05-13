import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
  useEffect(()=> {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get("window").height);
      setAvailableDeviceWidth(Dimensions.get("window").width);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  })
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{...styles.imgContainer, ...{
                    width: availableDeviceWidth * 0.7,
                    height: availableDeviceWidth * 0.7,
                    borderRadius: (availableDeviceWidth * 0.7) / 2,
                    marginVertical: availableDeviceHeight / 30}}}>
          {/* 远程图片获取 */}
          <Image
            style={styles.image}
            source={{
              uri: "https://mdevelopers.com/storage/pages/pages-module/360/November2021/technology-react-native.webp",
            }}
            fadeDuration={1000}
          />
        </View>
        <Text>
          <Text>游戏结束! 我猜了{props.roundNumber}轮。</Text>
          <Text>数字是: {props.userNumber}</Text>
        </Text>
        <View style={styles.buttonContainer}>
          <MainButton onPress={props.onNewGame}>再玩一次</MainButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  imgContainer: {
    borderWidth: 4,
    borderColor: "#98F5FF",
    overflow: "hidden",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
