import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  Image,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');
const streams = [
  {
    id: 1,
    name: 'Engineering',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGVuZ2luZWVyaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    name: 'Pharmacy',
    img: 'https://media.istockphoto.com/photos/efficient-pharmacy-operations-thanks-to-teamwork-picture-id1036131880?b=1&k=20&m=1036131880&s=170667a&w=0&h=1KE8pskqiGAe7f6-FbDo-sfVpUHn3ubXpVwZNhMahzg=',
  },
  {
    id: 3,
    name: 'Diploma',
    img: 'https://media.istockphoto.com/photos/close-up-of-a-graduation-diploma-picture-id172176379?b=1&k=20&m=172176379&s=170667a&w=0&h=qghYNCevICw3EZxhSt9NyC1mzhMxXDgnZy6fPClEA2k=',
  },
  {
    id: 4,
    name: 'High School',
    img: 'https://media.istockphoto.com/photos/rearview-shot-of-students-raising-their-hands-during-a-lesson-with-a-picture-id1324921654?b=1&k=20&m=1324921654&s=170667a&w=0&h=kr0dtXylMEG1WiUMmtwrFhIAcwAIiSaHxbKrr-gNsdQ=',
  },
];

const HomeScreen = ({navigation,route}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/bg.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.headingContainer}>
          <FontAwesome5
            name="book-reader"
            style={styles.heading}
            color={'#fff'}
          />
        </View>
        <ScrollView>
          <View style={styles.cards}>
            {streams.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  key={index}
                  onPress={() => {
                    if (
                      item.name === 'Diploma' ||
                      item.name === 'Engineering' ||
                      item.name === 'High School'
                    ) {
                      ToastAndroid.show(
                        'This section is under construction!! Try Pharamacy',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                      );
                    } else {
                      navigation.navigate('Semester', {name: item.name});
                    }
                  }}>
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
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    justifyContent: 'center',
    padding: 30,
  },
  headingContainer: {
    // marginTop: 55,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    top: 25,
    textAlign: 'center',
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 120,
    // backgroundColor: '#000'
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
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  StreamNameContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  StreamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
});
