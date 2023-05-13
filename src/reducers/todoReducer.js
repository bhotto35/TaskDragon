import { ADD_TODO, DELETE_TODO, UPDATE_TODO,TOGGLE_TODO,MOVE_UP,MOVE_DOWN } from '../actions/todoTypes';

const initialState = {
  todoList: []
}

const todoReducer = (state = initialState, action) => {

  const currDate=()=>{
    var d=new Date();
    var date= [parseInt(d.getFullYear())];
    date.push(parseInt(d.getMonth())+1);
    date.push(parseInt(d.getDate()));
    date.push(parseInt(d.getHours()));
    date.push(parseInt(d.getMinutes()));
    date.push(parseInt(d.getSeconds()));
    return date;
  }  
  const toggleDone=(list,key)=>{
      const index=list.findIndex(item=>item.key===key)
      list[index].doneState=!list[index].doneState;
      return list;
  }
  const moveUp=(list,index)=>{
    if(index==0)
		{
			temp=list[0];
			list.splice(0,1);
			list.push(temp);
			return list
		}
		temp=list[index];
		list.splice(index,1);
		list.splice(index-1,0,temp);
    return list;
  }

  const newTaskList=(action,todoList)=>{
    //console.log("todoList: before");
    //todoList.forEach((item,index)=>console.log(item));
    todoList[action.index].name=action.data;
    todoList[action.index].hasDeadline=action.hasDeadline;
    todoList[action.index].deadline = action.deadline;
    //console.log("todoList: after");
    //todoList.forEach((item,index)=>console.log(item));
    return todoList;
  }

  const moveDown=(list,index)=>{
    if(index==list.length-1)
		{
			temp=list[index];
			list.splice(index,1);
			list.splice(0,0,temp);
			return list
		}
		temp=list[index];
		list.splice(index,1);
		list.splice(index+1,0,temp);
    return list;
  }
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: state.todoList.concat({
          key: Math.random(),
          name: action.data,
          doneState: false,
          dateCreated:currDate(),
          hasDeadline:action.hasDeadline,
          deadline:action.deadline
        })
      };
    case UPDATE_TODO:
      return {
        ...state,
        todoList: newTaskList(action,[...state.todoList])
      };
    case DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.key !== action.key)
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todoList: toggleDone(state.todoList,action.key)
      };
    case MOVE_UP:
      return {
        ...state,
        todoList: moveUp(state.todoList,action.index)
      };
    case MOVE_DOWN:
      return {
        ...state,
        todoList: moveDown(state.todoList,action.index)
      };
    default:
      return state;
  }
}

export default todoReducer;