import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import LottieView from 'lottie-react-native';


const {width, height} = Dimensions.get('window');
const subs = [
  {
    id: 1,
    name: 'Human anatomy',
    img: 'https://images.unsplash.com/photo-1532153470116-e8c2088b8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBhbmF0b215fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    sem: 1,
  },
  {
    id: 2,
    name: 'Thermo',
    img: 'https://media.istockphoto.com/photos/closeup-details-of-old-external-aircooled-condenser-in-water-cooler-picture-id516874709?b=1&k=20&m=516874709&s=170667a&w=0&h=brbI6POp4o_On9KZikiNoypIo5bve6iL4lUuqZxQrpY=',
    sem: 1,
  },
  {
    id: 3,
    name: 'Human anotomy',
    img: 'https://images.unsplash.com/photo-1532153470116-e8c2088b8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBhbmF0b215fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    sem: 3,
  },
  {
    id: 4,
    name: 'Human anotomy',
    img: 'https://images.unsplash.com/photo-1532153470116-e8c2088b8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBhbmF0b215fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    sem: 2,
  },
  {
    id: 5,
    name: 'Human anotomy',
    img: 'https://images.unsplash.com/photo-1532153470116-e8c2088b8ac1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW4lMjBhbmF0b215fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    sem: 2,
  },
];
const SubjectsScreen = ({navigation, route}) => {
  const [subjects, setSubjects] = useState([]);

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
              const {id,name, sem, img} = doc.data();
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

    navigation.setOptions({
      title: route.params.name,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
          <View style={styles.cards}>
            {subjects.map((item, index) => {
              if (item.sem == route.params.id)
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    key={index}
                    onPress={() =>
                      navigation.navigate('Units', {
                        id: item.id,
                        name: item.name,
                      })
                    }>
                    <View style={styles.StreamCard}>
                      <View style={styles.StreamImageContainer}>
                        <Image
                          source={{
                            uri: item.img,
                          }}
                          style={styles.StreamImage}
                        />
                      </View>
                      <View style={styles.StreamNameContainer}>
                        <Text style={styles.StreamName}>{item.name}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
            })}
          </View>
      </ScrollView>
    </View>
  );
};

export default SubjectsScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    // marginTop: 120,
    marginLeft: 20,
    marginRight: 20,
  },
  StreamCard: {
    // height: 180,
    marginTop: 20,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  StreamImageContainer: {},
  StreamImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  StreamNameContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  StreamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D5FEF',
    textAlign: 'center',
  },
});
