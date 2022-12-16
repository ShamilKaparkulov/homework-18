import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import { useArray } from "./components/helpers/useArray";
import Loader from "./components/Loader";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todo, setTodo] = useState("");
  const BASE_URL = "https://custom-fetch-default-rtdb.firebaseio.com/todo.json";

  const { list, addItem, removeItem, getFetchTodo, isLoading } = useArray(
    [{ text: "" }],
    BASE_URL
  );
  console.log(list, "asdf");

  const inputChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const addSubmitHandler = (e) => {
    e.preventDefault();
    if (todo.length > 0) {
      addItem({ text: todo });
      toast("Все все братан успешно  🥳🥳🥳");
      setTodo("");
    }
  };

  const removeItemHandler = (todoId) => {
    return () => {
      removeItem(todoId);
      getFetchTodo(todoId);
      toast("Успешно удалено !");
    };
  };
  useEffect(() => {
    getFetchTodo();
  }, []);
  return (
    <>
      {isLoading ? <Loader /> : ""}
      <div className="App">
        <form onSubmit={addSubmitHandler}>
          <input value={todo} onChange={inputChangeHandler} />
          <button>
            add Todo
            {/* <ToastContainer style={{ width: "10px", height: "10px" }} /> */}
          </button>
        </form>
        <div>
          <ul>
            {list?.map((item) => (
              <li key={item.id} style={{ listStyle: "none" }}>
                {item.text}
                <button onClick={removeItemHandler(item.id)}>delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;

// import React, { useEffect } from "react";
// import { useCallback } from "react";
// import { useState } from "react";
// import ListItem from "./ListItem";

// function AddTodo() {
//   const [value, setValue] = useState("");
//   const [todos, setTodos] = useState([]);

//   function onChangeHandler(e) {
//     setValue(e.target.value);
//   }

//   const postData = async () => {
//     if (value.length === 0) return;
//     try {
//       const response = await fetch(
//         "https://add-todo-d651d-default-rtdb.firebaseio.com/addtodo.json",
//         {
//           method: "POST",
//           body: JSON.stringify({ value: value, isChecked: false }),
//           headers: {
//             "Content-type": "application/json",
//           },
//         }
//       );
//       getData()
//       console.log(response);
//     } catch (error) {
//       // toasify
//     }

//   };

//   async function getData() {
//     try {
//       const response = await fetch(
//         "https://add-todo-d651d-default-rtdb.firebaseio.com/addtodo.json"
//       );
//       const data = await response.json();
//       const dataFromFireBase = [];

//       for (const key in data) {
//         dataFromFireBase.push({
//           id: key,
//           value: data[key].value,
//           isChecked: data[key].isChecked,
//         });
//       }
//       setTodos(dataFromFireBase);
//     } catch (error) {
//       // toasify
//     }
//   }

//   const deleteTask = async (келгенАйди) => {
//     console.log(келгенАйди);
//     try {
// const updatedTodos = await fetch(
//   https://add-todo-d651d-default-rtdb.firebaseio.com/addtodo/${келгенАйди}.json,
//   {
//     method: "DELETE",
//   }
//       );
//       console.log(updatedTodos);
//     } catch (error) {
//       // toastify
//     }
//     getData()
//   };

//   function onSubmitHandler(e) {
//     e.preventDefault();
//     postData();
//     setValue("");
//     console.log(todos);
//   }
//   useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <form onSubmit={onSubmitHandler}>
//       <input type="text" value={value} onChange={onChangeHandler} />
//       <button type="submit">Add Todo</button>
//       {todos.length === 0 ? (
//         <p>PUSTO</p>
//       ) : (
//         <ul>
//           {todos.map((item) => (
//             <ListItem key={item.id} {...item} onDelete={()=>deleteTask(item.id)} />
//           ))}
//       {/* {todos.map((item) => <li>{item.value} <button onClick={() => deleteTask(item.id)}>delete</button></li>)} */}
//         </ul>
//       )}
//     </form>
//   );
// }
