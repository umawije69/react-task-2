import React from "react";

import { TodoTemplate } from "../../Templates/TodoTemplate";
import { TodoList } from "../../Organisms/TodoList";

export const TodoPage: React.FC<{ filter: "all" | "completed" | "active" }> = ({
  filter,
}) => <TodoTemplate TodoList={TodoList} filter={filter} />;
