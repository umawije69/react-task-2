import { useMutation, MutationFunction, queryCache } from "react-query";

const toggleTodo: MutationFunction<void, string> = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let todos = localStorage.getItem("todos");

      if (todos) {
        let parsedTodos: any[] = JSON.parse(todos);
        parsedTodos = parsedTodos.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              completed: !item.completed,
            };
          } else {
            return item;
          }
        });
        localStorage.setItem("todos", JSON.stringify(parsedTodos));
        resolve();
      }
    }, 1000);
  });
};

export const useToggleTodo = () => {
  return useMutation(toggleTodo, {
    onSuccess: () => {
      queryCache.refetchQueries("todos");
    },
  });
};
