import React, {useState} from 'react';
import {StyleSheet, Alert, Text, Button, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Modal from 'react-native-modal';

const App = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [barcodeData, setBarcodeData] = useState(0);

  const delay = (time) => {
    return new Promise(function (resolve, reject) {
      setTimeout(() => resolve(), time);
    });
  };

  const toggleModal = () => {
    setBarcodeData(0);
    setModalVisible(!isModalVisible);
  };

  const onBarcode = async ({data}) => {
    await delay(500);
    if (barcodeData == data) return;
    setBarcodeData(data);
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        barCodeTypes={[RNCamera.Constants.BarCodeType.datamatrix]}
        onBarCodeRead={onBarcode}
        googleVisionBarcodeMode={
          RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE
        }
      />
      <Modal isVisible={isModalVisible}>
        <View style={{width: '100%', height: 200, backgroundColor: 'white'}}>
          <Text>{barcodeData}</Text>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;
