// Navigation/Navigation.js

import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../Components/Search'
import Favorites from '../Components/Favorites'
import FilmDetail from '../Components/FilmDetail'
import { StyleSheet, Image } from 'react-native'

const Tab = createBottomTabNavigator();

const searchStack = createStackNavigator();
function searchStackScreen() {
  return (
    <searchStack.Navigator>
      <searchStack.Screen name="Recherche" component={Search} />
      <searchStack.Screen name="Détail des films" component={FilmDetail} />
    </searchStack.Navigator>
  );
}


const favoritesStack = createStackNavigator();
function favoritesStackScreen() {
  return (
    <favoritesStack.Navigator>
      <favoritesStack.Screen name="Favoris" component={Favorites} />
      <favoritesStack.Screen name="Détail des films" component={FilmDetail} />
    </favoritesStack.Navigator>
  )
}


class Navigation extends React.Component {

  render() {
    // return (
    //   <NavigationContainer>
    //     <Tab.Navigator>
    //       <Tab.Screen name="Recherche" component={searchStackScreen} />
    //       <Tab.Screen name="Favoris" component={Favorites} />
    //     </Tab.Navigator>
    //   </NavigationContainer>
    // )

    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: () => {  
              if (route.name === 'Recherche') {
                var source = require('../Images/ic_search.png')

              } else if (route.name === 'Favoris') {
                var source = require('../Images/ic_favorite.png')
              }
              // You can return any component that you like here!
              return <Image source={source} style={styles.icon}/>
            },
          })}
          tabBarOptions={{
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
          }}
        >
          <Tab.Screen name="Recherche" component={searchStackScreen} />
          <Tab.Screen name="Favoris" component={favoritesStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default Navigation