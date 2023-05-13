import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, Image, TouchableOpacity, Button, Text} from 'react-native';
import IconF from 'react-native-vector-icons/Fontisto';
import TodoForm from './src/todoForm';
import TodoList from './src/todoList';
import TodoEdit from './src/todoEdit';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

  export default AppStack = ({navigation}) =>
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
            <TouchableOpacity onPress={()=> navigation.navigate('TodoForm')} style={{padding:20,borderRadius:55,backgroundColor:'rgb(184,0,283)'}}>
              <IconF name="plus-a" color="white" size={25}/>
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
