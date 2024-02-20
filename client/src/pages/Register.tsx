import React, { useState, ChangeEvent } from "react";
import { RegisterDiv } from "styles/RegisterCss";
import Form from "react-bootstrap/Form";
import AButton from "components/AButton";
import axios from "axios";

interface RegisterType {
  userName: string;
  userId: string;
  passWord: string;
}

function Register() {
  const [register, setRegister] = useState<RegisterType>({
    userName: "",
    userId: "",
    passWord: "",
  });

  const { userName, userId, passWord } = register;

  const onChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  return (
    <RegisterDiv>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            name="userName"
            type="text"
            onChange={onChangeRegister}
            value={userName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>UserId</Form.Label>
          <Form.Control
            name="userId"
            type="text"
            onChange={onChangeRegister}
            value={userId}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="passWord"
            type="text"
            onChange={onChangeRegister}
            value={passWord}
          />
        </Form.Group>
        <AButton type="warning">button1</AButton>
        <AButton type="dark">button2</AButton>
      </Form>
    </RegisterDiv>
  );
}

export default Register;
