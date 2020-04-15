import { useMutation, MutationFunction, queryCache } from "react-query";

const deleteTodo: MutationFunction<void, string> = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let todos = localStorage.getItem("todos");

      if (todos) {
        let parsedTodos: any[] = JSON.parse(todos);
        parsedTodos = parsedTodos.filter((item) => item.id !== id);
        localStorage.setItem("todos", JSON.stringify(parsedTodos));
        resolve();
      }
    }, 1000);
  });
};

export const useDeleteTodo = () => {
  return useMutation(deleteTodo, {
    onSuccess: () => {
      queryCache.refetchQueries("todos");
    },
  });
};
