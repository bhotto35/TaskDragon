import React,{useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo,toggleTodo,moveUp,moveDown } from '../../actions/todo';
import { todo } from '../../utils/global-interfaces';
import { styles } from './styles';
import RenderItem from './sub-components/RenderItem';
//import { Searchbar } from 'react-native-paper';


function timeDiff(dc_as_date:Date, suffix?:string)
{
  try{
    let curr_date = new Date()
    let date_diff = curr_date.getTime() - dc_as_date.getTime();
    const max_diffs = [
      { diff: 365*24*60*60*1000, unit:"year"},
      { diff: 30*24*60*60*1000, unit:"month"},
      { diff: 7*24*60*60*1000, unit:"week"},
      { diff: 24*60*60*1000, unit:"day"},
      { diff: 60*60*1000, unit:"hour"},
      { diff: 60*1000, unit:"minute"}
    ]
    for(let i=0;i<max_diffs.length;i++)
    {
      let curr_diff = date_diff/max_diffs[i].diff
      // console.log(curr_diff, max_diffs[i].unit)
      if(Math.abs(curr_diff)>=1)
      {
        let curr_diff_to_show = Math.ceil(Math.abs(curr_diff))
        suffix = !suffix?date_diff>0?"past":"left":"old"
        return `${curr_diff_to_show} ${max_diffs[i].unit}${curr_diff_to_show>1?'s':''} ${suffix}`
      }
    }
    return date_diff>0?"Just now":"Soon"
  }
  catch(err:any)
  {
    console.log(err.message)
    return "Hmm"
  }
}

const TodoList = ({navigation}:any) => {

  const todos = useSelector((state:any) => state.todoReducer.todoList);
  const [dummyVar, setDummyVar] = useState<boolean>(true);
  const [searchKey, setSearchKey] = useState('');

  const renderItem = ({item,index }:{item:todo,index:number}) => {
    //console.log(item);
    return (
      <RenderItem 
        item={item} 
        index={index} 
        searchKey={searchKey} 
        navigation={navigation} 
        setDummyVar={setDummyVar}
        dummyVar={dummyVar}
    />
    );
  };

  /*console.log("----------------------------");
  console.log(todos);
  console.log("----------------------------");*/
  return (
    <View style={styles.listBackGround}>
      <View style={{backgroundColor:'rgb(200,200,200)',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',height:50,marginBottom:10}}>
        <Icon style ={{flex:1,textAlign:'center'}} name="search" size={20} color="rgb(184,0,283)"/>
        <TextInput
            value={searchKey}
            style={{flex:5,backgroundColor:'rgb(200,200,200)'}}
            placeholder="Search task"
            onChangeText={(searchKey) => setSearchKey(searchKey)}
            //underlineColorAndroid="transparent"
        />
        <TouchableOpacity style={{flex:1, alignItems:"center",justifyContent:"center"}} onPress={()=>setDummyVar(!dummyVar)}>
            <Icon style ={{textAlign:'center'}} name="refresh" size={22} color="rgb(184,0,283)"/>
        </TouchableOpacity>
      </View>
      {todos.length>0?
        <FlatList style={styles.listContainer} contentContainerStyle={styles.containerStyle}
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        extraData={dummyVar}
      />:<Text style={styles.emptyMessage}>
        🔥Create a task🔥
      </Text>
      }
    </View>
  );
}



export default TodoList;