import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [name, setName] = useState([]);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const getUserName = async () => {
      const nameList = [];
      await firestore()
        .collection('users')
        // Filter results
        .where('email', '==', user.email)
        .get()
        .then(result => {
          result.forEach(doc => {
            const {name} = doc.data();
            nameList.push({
              name,
            });
          });
        });
      setName(nameList);
      console.log(name);
    };

    getUserName();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.ProfileIcon}>
          <FontAwesome5 name="user" size={80} color={'#fff'} />
        </View>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.components}>
          <TouchableOpacity>
            <View style={styles.card}>
              <FontAwesome5 name="file-alt" size={30} color={'#5D5FEF'} />
              <Text style={styles.componentText}>My Pdfs</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.card}>
            <FontAwesome5 name="heart" size={30} color={'#5D5FEF'} />
            <Text style={styles.componentText}>Wishlist</Text>
          </View>
          <View style={styles.card}>
            <FontAwesome5 name="bell" size={30} color={'#5D5FEF'} />
            <Text style={styles.componentText}>Notifications</Text>
          </View>
        </View>
      </View>
      <View style={styles.LowerContainer}>
        <View style={styles.TabList}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Edit')}> */}

          <View style={styles.listItem}>
            <View style={styles.Icon}>
              <FontAwesome5 name="user" size={25} color={'#5D5FEF'} />
            </View>
            <View style={styles.ListTextContainer}>
              {name.map((item, index) => {
                return (
                  <Text style={styles.ListText} key={index}>
                    {item.name}
                  </Text>
                );
              })}
            </View>
          </View>
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity> */}
          <View style={styles.listItem}>
            <View style={styles.Icon}>
              <FontAwesome5 name="envelope" size={25} color={'#5D5FEF'} />
            </View>
            <View style={styles.ListTextContainer}>
              <Text style={styles.ListText}>{user.email}</Text>
            </View>
          </View>
          {/* </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('AddData')}>
            <View style={styles.listItem}>
              <View style={styles.Icon}>
                <FontAwesome5 name="upload" size={25} color={'#5D5FEF'} />
              </View>
              <View style={styles.ListTextContainer}>
                <Text style={styles.ListText}>Add Subjects and Units</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              auth()
                .signOut()
                .then(() => {
                  // console.log('done');
                  navigation.replace('Login');
                });
            }}>
            <View style={styles.listItem}>
              <View style={styles.Icon}>
                <FontAwesome5 name="sign-out-alt" size={25} color={'#5D5FEF'} />
              </View>
              <View style={styles.ListTextContainer}>
                <Text style={styles.ListText}>Logout</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
  },
  upperContainer: {
    display: 'flex',
    height: height / 3,
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
    marginTop: 30,
  },
  middleContainer: {
    backgroundColor: '#fff',
    marginTop: -50,
    // marginBottom: 20,
    borderRadius: 40,
    padding: 35,
    elevation: 10,
  },
  components: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  LowerContainer: {
    padding: 40,
    // backgroundColor: '#F3F3F3',
  },
  TabList: {},
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  Icon: {},
  ListTextContainer: {
    marginLeft: 20,
  },
  ListText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
