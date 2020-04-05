import React, { FunctionComponent, useState } from "react";

import { LoginFormProps } from "../../Organisms/LoginForm";
import { ModalProps } from "../../Organisms/Modal";

interface LoginTemplateProps {
  LoginForm: FunctionComponent<LoginFormProps>;
  ModalComponent: FunctionComponent<ModalProps>;
}

export const LoginTemplate: FunctionComponent<LoginTemplateProps> = ({
  LoginForm,
  ModalComponent
}) => {
  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <div className="flex flex-col items-center h-screen px-32">
      <LoginForm showModal={showModal} />
      <ModalComponent visible={visible} handleCancel={handleCancel} />
    </div>
  );
};
