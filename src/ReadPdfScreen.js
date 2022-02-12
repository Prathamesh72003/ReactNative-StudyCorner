import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PDFView from 'react-native-view-pdf';

const ReadPdfScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  }, []);
  resources = {
    file:
      Platform.OS === 'ios'
        ? 'downloadedDocument.pdf'
        : '/sdcard/Download/downloadedDocument.pdf',
    url: route.params.pdf,
    base64: 'JVBERi0xLjMKJcfs...',
  };
  const resourceType = 'url';
  return (
    <View style={{flex: 1}}>
      {/* Some Controls to change PDF resource */}
      <PDFView
        fadeInDuration={250.0}
        style={{flex: 1}}
        resource={resources[resourceType]}
        resourceType={resourceType}
        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
        onError={error => console.log('Cannot render PDF', error)}
      />
    </View>
  );
};

export default ReadPdfScreen;

const styles = StyleSheet.create({});
