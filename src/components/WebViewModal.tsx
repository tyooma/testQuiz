import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import WebView from 'react-native-webview';

import { WebViewModalProp } from '../types/types';

const WebViewModal: FC<WebViewModalProp> = ({ visible, close, url }) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={close}>
      <View style={styles.container}>
        <WebView source={{ uri: url }} style={styles.webView} />
        <TouchableOpacity style={styles.close} onPress={close}>
          <Text children="Close" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default WebViewModal;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
