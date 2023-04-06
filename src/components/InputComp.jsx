import { useState } from "react";
import './CSS/input.css'


const dates = () => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const today =`${month+1}월${day}일`;
    return today

}

const InputComp = (props) =>{
    //전체 할일 state
    const [allTodo, setAllTodo] = useState([
    ]);

    //리스트 담는 기본 state
    const [toDoList, setTodoList] = useState([
        {id:1, do:'할일', day:`${4}월${5}일`}
    ]);

    let todolistId = toDoList.length + 1;

    
    //input 담는 state
    const [inputValues, setInputValue] = useState('');

    const inputValue = (e) =>{
        setInputValue(e.target.value);
    }
    //모든할일 호출
    const allTodoBtn = ()=>{
        setAllTodo(toDoList);
        setTodoList(allTodo);
    }
    //오늘할일 호출
    const selectBtn = () =>{
        const newState = toDoList.filter((v)=>(
            v.day === dates()
        ))
        setTodoList(newState);
    }


    //<li>안에 들어갈 함수
    const addInputValue = () =>{
        const newState = toDoList.concat(
            {id: todolistId+1, do: inputValues, day:dates(), checked:false}
        )
        setTodoList(newState);
        setAllTodo(newState);
        setInputValue('');
    }
    //삭제
    const deleteValue = (val)=>{
        const newState = toDoList.filter(
            (v)=>(v.id !==  val.id)
        )
        setTodoList(newState);
        setAllTodo(newState);
    }
    //check박스
    const checkVal =(vars) =>{
        const newState = toDoList.map(
            (v)=>{
                if(v.id !== vars.id){
                    return v
                }
                else{
                    return {...v, checked: !v.checked}
                }
            }
        )
        setTodoList(newState);
        setAllTodo(newState);
    }


    return(
        <div>
            <h1>Todo-List</h1>
            <div className="inputBox">
                <input type="text"
                value={inputValues}
                onChange={inputValue}
                ></input>
                <button onClick={addInputValue}>추가</button>
            </div>
                <hr/>
            <div className="Todo">
                    <p>
                        <button onClick={allTodoBtn}>모든할일</button>
                        <button onClick={selectBtn}>오늘할일</button>
                    </p>
                <ul>
                    {toDoList.map((val)=>(
                        <div>
                            <h3 className="day">{val.day}</h3>
                            <li key={val.id}>
                                <input className="checkbox" type="checkbox"
                                defaultChecked={val.checked}
                                onClick={()=>{checkVal(val)}}
                                ></input>
                                <span 
                                className={val.checked? "on":''}
                                >{val.do}</span>
                                <button onClick={()=>{deleteValue(val)}}>X</button>
                            </li>
                        </div>
                    ))}        
                </ul>
            </div>
        </div>
    )
}

export default InputComp;
