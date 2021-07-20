import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES_SCREENS_MAIN} from '../utils/routes';

const Stack = createStackNavigator();

const ScreenRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    }}
    initialRouteName="SplashScreen">
    {ROUTES_SCREENS_MAIN.map(route => (
      <Stack.Screen
        key={route.index}
        name={route.routeName}
        component={route.screenComponent}
      />
    ))}
  </Stack.Navigator>
);

export default ScreenRoutes;
