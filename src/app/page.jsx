"use client";

import { useEffect, useState } from "react";
import ToDoItems from "./components/ToDoItems";
import axios from "axios";
import { GrAdd } from "react-icons/gr";
import toast from "react-hot-toast";

export default function Home() {
  // state management
  const [item, setItem] = useState("");
  const [todo, setTodo] = useState([]);
  // console.log("item value : ",item)
  // console.log("todo items : ", todo);

  // funtion to get all todo items
  const getTodos = async () => {
    const response = await axios.get("/api/todo");
    // console.log("response : ",response)
    setTodo(response.data);
  };

  useEffect(() => {
    getTodos();
  }, [item]);

  //function to add TodoList
  const addTodo = async (e) => {
    e.preventDefault();

    if (item != "") {
      const response = await axios.post("api/todo", {
        todo: item,
      });

      setItem("");
      toast.success("Item added successfully!");
    } else {
      toast.error("Invalid todo , Please add something !");
    }
  };
  return (
    <main className="bg-white w-full flex justify-center p-2 sm:p-6">
      {/*todo wrapper */}
      <div className="md:w-1/2 flex gap-4 flex-col items-center py-6 px-2 sm:w-3/4 w-full bg-gray-100 border border-gray-400 rounded">
        <h1 className="text-2xl font-bold underline">To Do App</h1>

        {/* form */}
        <form
          onSubmit={addTodo}
          className="sm:w-[80%] w-[90%] bg-gray-300 rounded overflow-hidden"
        >
          <div className="w-full flex border border-gray-400 rounded">
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              type="text"
              placeholder="Enter here..."
              className="w-[80%] outline-none  px-2 py-4"
            />
            <button
              type="submit"
              className="w-[20%] border-l border-gray-400 flex justify-center items-center overflow-hidden"
            >
              <GrAdd className="text-3xl font-semibold text-green-600 hover:text-green-700" />
            </button>
          </div>
        </form>

        {/* items to show in todo list */}
        <div className="sm:w-[80%] w-[90%] flex flex-col">
          {todo.length == 0 ? (
            <span className="text-xl text-red-600 font-semibold text-center w-full">
              No todo items
            </span>
          ) : (
            <div>
              {todo.map((todo) => {
                return (
                  <ToDoItems key={todo._id} todo={todo.todo} id={todo._id} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
