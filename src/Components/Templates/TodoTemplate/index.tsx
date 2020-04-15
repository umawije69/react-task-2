import React, { FunctionComponent } from "react";

interface TodoTemplateProps {
  TodoList: FunctionComponent<{ filter: "all" | "completed" | "active" }>;
  filter: "all" | "completed" | "active";
}

export const TodoTemplate: FunctionComponent<TodoTemplateProps> = ({
  TodoList,
  filter,
}) => {
  return (
    <div className="flex flex-col h-screen justify-center px-16">
      <TodoList filter={filter} />
    </div>
  );
};
