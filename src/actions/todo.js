import { ADD_TODO, DELETE_TODO,UPDATE_TODO,TOGGLE_TODO,MOVE_UP,MOVE_DOWN } from './todoTypes';

export const addTodo = (todo,hasDeadline,deadline) => (
  {
    type: ADD_TODO,
    data: todo,
    hasDeadline:hasDeadline,
    deadline:deadline
  }
);

export const updateTodo = (index,todo,hasDeadline,deadline) => (
  {
    type: UPDATE_TODO,
    index:index,
    data: todo,
    hasDeadline:hasDeadline,
    deadline:deadline
  }
);

export const deleteTodo = (key) => (
  {
    type: DELETE_TODO,
    key: key
  }
);
export const toggleTodo = (key) => (
    {
      type: TOGGLE_TODO,
      key: key
    }
  );
export const moveUp = (index) => (
  {
    type: MOVE_UP,
    index: index
  }
);
export const moveDown = (index) => (
  {
    type: MOVE_DOWN,
    index: index
  }
);
