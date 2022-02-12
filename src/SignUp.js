import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Shadow, Neomorph, NeomorphBlur} from 'react-native-neomorph-shadows';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uname, setUname] = useState('');

  const signUpFun = async () => {
    if (email === "" && password === "" && uname === "") {
        ToastAndroid.show(
          'Fill the required fields!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }else{
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore().collection('users').add({
          email: email,
          name: uname,
          password: password
        }).then(() => {
          // console.log("user added!");
        })
        // console.log('User account created & signed in!');
        ToastAndroid.show(
          'Account created successfully!',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        navigation.replace('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          // console.log('That email address is already in use!');
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }

        if (error.code === 'auth/invalid-email') {
          // console.log('That email address is invalid!');
          ToastAndroid.show(
            'The email address is invalid!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
        if (error.code === 'auth/weak-password') {
          // console.log('Password should be more than 6 digits!');
          ToastAndroid.show(
            'Password should be more than 6 digits!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }

        console.error(error);
      });
  };
}
  return (
    <ScrollView>
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
              <Text style={styles.titleText}>Sign Up</Text>
            </View>
            <View inputSection>
              <TextInput
                style={styles.inputContainer}
                label="UserName"
                value={uname}
                onChangeText={text => setUname(text)}
                mode="contain"
              />
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
                onPress={() => signUpFun()}>
                Sign Up
              </Button>
            </View>
          </View>
        </Neomorph>
        <View style={styles.navigateOptions}>
          <View style={styles.NavComponentsContainer}>
            <View style={styles.NavTextContainer}>
              <Text style={styles.navText}>Already a member?</Text>
            </View>
            <Button
              style={{
                width: '40%',
                borderRadius: 30,
                elevation: 5,
                backgroundColor: '#5D5FEF',
              }}
              mode="contained"
              onPress={() => navigation.replace('Login')}>
              Login
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    height: 425,
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
    marginTop: 20,
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
