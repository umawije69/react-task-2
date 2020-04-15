import React, { useState, ChangeEventHandler, useEffect } from "react";
import { List, Spin, Form, Input, Button, Radio, Select, Tag } from "antd";

import { useTodos } from "../../../Hooks/useTodos";
import { QueryResult, useIsFetching } from "react-query";
import { useSaveTodos } from "../../../Hooks/useSaveTodos";
import { useClearTodos } from "../../../Hooks/useClearTodos";
import { RadioChangeEvent } from "antd/lib/radio";
import { useHistory, useLocation } from "react-router-dom";

import { strings } from "../../../Localization";
import { useToggleTodo } from "../../../Hooks/useToggleTodo";
import { useDeleteTodo } from "../../../Hooks/useDeleteTodo";

export const TodoList: React.FC<{ filter: "all" | "completed" | "active" }> = ({
  filter,
}) => {
  const [, setEmptyState] = useState();
  const [todo, setTodo] = useState<string>("");
  const [isTodoCompleted, setIsTodoCompleted] = useState<string>("false");
  const [filteredData, setFilteredData] = useState<
    {
      id: string;
      todo: string;
      completed: boolean;
    }[]
  >();

  const [saveTodos, { status: saveTodoStatus }] = useSaveTodos();
  const [clearTodos, { status: clearTodoStatus }] = useClearTodos();
  const [toggleTodo, { status: toggleTodoStatus }] = useToggleTodo();
  const [deleteTodo, { status: deleteTodoStatus }] = useDeleteTodo();

  const isFetching = useIsFetching();

  const history = useHistory();

  const location = useLocation();

  const {
    status,
    error,
    data,
  }: QueryResult<
    | {
        id: string;
        todo: string;
        completed: boolean;
      }[]
    | undefined
  > = useTodos();

  useEffect(() => {
    if (filter === "all") {
      setFilteredData(data);
    } else if (filter === "completed") {
      setFilteredData(data?.filter((item) => item.completed));
    } else if (filter === "active") {
      setFilteredData(data?.filter((item) => !item.completed));
    }
  }, [data, filter]);

  if (status === "error") {
    return <div>error- {error}</div>;
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodo(e.target.value);
  };

  const handleFinish = () => {
    let todoObject = {
      todo,
      completed: isTodoCompleted === "true" ? true : false,
    };
    saveTodos(todoObject);
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    history.push(e.target.value);
  };
  const handleLanguageChange = (e: RadioChangeEvent) => {
    strings.setLanguage(e.target.value);
    setEmptyState(strings.completed);
  };

  const handleToggle: (id: string) => void = (id) => {
    toggleTodo(id);
  };
  const handleDelete: (id: string) => void = (id) => {
    deleteTodo(id);
  };

  const buttonsDisabled =
    saveTodoStatus === "loading" ||
    clearTodoStatus === "loading" ||
    toggleTodoStatus === "loading" ||
    deleteTodoStatus === "loading" ||
    !!isFetching;

  return (
    <div>
      <div className="py-8">
        <div className="flex justify-center">
          <Radio.Group
            className="mx-4"
            defaultValue={location.pathname.slice(1)}
            buttonStyle="solid"
            onChange={handleRadioChange}
          >
            <Radio.Button value="active">{strings.active}</Radio.Button>
            <Radio.Button value="all">{strings.all}</Radio.Button>
            <Radio.Button value="completed">{strings.completed}</Radio.Button>
          </Radio.Group>
          <Radio.Group
            className="mx-4"
            defaultValue="en"
            buttonStyle="solid"
            onChange={handleLanguageChange}
          >
            <Radio.Button value="en">English</Radio.Button>
            <Radio.Button value="fr">French</Radio.Button>
            <Radio.Button value="de">German</Radio.Button>
          </Radio.Group>
        </div>
        <Spin tip="Loading..." spinning={buttonsDisabled} size="large">
          <List
            header={<h1 className="text-5xl">{strings.header}</h1>}
            pagination={{
              pageSize: 3,
            }}
            dataSource={filteredData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<div>{item.todo}</div>}
                  description={
                    <div>
                      {strings.completed} -{" "}
                      {item.completed ? (
                        <Tag color="#87d068">True</Tag>
                      ) : (
                        <Tag color="#f50">False</Tag>
                      )}
                    </div>
                  }
                />
                <Button
                  disabled={buttonsDisabled}
                  onClick={handleToggle.bind(null, item.id)}
                  type="link"
                >
                  {strings.toggle}
                </Button>
                <Button
                  disabled={buttonsDisabled}
                  onClick={handleDelete.bind(null, item.id)}
                  type="link"
                >
                  {strings.delete}
                </Button>
              </List.Item>
            )}
          ></List>
        </Spin>
      </div>
      <Form layout="inline" onFinish={handleFinish}>
        <Form.Item
          name="todos"
          rules={[{ required: true, message: strings.inputError }]}
        >
          <Input
            value={todo}
            onChange={handleInputChange}
            placeholder={strings.inputPlaceholder}
            addonAfter={
              <Select value={isTodoCompleted} onChange={setIsTodoCompleted}>
                <Select.Option value="true">True</Select.Option>
                <Select.Option value="false">False</Select.Option>
              </Select>
            }
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" disabled={buttonsDisabled}>
            {strings.addTodo}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => clearTodos("todos")}
            type="primary"
            disabled={buttonsDisabled}
          >
            {strings.clearTodos}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
