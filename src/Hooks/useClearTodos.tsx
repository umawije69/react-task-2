import { useMutation, MutationFunction, queryCache } from "react-query";

const clearTodos: MutationFunction<void, string> = (storageItem) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(storageItem);
      resolve();
    }, 1000);
  });
};

export const useClearTodos = () => {
  return useMutation(clearTodos, {
    onSuccess: () => {
      queryCache.refetchQueries("todos");
    },
  });
};
