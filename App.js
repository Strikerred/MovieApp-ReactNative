/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import Navigator from './src/navigation/SwitchNavigator';
 //import LoadingView from './src/screens/LoadingView';
 
 // Add Redux
 import {Provider} from 'react-redux';
 import {store, persistor} from './src/redux/store';
 import {PersistGate} from 'redux-persist/lib/integration/react';
 
 const App: () => React$Node = () => {
   return (
     <Provider store={store}>
       <PersistGate persistor={persistor}>
         <Navigator />
       </PersistGate>
     </Provider>
   );
 };
 
 export default App;
 