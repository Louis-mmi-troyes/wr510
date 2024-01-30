import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Image, View } from 'react-native';
import HomeScreen from './HomeScreen';
import CardScreen from './CardScreen';
import FavorieScreen from './FavorieScreen';
import RechercheScreen from './RechercheScreen';
import SetingScreen from './setingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeIcon = () => (
  <Image
    style={{ height: 24, width: 24, tintColor: '#8BC34A' }} // Vert clair
    source={require("./assets/home.png")}
    resizeMode="contain"
  />
);

const FavorieIcon = () => (
  <Image
    style={{ height: 24, width: 24, tintColor: '#8BC34A' }} // Vert clair
    source={require("./assets/fav.png")}
    resizeMode="contain"
  />
);

const RechercheIcon = () => (
  <Image
    style={{ height: 24, width: 24, tintColor: '#8BC34A' }} // Vert clair
    source={require("./assets/rec.png")}
    resizeMode="contain"
  />
);

const ProfilIcon = () => (
  <Image
    style={{ height: 24, width: 24, tintColor: '#8BC34A' }} // Vert clair
    source={require("./assets/prof.png")}
    resizeMode="contain"
  />
);

const Logo = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Image
      style={{ height: 30, width: 30, tintColor: '#8BC34A' }}
      source={require("./assets/6-61830_rick-and-morty-rick-face-png.png")}
      resizeMode="contain"
    />
    <Text style={{ marginLeft: 8, fontSize: 18, fontWeight: 'bold', color: '#8BC34A' }}>rickmania</Text>
  </View>
);

const screenOptionsWithLogo = {
  headerTitle: () => <Logo />,
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: '#263238' }, // Vert clair pour la barre de navigation
  headerTintColor: '#FFFFFF', // Blanc pour le texte de la barre de navigation
};

const createCustomStackNavigator = (component) => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name="Home"
        component={component}
        options={screenOptionsWithLogo}
      />
      <Stack.Screen name="CharacterDetails" component={CardScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarActiveTintColor: '#8BC34A', // Vert clair pour l'icône active
          tabBarInactiveTintColor: '#B0BEC5', // Gris pour l'icône inactive
          tabBarStyle: { backgroundColor: '#263238' }, // Vert clair pour le fond du bas
        }}
      >
        <Tab.Screen
          name="Home"
          component={() => createCustomStackNavigator(HomeScreen)}
          options={{ tabBarIcon: HomeIcon }}
        />
        <Tab.Screen
          name="Favorie"
          component={() => createCustomStackNavigator(FavorieScreen)}
          options={{ tabBarIcon: FavorieIcon }}
        />
        <Tab.Screen
          name="Recherche"
          component={() => createCustomStackNavigator(RechercheScreen)}
          options={{ tabBarIcon: RechercheIcon }}
        />
        <Tab.Screen
          name="Profil"
          component={Profil}
          options={{ tabBarIcon: ProfilIcon }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const Profil = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name="Home"
        component={SetingScreen}
        options={screenOptionsWithLogo}
      />
      <Stack.Screen name="CharacterDetails" component={CardScreen} />
    </Stack.Navigator>
  );
};

export default App;
