import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logo = () => {
  return (
    <Image
      style={styles.logo}
      source={require("./assets/6-61830_rick-and-morty-rick-face-png.png")}
      resizeMode="contain"
    />
  );
};

const Favorites = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  const flatListRef = useRef(null);

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await response.json();
      setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const fetchFavorites = useCallback(async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      if (favoritesData) {
        setFavorites(JSON.parse(favoritesData));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, []); // No dependencies needed here

  useEffect(() => {
    fetchCharacters();
    fetchFavorites();
  }, [fetchCharacters, fetchFavorites, page]); // Include 'page' as a dependency

  const handleEndReached = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleCharacterPress = character => {
    navigation.navigate('CharacterDetails', { character });
  };

  const renderCharacterCard = ({ item }) => {
    if (!favorites.some(favorite => favorite.id === item.id)) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.characterCard} onPress={() => handleCharacterPress(item)}>
        <Image style={styles.characterImage} source={{ uri: item.image }} />
        <View style={styles.characterDetails}>
          <Text style={styles.characterName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleLoadMore = () => {
    setLoadingMore(false);
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Liste des personnages favoris :</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#8BC34A" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={characters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCharacterCard}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={handleLoadMore}
        />
      )}
      <View style={styles.pagination}>
        <Text style={styles.paginationText}>Page {page}</Text>
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
  paginationText: {
    fontSize: 18,
    color: '#8BC34A', // Vert clair
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
});

export default Favorites;
