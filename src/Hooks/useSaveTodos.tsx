import { useMutation, MutationFunction, queryCache } from "react-query";
import { v4 as uuidv4 } from "uuid";

const saveTodos: MutationFunction<
  {
    id: string;
    todo: string;
    completed: boolean;
  },
  {
    todo: string;
    completed: boolean;
  }
> = ({ todo, completed }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let todos = localStorage.getItem("todos");
      let todoObject = {
        id: uuidv4(),
        todo,
        completed
      };
      if (todos) {
        let parsedTodos: any[] = JSON.parse(todos);
        parsedTodos.push(todoObject);
        localStorage.setItem("todos", JSON.stringify(parsedTodos));
        resolve(todoObject);
      } else {
        let todos = [];
        todos.push(todoObject);
        localStorage.setItem("todos", JSON.stringify(todos));
        resolve(todoObject);
      }
    }, 1000);
  });
};

export const useSaveTodos = () => {
  return useMutation(saveTodos, {
    onSuccess: () => {
      queryCache.refetchQueries("todos");
    }
  });
};
