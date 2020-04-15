import { useQuery, QueryFunction } from "react-query";

const getTodos: QueryFunction<
  | {
      id: string;
      todo: string;
      completed: boolean;
    }[]
  | undefined,
  ["todos"]
> = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let todos: string | null | undefined = localStorage.getItem("todos");
      if (todos) {
        resolve(JSON.parse(todos));
      } else {
        todos = undefined;
        resolve(todos);
      }
    }, 1000);
  });
};

export const useTodos = () => {
  return useQuery("todos", getTodos);
};
