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
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {Neomorph} from 'react-native-neomorph-shadows';
import SelectDropdown from 'react-native-select-dropdown';
import {semDropDown} from './components/SemDropDown';
import firestore from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');

const addSubUnit = [
  {
    id: 1,
    name: 'Subject',
  },
  {
    id: 2,
    name: 'Unit',
  },
];
const AddData = ({navigation, route}) => {
  const [sem, setSem] = useState('');

  const [sub, setSub] = useState(''); //subjet name add subject section
  const [subCount, setSubCount] = useState(""); //section => add subject

  const [subjectId, setSubjectId] = useState(""); //subjet add unit section
  const [unitCount, setUnitCount] = useState(""); //secton => add unit
  const [unitName, setUnitName] = useState(""); //secton => add unit

  const [option, setOption] = useState('');

  const [subjects, setSubjects] = useState([]); //dropdown
  const [units, setUnits] = useState([]); //dropdwon

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSub = async () => {
      try {
        const subList = [];
        await firestore()
          .collection('subjects')
          .get()
          .then(result => {
            setSubCount(result.size);
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
            //  console.log(result.size);
          });
        setSubjects(subList);
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
          .collection('units')
          .get()
          .then(result => {
            setUnitCount(result.size);
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
  }, [units]);
  

  const AddSubject = async () => {
    if (sub != "" && subCount != "" && sem != "") {
      setLoading(true);
      console.log(subCount + 1);
      await firestore()
        .collection('subjects')
        .add({
          name: sub,
          id: subCount + 1,
          img: 'https://media.istockphoto.com/photos/businessman-hold-virtual-medical-network-connection-icons-covid19-picture-id1312765142?b=1&k=20&m=1312765142&s=170667a&w=0&h=ma8qI_qiKbpNXLqKbQN1HKmSr1hfEn2dw6XyCB-nsSA=',
          sem,
        })
        .then(() => {
          setLoading(false);
          ToastAndroid.show(
            'Subject added!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          console.log('User added!');
        });
    }else{
       ToastAndroid.show(
         'Enter all the fields!',
         ToastAndroid.SHORT,
         ToastAndroid.CENTER,
       );
    }
  };


  const AddUnit = async () => {
   if (unitName != "" && unitCount != "" && subjectId != "") {
      setLoading(true);
      console.log(unitCount + 1);
      await firestore()
        .collection('units')
        .add({
          name: unitName,
          id: unitCount + 1,
          subject: subjectId,
        })
        .then(() => {
          setLoading(false);
          ToastAndroid.show(
            'Unit added!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          console.log('User added!');
        });
   }else{
     ToastAndroid.show(
       'Enter all the fields!',
       ToastAndroid.SHORT,
       ToastAndroid.CENTER,
     );
   }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cards}>
          {addSubUnit.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setOption(item.id);
                }}
                activeOpacity={0.9}
                key={index}>
                <Neomorph
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorph}>
                  <Text style={styles.textStyle}>Add {item.name}</Text>
                </Neomorph>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.AddDataContainer}>
          {option == 1 ? (
            <View style={styles.con}>
              <View style={styles.FormHeading}>
                <Text style={styles.FormHeadingText}>Add a Subject</Text>
              </View>

              <View style={styles.sem}>
                <View style={styles.SemTextContainer}>
                  <Text style={styles.semText}>Sem</Text>
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
                        <FontAwesome5
                          name="caret-down"
                          size={15}
                          color={'#fff'}
                        />
                      );
                    }}
                  />
                </View>
              </View>
              <View style={styles.nameContainer}>
                <TextInput
                  label="Subject Name"
                  value={sub}
                  mode="outlined"
                  activeOutlineColor="#5D5FEF"
                  onChangeText={text => setSub(text)}
                  style={{backgroundColor: '#fff'}}
                />
              </View>
              <View style={styles.uploadButtonContainer}>
                {loading ? (
                  <ActivityIndicator size="small" color={'#000'} />
                ) : (
                  <Button
                    onPress={AddSubject}
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
          ) : option == 2 ? (
            <View style={styles.con}>
              <View style={styles.FormHeading}>
                <Text style={styles.FormHeadingText}>Add Unit</Text>
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
                      // Unit(selectedItem.id);
                      setSubjectId(selectedItem.id);
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
                        <FontAwesome5
                          name="caret-down"
                          size={15}
                          color={'#fff'}
                        />
                      );
                    }}
                  />
                </View>
              </View>
              <View style={styles.nameContainer}>
                <TextInput
                  label="Unit Name"
                  value={unitName}
                  mode="outlined"
                  activeOutlineColor="#5D5FEF"
                  onChangeText={text => setUnitName(text)}
                  style={{backgroundColor: '#fff'}}
                />
              </View>
              <View style={styles.uploadButtonContainer}>
                {loading ? (
                  <ActivityIndicator size="small" color={'#000'} />
                ) : (
                  <Button
                    onPress={AddUnit}
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
          ) : (
            <View style={styles.con}>
              <Text>Select an option!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  neomorph: {
    shadowRadius: 10,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    width: width - 45,
    height: 120,
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
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
  con: {
    marginTop: 30,
    padding: 20,
  },
  SemDrop: {},
  nameContainer: {
    marginBottom: 15,
  },
  FormHeading: {
    marginBottom: 15,
  },
  FormHeadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameContainer: {
    marginBottom: 15,
  },
  uploadButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
