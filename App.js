import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert, Button, BackHandler } from 'react-native';

// Define the blank image source
const blankImageSource = require('./assets/favicon.png');

// Define image sources for the puzzle tiles
const imageSources = [
  require('./assets/aishini1.jpg'),
  require('./assets/papa1.png'),
  require('./assets/papa2.jpg'),
  require('./assets/nani1.jpg'),
  require('./assets/tata1.png'),
  require('./assets/aishini1.jpg'),
  require('./assets/papa1.png'),
  require('./assets/papa2.jpg'),
  require('./assets/nani1.jpg'),
  require('./assets/tata1.png')
];

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [tiles, setTiles] = useState(shuffleArray(imageSources));
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);

  useEffect(() => {
    checkForMatch();
  }, [selectedTileIndex]);

  const handleTilePress = (index) => {
    if (selectedTileIndex === null) {
      setSelectedTileIndex(index);
    } else {
      if (selectedTileIndex !== index) {
        checkForMatch(selectedTileIndex, index);
      }
      setSelectedTileIndex(null);
    }
  };

  const checkForMatch = (index1, index2) => {
    if (index1 === undefined || index2 === undefined) return;

    if (tiles[index1] === tiles[index2]) {
      const newTiles = [...tiles];
      newTiles[index1] = blankImageSource;
      newTiles[index2] = blankImageSource;
      setTiles(newTiles);
    }
  };

  const restartGame = () => {
    setTiles(shuffleArray(imageSources));
    setSelectedTileIndex(null);
  };

  const exitGame = () => {
    Alert.alert(
      "Exit",
      "Are you sure you want to exit?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Exit", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tilesContainer}>
        {tiles.map((imageSource, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tile}
            onPress={() => handleTilePress(index)}
            disabled={selectedTileIndex === index}
          >
            <Image
              source={imageSource}
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Restart" onPress={restartGame} />
        <Button title="Exit" onPress={exitGame} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tile: {
    margin: 5,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
});

export default App;
