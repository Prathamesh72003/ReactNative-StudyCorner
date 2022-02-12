import {StyleSheet, Text, TouchableOpacity, View,PermissionsAndroid} from 'react-native';
import React, {useState, useEffect} from 'react';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';


const Testing = () => {
  const [pdfAdd, setPdfAdd] = useState('');
  const [pdfName, setPdfName] = useState('');

  const uploadfiles = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      console.log(res[0].uri);
      //output: content://com.android.providers.media.documents/document/image%3A4055

      RNFetchBlob.fs
        .stat(res[0].uri)
        .then(stats => {
          console.log(stats.path);
          setPdfAdd(stats.path);
          //output: /storage/emulated/0/WhatsApp/Media/WhatsApp Images/IMG-20200831-WA0019.jpg
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const Tostorage = async () => {
    
    const file = "file://";
    let add = file + "" + pdfAdd;
    console.log('====================================');
    console.log(add);
    console.log('====================================');
    let fileName = add.substring(add.lastIndexOf('/' + 1));
  //   const permission = await PermissionsAndroid.request(
  //   PermissionsAndroid.WRITE_EXTERNAL_STORAGE
  // )
  // if (permission === PermissionsAndroid.RESULTS.GRANTED) {
    const task = storage().ref(fileName).putFile(add);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
    });
  // }
    
  };
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={uploadfiles}
        style={{
          backgroundColor: '#000',
          width: '100%',
          height: 100,
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <Text style={{color: '#fff'}}>Press</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={Tostorage}
        style={{
          backgroundColor: '#000',
          width: '100%',
          height: 100,
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff'}}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({});
