import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';

const Loader: FC = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator />
      <Text children="URL checking..." />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
