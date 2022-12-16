import { useState } from "react";
import { toast } from "react-toastify";

export const useArray = (initList, url) => {
  const [list, setList] = useState(initList);
  const [isLoading, setIsLoading] = useState(false);

  const getFetchTodo = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const loading = [];
      for (const key in data) {
        loading.push({
          id: key,
          text: data[key].text,
        });
      }
      setList(loading);
    } catch (error) {
      toast.error(error.messege);
    }
  };

  const addItem = async (newItem) => {
    setIsLoading(true);
    // setList((prevState) => [...prevState, newItem]);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
    } catch (error) {
      toast.error(error.messege);
    }
    getFetchTodo();
    setIsLoading(false);
  };
  const removeItem = async (todoId) => {
    setIsLoading(true);
    try {
      await fetch(
        `https://custom-fetch-default-rtdb.firebaseio.com/todo/${todoId}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      toast.error(error.messege);
    }
    getFetchTodo();
    setIsLoading(false);
  };

  return {
    getFetchTodo,
    list,
    addItem,
    removeItem,
    isLoading,
  };
};
