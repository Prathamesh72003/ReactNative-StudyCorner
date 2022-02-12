import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect,useState} from 'react';
import {Neomorph} from 'react-native-neomorph-shadows';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');
const units = [
  {
    id: 1,
    name: 'Human Anatomy 1',
    sub: 1,
  },
  {
    id: 2,
    name: 'Human Anatomy 2',
    sub: 2,
  },
  {
    id: 3,
    name: 'Human Anatomy 3',
    sub: 2,
  },
  {
    id: 4,
    name: 'Human Anatomy 4',
    sub: 2,
  },
  {
    id: 5,
    name: 'Human Anatomy 5',
    sub: 1,
  },
  {
    id: 6,
    name: 'Human Anatomy 6',
    sub: 3,
  },
  {
    id: 7,
    name: 'Human Anatomy 7',
    sub: 1,
  },
];
const UnitScreen = ({navigation, route}) => {
  const [unit, setUnit] = useState([]);
  useEffect(() => {
    const getUnits = async () => {
      try {
        const unitList = [];
        await firestore().collection('units').get().then(result => {
          result.forEach(doc => {
            const{id,name,subject} = doc.data();
            unitList.push({
              id,
              name,
              subject,
            })
          })
        })
        setUnit(unitList);
      } catch (error) {
        console.log(error);
      }
    };

    getUnits();

    navigation.setOptions({
      title: route.params.name,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cards}>
          {unit.map((item, index) => {
            if (item.subject == route.params.id)
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Pdf', {sub: item.subject, unit: item.name, unit_id: item.id})}
                  activeOpacity={0.9}
                  key={index}>
                  <Neomorph
                    inner // <- enable shadow inside of neomorph
                    swapShadows // <- change zIndex of each shadow color
                    style={styles.neomorph}>
                    <Text style={styles.textStyle}>
                      Unit {item.id}: {item.name}
                    </Text>
                  </Neomorph>
                </TouchableOpacity>
              );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default UnitScreen;

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
    // fontWeight: 'bold',
    fontSize: 16,
  },
});
