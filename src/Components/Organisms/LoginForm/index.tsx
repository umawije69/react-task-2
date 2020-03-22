import React, { FunctionComponent } from 'react'

import { Form, Input, Button } from 'antd';

import styled from 'styled-components'
import Text from 'antd/lib/typography/Text';

const StyledForm = styled(Form)`

    button {
        width: 100%;
    }

    #password-reset-text {
        float: right;
        :hover {
            cursor: pointer;
        }
    }

`

const Wrapper = styled.div`
    width: 20rem;

`

const Logo = styled(Button)`

    height: 4rem;
    border-radius: 0.25rem;

`

export interface LoginFormProps {
    showModal: ()=>void
}


export const LoginForm: FunctionComponent<LoginFormProps> = ({showModal}) => {
    const onFinish = (values:any) => {
      console.log('Received values of form: ', values);
    };
  
    return (
    
        <Wrapper>
      <StyledForm
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="logo"
          wrapperCol={{span:8}}
        >
            <Logo type="primary" onClick={showModal} >
                <Text strong>LOGO</Text>
            </Logo>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button  type="primary" shape="round" htmlType="submit" >
          LOGIN
          </Button>
          <div id="password-reset-text" >
          <Text type="secondary" strong>Password reset</Text>
          </div>
        </Form.Item>
      </StyledForm>
      </Wrapper>
    );
  };