import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import SplashScreen from './src/SplashScreen';
import LoginScreen from './src/LoginScreen';
import SignUp from './src/SignUp';
import HomeScreen from './src/HomeScreen';
import SemesterScreen from './src/SemesterScreen';
import SubjectsScreen from './src/SubjectsScreen';
import UnitsScreen from './src/UnitScreen';
import ProfileScreen from './src/ProfileScreen';
import AddPdfScreen from './src/AddPdfScreen';
import ReadPdfScreen from './src/ReadPdfScreen';
import PdfScreen from './src/PdfScreen';
import Testing from './src/Testing';
import AddData from './src/AddData';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 58,
        height: 58,
        borderRadius: 35,
        backgroundColor: '#5D5FEF',
        elevation: 5
      }}>
      {children}
    </View>
  </TouchableOpacity>
);
const TabNavi = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#5D5FEF',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 8,
          backgroundColor: '#EEEEFF',
          borderRadius: 15,
          height: 60,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <FontAwesome5 name="home" size={22} color={color} />;
          },
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        name="AddPdf"
        component={AddPdfScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <FontAwesome5
              name="plus"
              size={22}
              color={focused ? '#FFF' : '#f2f2f2'}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => {
            return <FontAwesome5 name="user" size={22} color={color} />;
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          options={{headerShown: false}}
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={TabNavi}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#5D5FEF',
            },
            headerTintColor: '#fff',
            headerShown: true,
          }}
          name="Semester"
          component={SemesterScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#5D5FEF',
            },
            headerTintColor: '#fff',
            headerShown: true,
          }}
          name="Subjects"
          component={SubjectsScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#5D5FEF',
            },
            headerTintColor: '#fff',
            headerShown: true,
          }}
          name="Units"
          component={UnitsScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#5D5FEF',
            },
            headerTintColor: '#fff',
            headerShown: true,
          }}
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#5D5FEF',
            },
            headerTintColor: '#fff',
            headerShown: true,
          }}
          name="Read"
          component={ReadPdfScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#5D5FEF',
            },
            headerTintColor: '#fff',
            headerShown: true,
          }}
          name="Pdf"
          component={PdfScreen}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#5D5FEF',
            },
            headerTintColor: '#fff',
            headerShown: true,
          }}
          name="Testing"
          component={Testing}
        />
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: '#5D5FEF',
            },
            headerTintColor: '#fff',
            headerShown: true,
          }}
          name="AddData"
          component={AddData}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
