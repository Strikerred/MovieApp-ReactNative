import 'react-native-gesture-handler';
import React from 'react';

import {connect} from 'react-redux';

//Add Navigator
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './RootNavigation';

import Signin from '../screens/signin';
import HomePage from '../screens/Welcome';
import SearchMovie from '../screens/SearchMovie';

const Stack = createStackNavigator();

function SwitchNavigator({user}) {
    return (
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator>
            {!user.token ? (
              <>
                <Stack.Screen name="Sign In" component={Signin} />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomePage}
                />
                <Stack.Screen
                  name="Search Movie"
                  component={SearchMovie}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
    );
}

const mapStateToProps = state => {
    return {
      user: state.user,
    };
  };
  
  export default connect(mapStateToProps)(SwitchNavigator);