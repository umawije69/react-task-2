import React, { FunctionComponent, useState } from 'react'

import styled from 'styled-components'
import { LoginFormProps } from '../../Organisms/LoginForm'
import { ModalProps } from '../../Organisms/Modal'
import Title from 'antd/lib/typography/Title'

interface LoginTemplateProps {

    LoginForm: FunctionComponent<LoginFormProps>,
    ModalComponent: FunctionComponent<ModalProps>

}

const Wrapper = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

` 

export const LoginTemplate: FunctionComponent<LoginTemplateProps> = ({LoginForm, ModalComponent}) => {

    const [visible, setVisible] = useState(false)

    const handleCancel = ()=>{
        setVisible(false)
    }

    const showModal = ()=>{
        setVisible(true)
    }



    return (
    <Wrapper>
        <LoginForm  showModal={showModal} />
        <ModalComponent visible={visible} handleCancel={handleCancel} /> 
    </Wrapper>
    )
}