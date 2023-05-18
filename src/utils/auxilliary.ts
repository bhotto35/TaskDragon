import { actionType, todo } from "./global-interfaces";

export const toggleDone=(list:todo[],key:number)=>{
    const index=list.findIndex(item=>item.key===key)
    list[index].doneState=!list[index].doneState;
    return list;
}
export const moveUp=(list:todo[],index:number)=>{
  if(index==0)
      {
          let temp=list[0];
          list.splice(0,1);
          list.push(temp);
          return list
      }
      let temp=list[index];
      list.splice(index,1);
      list.splice(index-1,0,temp);
  return list;
}

export const newTaskList=(action:actionType,todoList:todo[])=>{
  //console.log("todoList: before");
  //todoList.forEach((item,index)=>console.log(item));
  todoList[action.index].name=action.data;
  todoList[action.index].hasDeadline=action.hasDeadline;
  todoList[action.index].deadline = action.deadline;
  
  //console.log("todoList: after");
  //todoList.forEach((item,index)=>console.log(item));
  return todoList;
}

export const moveDown=(list:todo[],index:number)=>{
  if(index==list.length-1)
      {
          let temp=list[index];
          list.splice(index,1);
          list.splice(0,0,temp);
          return list
      }
      let temp=list[index];
      list.splice(index,1);
      list.splice(index+1,0,temp);
  return list;
}
export const getDeadline=(deadTime:Date,deadDate:Date)=>{

    let as_array = [deadDate.getFullYear()]
    as_array.push(deadDate.getMonth()+1);
    as_array.push(deadDate.getDate());
    as_array.push(deadTime.getHours());
    as_array.push(deadTime.getMinutes());
    as_array.push(deadTime.getSeconds());

    let date1 = `${as_array[0]}-${as_array[1]}-${as_array[2]}`
    let time1 = `${as_array[3]}:${as_array[4]}:${as_array[5]}`
    let final_date = new Date(`${date1} ${time1}`)
    return final_date
  }

  export const dateToString = (date:Date)=>{
    let as_array = [date.getFullYear()]
    as_array.push(date.getMonth()+1);
    as_array.push(date.getDate());
    as_array.push(date.getHours());
    as_array.push(date.getMinutes());
    as_array.push(date.getSeconds());

    let date1 = `${as_array[0]}-${as_array[1]}-${as_array[2]}`
    let time1 = `${as_array[3]}:${as_array[4]}:${as_array[5]}`
    let final_date = `${date1} ${time1}`
    return final_date
  }