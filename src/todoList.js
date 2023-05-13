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
import IconM from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo,toggleTodo,moveUp,moveDown } from './actions/todo';
//import { Searchbar } from 'react-native-paper';

function currDate()
{
  var d=new Date();
  var date= [parseInt(d.getFullYear())];
  date.push(parseInt(d.getMonth())+1);
  date.push(parseInt(d.getDate()));
  date.push(parseInt(d.getHours()));
  date.push(parseInt(d.getMinutes()));
  date.push(parseInt(d.getSeconds()));
  return date;
}
function elapsedTime(dc)//dc: date created
{
  var currtime = currDate();
  var units = [" year"," month"," day"];
    /*console.log("deadline: "+deadline);
    console.log("currtime: "+currtime);
    console.log("-----------------");
    //console.log("------------------------");*/
    var timediff=0;
    for(var i=0;i<3;i++)
    {
      timediff=currtime[i]-dc[i];
      if(i==2)
      {
        if(timediff>1)
        {
          return timediff+units[i]+"s old";
        }
        else if(timediff==1)
        {
          let currTimeMins = currtime[3]*60+currtime[4];
          let dcMins = dc[3]*60+dc[4];
          let diffmins = currTimeMins-24*60-dcMins;
          if(diffmins>24*60)
          {
            return "1 day old";
          }
          else if(diffmins<24*60)
          {
            let diffhrs = Math.floor(diffmins/60);
            if(diffhrs>1)
            {
              return diffhrs+" hours old";
            }
            else
              return diffmins+" minutes old";
          }
        }
        else{
          let currTimeMins = currtime[3]*60+currtime[4];
          let dcMins = dc[3]*60+dc[4];
          let diffmins = currTimeMins-dcMins;
          let diffhrs = Math.floor(diffmins/60);
          if(diffhrs>1)
          {
            return diffhrs+" hours old";
          }
          else if(diffmins>0)
            return diffmins+" minutes old";
        }
      }
      if(timediff==1)
      {
        return timediff+units[i]+" old";
      }
      else if(timediff>1)
        return timediff+units[i]+"s old";
    }
    return "Just now";
}

/*function strigifyDate(d) 
{
  var ds = d[2]+"/"+d[1]+"/"+d[0]+" @ "+d[3]+":"+d[4]+":"+d[5];
  return dcm;
}*/
const TodoList = ({navigation}) => {
  
  const dispatch = useDispatch();

  const deleteCurrent = (key) => {
    Alert.alert(
      "Delete Task",
      "Proceed?",
      [
        {
          text: "No, Go Back",
          style: "cancel"
        },
        { text: "Yes", onPress: () => dispatch(deleteTodo(key)) }
      ]
    );
  }
  const isTimeLeft = (deadline)=>{
    var currtime = currDate();
    for(var i=0;i<7;i++)
    {
      var timediff=0;
      timediff=deadline[i]-currtime[i];
      if(timediff<0)
        return 'red';
      else if(timediff>0)
        return 'green';
    }
    return 'green';
  }
  const timeLeft =(deadline)=>{
    var currtime = currDate();
    var units = [" year"," month"," day"];
    var timediff=0;
    for(var i=0;i<3;i++)
    {
      timediff=deadline[i]-currtime[i];
      if(i==2)
      {
        if(timediff>1)
        {
          return timediff+units[i]+"s left";
        }
        else if(timediff<-1)
        {
          return ((-1)*timediff)+units[i]+"s past";
        }
        else if(timediff==1||timediff==-1)
        {
          let currTimeMins = currtime[3]*60+currtime[4];
          let deadlineMins = deadline[3]*60+deadline[4];
          let diffmins = deadlineMins+24*60-currTimeMins;
          if(timediff==-1&&diffmins>24*60)
          {
            return ((-1)*timediff)+units[i]+" past";
          }
          else if(timediff==1&&diffmins>24*60)
          {
            return (timediff)+units[i]+" left";
          }
          else if(diffmins<24*60 &&timediff==-1)
          {
            let diffhrs = Math.floor(diffmins/60);
            if(diffhrs>1)
            {
              return diffhrs+" hours past";
            }
            else
              return diffmins+" minutes past";
          }
          else if(diffmins<24*60 &&timediff==1)
          {
            let diffhrs = Math.floor(diffmins/60);
            if(diffhrs>1)
            {
              return diffhrs+" hours left";
            }
            else
              return diffmins+" minutes left";
          }
        }
        else{
          let currTimeMins = currtime[3]*60+currtime[4];
          let deadlineMins = deadline[3]*60+deadline[4];
          let diffmins = deadlineMins-currTimeMins;
          let diffhrs = Math.floor(diffmins/60);
          if(diffmins<0)
          {
            if(diffhrs<-1)
            {
              return (-1)*diffhrs+" hours past";
            }
            else if(diffmins<0)
              return (-1)*diffmins+" minutes past";
          }
          else{
            if(diffhrs>1)
            {
              return diffhrs+" hours left";
            }
            else if(diffmins>0)
              return diffmins+" minutes left";
          }
        }
      }
      if(timediff<0)
      {
        if(timediff==-1)
        {
          return ((-1)*timediff)+units[i]+" past";
        }
        else
          return ((-1)*timediff)+units[i]+"s past";
      }
      else
      {
        if(timediff==1)
        {
          return timediff+units[i]+" left";
        }
        else if(timediff>1)
          return timediff+units[i]+"s left";
      }
    }
    return "It's time";
  }
  const moveUpCurrent = (index)=>{
    dispatch(moveUp(index));
  }
  const moveDownCurrent = (index)=>{
    dispatch(moveDown(index));
  }
  const toggleCurrent=(key) => dispatch(toggleTodo(key));

  const todos = useSelector(state => state.todoReducer.todoList);
  const [dummyVar, setDummyVar] = useState(true);
  const [searchKey, setSearchKey] = useState('');

  const keyFound=(item)=>{
    let itemName = item.name.toUpperCase();
    let searchItem = searchKey.toUpperCase();
    if(itemName.includes(searchItem))
    {
      //console.log('found');
      return 'flex';
    }
    else{
      //console.log('not found');
      return 'none';
    }
    
  }

  const renderItem = ({item,index }) => {
    //console.log(item);
    return (
        <View style={[styles.listContainer,{display:keyFound(item)}]}>
        <View style={{display:'flex',flexDirection:'row'}}>
          <TouchableOpacity style={[styles.doneIcon,{backgroundColor:item.doneState?"rgb(100,100,100)":"white"}]} onPress={()=>{toggleCurrent(item.key);setDummyVar(!dummyVar)}}>
            { 
              item.doneState?
              <Icon name="check-circle-o" color = "rgb(141,255,15)" size = {25}/>
              :
              <IconM name="radio-button-off" color = "rgb(200,200,200)" size = {25}/>
            }
          </TouchableOpacity>
          <View style={[styles.listTextBox,item.doneState===false?null:styles.doneBox]}>
            <TouchableOpacity onPress={
              ()=>navigation.navigate('TodoEdit',{index:index,name:item.name,hasDeadline:item.hasDeadline,deadline:item.deadline})
            }>
              <Text style={[styles.listText,!item.doneState?null:styles.doneText]}>{item.name}</Text>
              <View style={styles.dateMessage}>
                <Text style={[{color:'gray',marginRight:5},!item.doneState?null:styles.doneText]}>
                  {elapsedTime([...item.dateCreated])}
                </Text>
                <Icon name="circle" color="gray" size={8}/>
                { item.hasDeadline&&!item.doneState?
                  <Text style={{color:isTimeLeft(item.deadline),marginLeft:5}}>
                    {timeLeft([...item.deadline])}
                  </Text>:null
                }
              </View>
              
            </TouchableOpacity>
          </View>
          <View style={styles.actionOpacity}>
            <TouchableOpacity onPress={()=>{moveUpCurrent(index);setDummyVar(!dummyVar)}}
              style={[styles.moveOpacity,styles.moveUp]}>
                <Icon name="angle-up" color = "black" size = {15}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>deleteCurrent(item.key)}
              style={styles.deleteOpacity}>
                <Icon name="trash" color = "white" size = {19}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{moveDownCurrent(index);setDummyVar(!dummyVar)}}
              style={[styles.moveOpacity,styles.moveDown]}>
                <Icon name="angle-down" color = "black" size = {15}/>
            </TouchableOpacity>
          </View>
        </View>
      </View> 
    );
  };
  
  var len = todos.length;
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
      </View>
      {todos.length>0?
        <FlatList style={styles.listContainer} contentContainerStyle={styles.containerStyle}
        data={todos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        extraData={dummyVar,len}
      />:<Text style={styles.emptyMessage}>
        🔥Create a task🔥
      </Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar:{
    position:'absolute',
    height:50
  },
  listBackGround:{
    backgroundColor: '#212121',
    flex:1,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
  },
  emptyMessage:{
    marginTop:50,
    backgroundColor: 'rgb(80,80,100)',
    padding:10,
    borderRadius:5,
    color:'white'
  },
  listContainer: {
    backgroundColor: '#212121',
    paddingVertical: 5,
    paddingHorizontal:3,
    display:'flex',
    width:'100%'
    /*justifyContent:'center',
    alignItems:'center'*/
  },
  containerStyle:{
    display:'flex',
    flexDirection:'column', 
    justifyContent:'center',
    alignContent:'center'
  },
  doneIcon:{
    borderTopLeftRadius:6,
    borderBottomLeftRadius:6,
    flex:1,
    backgroundColor:'white',
    paddingLeft:5,
    paddingRight:0,
    alignItems:'center',
    justifyContent:'center'
  },
  listTextBox:{
    flex:7,
    backgroundColor:'white',
    paddingVertical:0,
    paddingRight:5,
    justifyContent:'center'
  },
  doneBox:{
    backgroundColor:'rgb(100,100,100)',
    color:'rgb(250,250,250)'
  },
  doneText:{
    textDecorationLine:'line-through',
    color:'rgb(250,250,250)'
  },
  listText: {
    fontSize: 18,
    flex:1,
    color:'black'
  },
  dateMessage: {
    fontSize: 15,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    flex:1,
  },
  deleteOpacity:{
    backgroundColor:'rgb(242,87,95)',
    //borderTopRightRadius:6,
    //borderBottomRightRadius:6,
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    padding:5
  },
  moveOpacity:{
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    borderColor:'lightgray',
    borderWidth:1,
    padding:5
  },
  moveUp:{
    borderTopRightRadius:6,
    borderBottomColor:'white'
  },
  moveUpInactive:{
    borderTopRightRadius:6,
    borderBottomColor:'white'
  },
  moveDown:{
    borderTopColor:'white',
    borderBottomRightRadius:6,
  },
  moveDownInactive:{
    borderTopRightRadius:6,
    borderBottomColor:'white'
  },
  actionOpacity:{
    borderTopRightRadius:6,
    borderBottomRightRadius:6,
    //alignItems:'center',
    justifyContent:'center',
    flex:1,
    display:'flex',
    flexDirection:'column',
  }
});

export default TodoList;