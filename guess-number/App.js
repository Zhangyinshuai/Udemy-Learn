import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGamesScreen from './screens/StartGamesScreen';
import GameOverScreen from './screens/GameOverScreen';
import  AppLoading  from 'expo-app-loading';

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  if (!dataLoaded) {
    return (
      <AppLoading 
        startAsync={()=>console.log("开始运行")} 
        onFinish={() => { setDataLoaded(true)}} 
        onError={(err) => console.log(err)}
        />
    )
  }

  const configureNewGameHandle = () => {
    setUserNumber(null);
    setGuessRounds(0);
  }

  const startGamesHandle = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  }

  // 通过状态变量来确定渲染哪一个组件，
  let content = <StartGamesScreen startGame={startGamesHandle} />;
  // content = <GameOverScreen roundNumber={1} userNumber={1} onNewGame={configureNewGameHandle} />
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundNumber={guessRounds} userNumber={userNumber} onNewGame={configureNewGameHandle} />
  }

  return (
    <View style={styles.screen}>
      <Header title="guess number!" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});
