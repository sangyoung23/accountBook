import React, { useState, ChangeEvent } from "react";
import { RegisterDiv } from "styles/RegisterCss";
import { UseAxios } from "composables/Axios";
import Form from "react-bootstrap/Form";
import AButton from "components/AButton";

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

  const onCreateAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let params = {
      ...register,
    };

    let res = await UseAxios<void>("/api/users/insert", "POST", params);

    if (res.valid) {
      // alert창 띄우기
      // login 페이지로 이동
    } else {
      // 중복된 id인지 등등 유효성 검사 실패시 처리
    }
  };

  return (
    <RegisterDiv>
      <Form onSubmit={onCreateAuth}>
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
            type="password"
            onChange={onChangeRegister}
            value={passWord}
          />
        </Form.Group>
        <AButton type="dark" btnType="submit">
          Submit
        </AButton>
      </Form>
    </RegisterDiv>
  );
}

export default Register;
