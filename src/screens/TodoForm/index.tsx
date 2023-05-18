import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../actions/todo';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { dateToString, getDeadline } from '../../utils/auxilliary';

function currDate()
{
  var d=new Date();
  var date= [parseInt(d.getFullYear().toString())];
  date.push(parseInt(d.getMonth().toString()));
  date.push(parseInt(d.getDate().toString()));
  date.push(parseInt(d.getHours().toString()));
  date.push(parseInt(d.getMinutes().toString()));
  date.push(parseInt(d.getSeconds().toString()));
  return date;
}

const charCountColor=(x:number)=>{
  if(x<40)
  return 'white';
  else if(x<50)
  {
    return 'yellow';
  }
  else
  return 'red';
}


const TodoForm = ({ navigation,route }:any) => {

  const [todo, setTodo] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [hasDeadline, setHasDeadline] = useState(false);
  const [deadDate,setDeadDate] = useState(new Date());
  const [deadTime, setDeadTime] = useState(new Date());

  const dispatch = useDispatch();


  const onChangeDate = (event:DateTimePickerEvent, value:Date | undefined) => {
    const currentDate = value;// || date;
    //setShow(Platform.OS === 'ios');
    setShowDate(false);
    if(currentDate!=null)
      setDeadDate(currentDate);
    //console.log("Deadline Date: "+deadDate);
  };
  const onChangeTime = (event:DateTimePickerEvent, value:Date | undefined) => {
    const currentTime = value;//selectedTime;
    //setShow(Platform.OS === 'ios');
    setShowTime(false);
    if(currentTime!=null)
      setDeadTime(currentTime);
    //console.log("Deadline time: "+deadTime);
  };
  const showDatepicker = () => {
    setShowDate(true);
  };

  const showTimepicker = () => {
    setShowTime(true);
  };


  const DeadlinePicker = ()=>{
    return (<View style={{flexDirection:'column',display:'flex'}}>
          <View style={{display:'flex',flexDirection:'row',width:'80%',paddingVertical:10}}>
            <TouchableOpacity style={{flex:2,paddingHorizontal:10}} onPress={showDatepicker}>
              <Icon name="calendar" color="rgb(177,116,222)" size={20}/>
            </TouchableOpacity>
            <Text style={{flex:7,paddingHorizontal:10,color:'white'}}>
              Date: {deadDate.getFullYear()}-{deadDate.getMonth()+1}-{deadDate.getDate()}
            </Text>
          </View>
          <View style={{display:'flex',flexDirection:'row',width:'80%',paddingVertical:10}}>
            <TouchableOpacity style={{flex:2,paddingHorizontal:10}} onPress={showTimepicker}>
              <Icon name="clock-o" color="rgb(177,116,222)" size={20}/>
            </TouchableOpacity>
            <Text style={{flex:7,paddingHorizontal:10,color:'white'}}>
              Time: {deadTime.getHours()}:{deadTime.getMinutes()}
            </Text>
          </View>
      </View>
    );
  }

  const submitTodo = (todo:string,hasDeadline:boolean, deadTime:Date, deadDate:Date) => {
    let deadline:string = dateToString(new Date())
    if(hasDeadline)
    {
      deadline = dateToString(getDeadline(deadTime,deadDate));
      //console.log("Time: "+deadTime);
      //console.log("Date: "+deadDate);
      //console.log("Deadline: "+deadline);
    }
    if(todo.length>0&&todo.length<=50)
    {
      setTodo('');
      dispatch(addTodo(todo,hasDeadline,deadline));
      navigation.navigate("TodoList") ;
    }
    else if(todo.length>50)
    {
      Alert.alert('Try less than 50 characters.');
    }
    else
      Alert.alert('Nothing was entered!');
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/logo.png')}
      />
      <Text style={styles.title}>TaskDragon</Text>
      <View style={{width:'90%',display:'flex',flexDirection:'row'}}>
        <TextInput
          value={todo}
          placeholder='Task topic'
          style={styles.todoInput}
          onChangeText={(todo) => setTodo(todo)}
          maxLength={50}
        />{
          todo.length>0?<Text style={[styles.todoCharCount,{color:charCountColor(todo.length)}]}>
            {50-todo.length}
          </Text>:null
        }
      </View>
      <View style={{width:'90%',display:'flex',padding: 12,borderRadius: 10,flexDirection:'row',borderColor:'white',borderWidth:1}}>
        <Checkbox
          uncheckedColor="rgb(177,116,222)"
          color="rgb(177,116,222)"
          status={hasDeadline ? 'checked' : 'unchecked'}
          onPress={() => {
            setHasDeadline(!hasDeadline);
          }}
        />
        <Text style={{color:'white',paddingTop:3,fontSize:20}}>Set a Deadline</Text>
        
      </View>
      {hasDeadline?(
          <DeadlinePicker/>
        ):null}
        {showDate && (
            <DateTimePicker
              //testID="dateTimePicker"
              value={deadDate}
              mode='date'
              is24Hour={true}
              display="default"
              minimumDate={new Date()}
              //dateFormat = "year month day"
              onChange={onChangeDate}
            />
          )}
          {showTime && (
            <DateTimePicker
              //testID="dateTimePicker"
              value={deadTime}
              mode='time'
              is24Hour={true}
              display="default"
              minimumDate={new Date()}
              //dateFormat = "hour minute"
              onChange={onChangeTime}
            />
          )}
      <TouchableOpacity
        style={{ marginVertical: 8,justifyContent:'center' }}
        onPress={() => {
          submitTodo(todo,hasDeadline,deadTime,deadDate)
        }}>
        <Text style={{ fontSize: 22, color: 'rgb(177,116,222)',fontFamily:'ZenDots-Regular' }}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 16 }}
        onPress={() =>
          navigation.navigate('TodoList')}>
        <Text style={{ fontSize: 22, color: 'white',fontFamily:'ZenDots-Regular' }}>Go to List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily:'ZenDots-Regular',
    textShadowColor:'rgb(255,147,38)',
    textShadowOffset:{width: 0, height: 0},
    textShadowRadius: 20,
    fontSize: 40,
    paddingVertical:5,
    marginBottom: 30,
    marginTop: 16,
    color: 'rgb(255,232,151)'
  },
  todoInput: {
    fontSize: 20,
    marginBottom: 12,
    borderWidth: 1,
    padding: 12,
    width: '80%',
    flex:8,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  todoCharCount:{
    padding:5,
    textAlign:'center',
    fontSize:20,
    flex:1
  },
  image: {
    width: 120,
    height: 120,
    borderColor: 'rgb(177,116,222)',
    borderWidth: 2,
    borderRadius: 100,
  }
});

export default TodoForm;
