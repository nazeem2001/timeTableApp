/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten TypeScript template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {NavigationContainer, RouteProp} from '@react-navigation/native';

import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {HomeScreen} from './components/HomeScreen';
import {EditLinkScreen} from './components/editLink';
import {myTheme} from './custom-theme';
import {FacultyResultType} from './constants';
import ResultPage2 from './components/resultPage2';
export type RootStackParamList = {
  Home: undefined; // Add your props here
  editLink: undefined;
  result2: {data: FacultyResultType; FacultyName: string};
};
export interface PageProps<T extends keyof RootStackParamList> {
  // T is one of Home|PasswordAdd
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList>;
}
/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const Stack = createStackNavigator<RootStackParamList>();
export default (): React.ReactElement => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{...eva.light, ...myTheme}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="editLink" component={EditLinkScreen} />
          <Stack.Screen name="result2" component={ResultPage2} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);
