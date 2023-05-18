import { ADD_TODO, DELETE_TODO, UPDATE_TODO,TOGGLE_TODO,MOVE_UP,MOVE_DOWN } from '../actions/todoTypes';
import { dateToString, moveDown, moveUp, newTaskList, toggleDone } from '../utils/auxilliary';
import { actionType, todo } from '../utils/global-interfaces';

const initialState = {
  todoList: []
}

const todoReducer = (state = initialState, action:actionType) => {

  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: (state.todoList as todo[]).concat({
          key: Math.random(),
          name: action.data,
          doneState: false,
          // dateCreated:new Date(),
          dateCreated:dateToString(new Date()),
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
        todoList: state.todoList.filter((item:todo) => item.key !== action.key)
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