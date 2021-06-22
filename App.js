// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import Search from './Components/Search'

// export default function App() {
//   return (
//     <Search/>
//   );
// }


// App.js

import React from 'react'

import Search from './Components/Search'
import FilmDetail from './Components/FilmDetail'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import Store from './Store/configureStore'

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Recherche" component={Search} />
            <Stack.Screen name="Détail des films" component={FilmDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    
    )
  }
}