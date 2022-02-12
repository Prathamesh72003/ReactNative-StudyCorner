import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {Neomorph} from 'react-native-neomorph-shadows';

const {width, height} = Dimensions.get('window');

const sem = [
  {
    sem: 1,
  },
  {
    sem: 2,
  },
  {
    sem: 3,
  },
  {
    sem: 4,
  },
  {
    sem: 5,
  },
  {
    sem: 6,
  },
  {
    sem: 7,
  },
  {
    sem: 8,
  },
];
const SemesterScreen = ({navigation, route}) => {
 useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.cards}>
          {sem.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Subjects', {id: item.sem, name: "Semester "+item.sem})}
                activeOpacity={0.9}
                key={index}>
                <Neomorph
                  inner // <- enable shadow inside of neomorph
                  swapShadows // <- change zIndex of each shadow color
                  style={styles.neomorph}>
                  <Text style={styles.textStyle}>Semester: {item.sem}</Text>
                </Neomorph>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SemesterScreen;

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
    fontSize: 21,
  },
});
