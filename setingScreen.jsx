import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

const Logo = () => {
  return (
    <Image
      style={styles.logo}
      source={require("./assets/6-61830_rick-and-morty-rick-face-png.png")}
      resizeMode="contain"
    />
  );
};


const SettingPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const handleLogout = () => {
    // Ajoutez le code pour déconnecter l'utilisateur ici
    console.log('Utilisateur déconnecté');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Paramètres</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Mode sombre</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#263238', // Fond vert clair
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF', // Blanc
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 18,
    color: '#FFFFFF', // Blanc
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FF5252', // Rouge
    padding: 15,
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanc
    textAlign: 'center',
  },
});

export default SettingPage;
