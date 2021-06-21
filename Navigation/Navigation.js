// Navigation/Navigation.js

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Search from '../Components/Search'

// const SearchStackNavigator = createStackNavigator({
//   Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
//     screen: Search,
//     navigationOptions: {
//       title: 'Rechercher'
//     }
//   }
// })*

const Stack = createStackNavigator();

class Navigation extends React.Component {


  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Rechercher" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default Navigation