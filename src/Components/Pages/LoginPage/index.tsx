import React, { FunctionComponent } from 'react'

import {LoginTemplate} from '../../Templates/LoginTemplate'
import {LoginForm} from '../../Organisms/LoginForm'
import {ModalComponent} from '../../Organisms/Modal'


export const LoginPage: FunctionComponent = ()=> <LoginTemplate LoginForm={LoginForm} ModalComponent={ModalComponent} />
