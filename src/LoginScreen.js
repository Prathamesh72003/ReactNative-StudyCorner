import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Shadow, Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  loginFun = async () => {
    if (email === '' && password === '') {
      ToastAndroid.show(
        'Fill the required fields!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          ToastAndroid.show(
            'Logged in successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          navigation.replace('Home', {email: email});
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            // console.log('The email address is invalid!');
            ToastAndroid.show(
              'Invalid email address!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          if (error.code === 'auth/wrong-password') {
            // console.log('The password does not matches the email id!');
            ToastAndroid.show(
              'Invalid password!',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }

          console.log(error);
        });
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.logoConatiner}>
        <Image
          source={require('./assets/logo.png')}
          style={{width: 200, height: 200}}
        />
      </View>
      <Neomorph
        darkShadowColor="#FF3333"
        lightShadowColor="#3344FF"
        style={styles.neomorph1}>
        <View style={styles.formConatiner}>
          <View style={styles.Title}>
            <Text style={styles.titleText}>Login</Text>
          </View>
          <View inputSection>
            <TextInput
              style={styles.inputContainer}
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              mode="contain"
            />
            <TextInput
              style={styles.inputContainer}
              label="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              mode="contain"
            />
          </View>
          <View style={styles.LoginButton}>
            <Button
              style={{
                width: '60%',
                borderRadius: 30,
                elevation: 5,
                backgroundColor: '#5D5FEF',
              }}
              mode="contained"
              onPress={() => loginFun()}>
              Login
            </Button>
          </View>
        </View>
      </Neomorph>
      <View style={styles.navigateOptions}>
        <View style={styles.NavComponentsContainer}>
          <View style={styles.NavTextContainer}>
            <Text style={styles.navText}>Dont have an account?</Text>
          </View>
          <Button
            style={{
              width: '40%',
              borderRadius: 30,
              elevation: 5,
              backgroundColor: '#5D5FEF',
            }}
            mode="contained"
            onPress={() => navigation.replace('SignUp')}>
            SignUp
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  neomorph1: {
    shadowOpacity: 0.3,
    shadowRadius: 15,
    borderRadius: 50,
    backgroundColor: '#fff',
    width: 300,
    height: 350,
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: "center",
    padding: 30,
  },
  formConatiner: {},
  Title: {
    marginTop: 10,
    marginBottom: 10,
  },
  titleText: {
    fontSize: 24,
  },
  inputSection: {
    marginTop: 25,
  },
  inputContainer: {
    backgroundColor: '#fff',
    marginTop: 15,
  },
  logoConatiner: {
    // marginTop: ,
  },
  LoginButton: {
    marginTop: 30,
    alignItems: 'center',
  },
  NavComponentsContainer: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  NavTextContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {},
});
