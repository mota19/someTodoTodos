import React from 'react';
import Segmesnts from './components/segments';
import {SafeAreaView, StyleSheet} from 'react-native';
import {store} from './Redux/store/store';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.contaienr}>
          <Segmesnts />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  contaienr: {
    flex: 1,
  },
});
