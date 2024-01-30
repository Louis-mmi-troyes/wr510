import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';

const Logo = () => {
  return (
    <Image
      style={{ height: 100, width: 100, marginBottom: 20 }}
      source={require("./assets/6-61830_rick-and-morty-rick-face-png.png")}
      resizeMode="contain"
    />
  );
};

const Home = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef(null);

  const fetchCharacters = useCallback(() => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => response.json())
      .then(data => {
        setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleCharacterPress = character => {
    navigation.navigate('CharacterDetails', { character });
  };

  const renderCharacterCard = ({ item }) => (
    <TouchableOpacity style={styles.characterCard} onPress={() => handleCharacterPress(item)}>
      <Image style={styles.characterImage} source={{ uri: item.image }} />
      <View style={styles.characterDetails}>
        <Text style={styles.characterName}>{item.name}</Text>
        {/* Ajoutez d'autres détails ici */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Les aventures des personnages :</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#8BC34A" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={characters}
          extraData={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCharacterCard}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
      <View style={styles.pagination}>
        <Text style={{ fontSize: 18, color: '#8BC34A' }}>Page {page}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#263238', // Une teinte de vert clair pour le fond
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8BC34A', // Vert clair
  },
  characterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#8BC34A', // Vert clair
    borderRadius: 5,
    padding: 10,
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  characterDetails: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanc pour le texte
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Home;
