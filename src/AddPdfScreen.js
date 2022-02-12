import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SelectDropdown from 'react-native-select-dropdown';
import {semDropDown} from './components/SemDropDown';
import firestore from '@react-native-firebase/firestore';
import {TextInput, Button} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');
const AddPdfScreen = () => {
  const [sem, setSem] = useState('');
  const [loading, setLoading] = useState(false);
  const [sub, setSub] = useState("");
  const [unit, setUnit] = useState('');
  const [pdfName, setPdfName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);
  const [pdfAdd, setPdfAdd] = useState('');
  //  const [pdfName, setPdfName] = useState('');

  if(loading){
     <ActivityIndicator size="small" color={'#000'} />;
  }

  useEffect(() => {
    const getSub = async () => {
      try {
        const subList = [];
        await firestore()
          .collection('subjects')
          .get()
          .then(result => {
            // console.log(result.size);
            result.forEach(doc => {
              const {id, name, sem, img} = doc.data();
              subList.push({
                id,
                name,
                img,
                sem,
              });
            });
          });
        setSubjects(subList);
        // console.log(subList);
      } catch (error) {
        console.log(error);
      }
    };

    getSub();
    
  }, [subjects]);

  useEffect(() => {
    const getUnits = async () => {
      try {
        const unitList = [];
        await firestore()
          .collection('units').where('subject', '==', sub)
          .get()
          .then(result => {
            result.forEach(doc => {
              const {id, name, subject} = doc.data();
              unitList.push({
                id,
                name,
                subject,
              });
            });
          });
        setUnits(unitList);
      } catch (error) {
        console.log(error);
      }
    };

    getUnits();
  }, [units])
  

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
    if (pdfName != '' && sub != '' && sem != '' && unit != '' && pdfAdd != "") {
      setLoading(true);
      const file = 'file://';
      let add = file + '' + pdfAdd;
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

      task.then(async () => {
        console.log('Image uploaded to the bucket!');
        const url = await storage().ref(fileName).getDownloadURL();
        console.log(url);
        // console.log('bucket add: ' + url);
        firestore()
          .collection('pdfs')
          .add({
            img: 'https://picsum.photos/700',
            name: pdfName,
            owner: "Study Corner",
            pdf: url,
            sub,
            unit,
          })
          .then(() => {
            setLoading(false);
            console.log('User added!');
            ToastAndroid.show(
              'File uploaded successfully!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          });
      });
    } else {
      ToastAndroid.show(
        'Fill the required fields!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }

    // }
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.ProfileIcon}>
          <FontAwesome5 name="file-upload" size={80} color={'#fff'} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.lowerConatiner}>
          <View style={styles.nameContainer}>
            <TextInput
              label="Pdf Name"
              value={pdfName}
              mode="outlined"
              activeOutlineColor="#5D5FEF"
              onChangeText={text => setPdfName(text)}
              style={{backgroundColor: '#fff'}}
            />
          </View>
          <View style={styles.sem}>
            <View style={styles.SemTextContainer}>
              <Text style={styles.semText}>Semester</Text>
            </View>
            <View style={styles.SemDrop}>
              <SelectDropdown
                data={semDropDown}
                defaultValueByIndex={0}
                buttonStyle={styles.dropdown}
                onSelect={(selectedItem, index) => {
                  setSem(selectedItem.id);
                  console.log(selectedItem.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
                renderDropdownIcon={() => {
                  return (
                    <FontAwesome5 name="caret-down" size={15} color={'#fff'} />
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.sem}>
            <View style={styles.SemTextContainer}>
              <Text style={styles.semText}>Subject</Text>
            </View>
            <View style={styles.SemDrop}>
              <SelectDropdown
                data={subjects}
                defaultValueByIndex={0}
                buttonStyle={styles.dropdown}
                onSelect={(selectedItem, index) => {
                  setSub(selectedItem.id);
                  console.log(selectedItem.id);
                  // console.log("new sub "+sub);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
                renderDropdownIcon={() => {
                  return (
                    <FontAwesome5 name="caret-down" size={15} color={'#fff'} />
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.sem}>
            <View style={styles.SemTextContainer}>
              <Text style={styles.semText}>Unit</Text>
            </View>
            <View style={styles.SemDrop}>
              <SelectDropdown
                data={units}
                defaultValueByIndex={0}
                buttonStyle={styles.dropdown}
                onSelect={(selectedItem, index) => {
                  setUnit(selectedItem.id);
                  console.log(selectedItem.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.name;
                }}
                renderDropdownIcon={() => {
                  return (
                    <FontAwesome5 name="caret-down" size={15} color={'#fff'} />
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.pdfInputContainer}>
            <View style={styles.PdfContainer}>
              <Text style={styles.selPDFText}>PDF</Text>
            </View>
            <View style={styles.pickPdf}>
              <TouchableOpacity style={styles.pdfPicker} onPress={uploadfiles}>
                <Text style={styles.pdfPickerText}>Pick a pdf</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.uploadButtonContainer}>
            {loading ? (
              <ActivityIndicator size="small" color={'#000'} />
            ) : (
              <Button
                onPress={Tostorage}
                style={{
                  width: '50%',
                  borderRadius: 30,
                  elevation: 5,
                  backgroundColor: '#5D5FEF',
                }}
                mode="contained">
                Upload
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPdfScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  upperContainer: {
    display: 'flex',
    height: height / 3.5,
    backgroundColor: '#5D5FEF',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 20,
  },
  ProfileIcon: {
    marginBottom: 20,
    display: 'flex',
    // justifyContent: "center",
    alignItems: 'center',
    marginTop: 25,
  },
  lowerConatiner: {
    marginTop: 10,
    padding: 20,
  },
  sem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  semText: {
    fontSize: 18,
  },
  SemDrop: {},
  nameContainer: {
    marginBottom: 15,
  },
  pdfPicker: {
    backgroundColor: '#ddd',
    width: 120,
    height: 45,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  pdfPickerText: {
    color: '#000',
  },
  pdfInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  PdfContainer: {},
  selPDFText: {
    fontSize: 18,
  },
  pickPdf: {},
  uploadButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
