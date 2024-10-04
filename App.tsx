import React from 'react';
import Segmesnts from './components/segments';
import {SafeAreaView, StyleSheet} from 'react-native';
import {store} from './Redux/store/store';
import {Provider} from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.contaienr}>
        <Segmesnts />
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  contaienr: {
    flex: 1,
  },
});
