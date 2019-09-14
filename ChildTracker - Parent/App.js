import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ListsScreen from './src/screens/ListsScreen'

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Lists: ListsScreen
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'Child Keeper'
    }
  }
);

export default createAppContainer(navigator);
