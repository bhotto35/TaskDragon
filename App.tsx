/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Image, TouchableOpacity, Button, Text} from 'react-native';
import IconF from 'react-native-vector-icons/Fontisto';
import TodoForm from './src/screens/TodoForm';
import TodoList from './src/screens/TodoList';
import TodoEdit from './src/screens/TodoEdit';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AppStack = ({navigation}:any) =>
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="TodoList"
        component={TodoList}
        options={({navigation})=>({
          headerTitle: 'TaskDragon',
          headerTintColor:'rgb(184,0,283)',
          headerStyle:{
            backgroundColor:'rgb(200,200,200)',
          },
          headerLeft:()=>(<Image
            style={styles.image}
            source={require('./src/assets/logo.png')}
          />),
          headerRight: () => (
            <TouchableOpacity onPress={()=> navigation.navigate('TodoForm')} style={{borderRadius:55,backgroundColor:'rgb(184,0,283)'}}>
              <IconF name="plus-a" color="white" size={18} style={{padding:15}} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TodoForm"
        component={TodoForm}
        options={{
          title: 'Create Task',
          headerTintColor:'rgb(184,0,283)',
          headerStyle: {
            backgroundColor: 'rgb(200,200,200)'
          }
        }}
      />
      <Stack.Screen
        name="TodoEdit"
        component={TodoEdit}
        options={{
          title: 'Edit Task',
          headerTintColor:'rgb(184,0,283)',
          headerStyle: {
            backgroundColor: 'rgb(200,200,200)'
          }
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>

  const styles= StyleSheet.create({
    image: {
      width: 50,
      height: 50,
      borderColor: 'rgb(184,0,283)',
      borderWidth: 2,
      borderRadius: 25,
    }
  })

export default AppStack