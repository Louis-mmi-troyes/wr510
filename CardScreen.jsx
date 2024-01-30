import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = ({ route }) => {
  const { character } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Vérifier si le personnage est déjà en favori
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        const isCharacterFavorite = parsedFavorites.some((fav) => fav.id === character.id);
        setIsFavorite(isCharacterFavorite);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      let favorites = await AsyncStorage.getItem('favorites');
      if (!favorites) {
        favorites = [];
      } else {
        favorites = JSON.parse(favorites);
      }

      if (isFavorite) {
        // Retirer de la liste des favoris
        const updatedFavorites = favorites.filter((fav) => fav.id !== character.id);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        // Ajouter à la liste des favoris
        favorites.push(character);
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      }

      // Mettre à jour l'état du favori
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.characterImage} source={{ uri: character.image }} />
      <View style={styles.characterDetails}>
        <Text style={styles.characterName}>{character.name}</Text>
        <Text style={styles.characterInfo}>
          <Text style={styles.sectionTitle}>Status: </Text>
          {character.status}
        </Text>
        <Text style={styles.characterInfo}>
          <Text style={styles.sectionTitle}>Species: </Text>
          {character.species}
        </Text>

        {/* Bouton pour ajouter/retirer des favoris avec l'image fav.png */}
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Image
            style={styles.favoriteIcon}
            source={require('./assets/fav.png')}
            resizeMode="contain"
          />
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#263238', // Fond sombre
    padding: 10,
  },
  characterImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  characterDetails: {
    alignItems: 'center',
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8BC34A', // Vert clair
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8BC34A', // Vert clair
  },
  characterInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FFFFFF', // Blanc
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#8BC34A', // Vert clair
    padding: 10,
    borderRadius: 5,
  },
  favoriteIcon: {
    height: 24,
    width: 24,
    marginRight: 5,
  },
  favoriteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Card;
