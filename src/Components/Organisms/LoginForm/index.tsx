import React, { FunctionComponent } from "react";

import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export interface LoginFormProps {
  showModal: () => void;
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ showModal }) => {
  return (
    <div className="block my-auto w-2/3 lg:w-1/3">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <span className="float-right text-blue-500 cursor-pointer hover:text-blue-300">
            Forgot password
          </span>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            onClick={showModal}
          >
            Log in
          </Button>
          <div>
            Or{" "}
            <span className="text-blue-500 cursor-pointer hover:text-blue-300">
              register now!
            </span>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
