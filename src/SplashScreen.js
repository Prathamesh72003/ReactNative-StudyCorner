import React, {useState, useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();

   function onAuthStateChanged(user) {
     setUser(user);
     if (initializing) setInitializing(false);
   }

   useEffect(() => {
     //  const getName = async () => {
     //    try {
     //      const subList = [];
     //      await firestore()
     //        .collection('users')
     //        // Filter results
     //        .where('email', '==', user.email)
     //        .get()
     //        .then(querySnapshot => {
     //          console.log(querySnapshot);
     //        });
     //    } catch (error) {
     //      console.log(error);
     //    }
     //  };

     //  getName();
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber;
   }, []);

   if (initializing) return null;

   if (!user) {
     setTimeout(() => {
       navigation.replace('Login');
     }, 5000);
   }else{
     setTimeout(() => {
       navigation.replace('Home');
     }, 5000);
   }
  
  return (
    <View style={styles.container}>
        <View style={styles.mainContent}>
          <LottieView
            source={require('./assets/animation.json')}
            autoPlay
            style={{width: 300, height: 300}}
            loop
          />
          <Text style={styles.name}>Study Corner</Text>
        </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 10,
  },
  name: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: 'Copperplate-Bold',
    color: 'blue',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
