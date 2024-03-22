import React, { useState, ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterDiv, RegisterPred, RegisterPblue } from "styles/RegisterCss";
import { UseAxios } from "composables/Axios";
import { UseAlert } from "composables/Alert";
import Form from "react-bootstrap/Form";
import AButton from "components/AButton";

interface RegisterType {
  userName: string;
  userId: string;
  passWord: string;
  passWordCheck: string;
}

function Register() {
  const [samePwd, setSamePwd] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState("");
  const [isIdCheck, setIsIdCheck] = useState(false);
  const [register, setRegister] = useState<RegisterType>({
    userName: "",
    userId: "",
    passWord: "",
    passWordCheck: "",
  });
  const { userName, userId, passWord, passWordCheck } = register;

  const navigate = useNavigate();

  const nameInput = useRef<HTMLInputElement | null>(null);
  const idInput = useRef<HTMLInputElement | null>(null);
  const pwdInput = useRef<HTMLInputElement | null>(null);
  const pwdCheckInput = useRef<HTMLInputElement | null>(null);

  const onChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });

    if (name === "passWord" || name === "passWordCheck") {
      if (name === "passWord" && value === passWordCheck) {
        setSamePwd(true);
      } else if (name === "passWordCheck" && value === passWord) {
        setSamePwd(true);
      } else {
        setSamePwd(false);
      }
    }
  };

  const onIdAvaliable = async () => {
    let params = {
      userId,
    };

    let res = await UseAxios<void>("/api/users/find", "POST", params);

    if (res) {
      if (res.list.length > 0) {
        setIsIdAvailable(res.message);
        setIsIdCheck(true);
      }
    }
  };

  const onCreateAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userName === "") {
      UseAlert(true, "이름을 입력해주세요", "warning");
      if (nameInput.current) {
        nameInput.current.focus();
        return;
      }
    }
    if (userId === "") {
      UseAlert(true, "아이디를 입력해주세요", "warning");
      if (idInput.current) {
        idInput.current.focus();
        return;
      }
    }
    if (passWord === "") {
      UseAlert(true, "비밀번호를 입력해주세요", "warning");
      if (pwdInput.current) {
        pwdInput.current.focus();
        return;
      }
    }
    if (!samePwd) {
      UseAlert(true, "비밀번호를 확인해주세요", "warning");
      if (pwdCheckInput.current) {
        pwdCheckInput.current.focus();
        return;
      }
    }
    if (!isIdCheck) {
      UseAlert(true, "아이디 중복검사를 해주세요", "warning");
      return;
    }

    let params = {
      ...register,
    };

    let res = await UseAxios<void>("/api/users/insert", "POST", params);

    if (res.valid) {
      UseAlert(true, "회원가입이 완료되었습니다.", "success");
      navigate("/login");
    }
  };

  return (
    <RegisterDiv>
      <Form onSubmit={onCreateAuth}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>아이디</Form.Label>
          {isIdAvailable === "중복된 아이디입니다." ? (
            <RegisterPred>{isIdAvailable}</RegisterPred>
          ) : (
            <RegisterPblue>{isIdAvailable}</RegisterPblue>
          )}
          <Form.Control
            ref={idInput}
            name="userId"
            type="text"
            onChange={onChangeRegister}
            value={userId}
          />
        </Form.Group>
        <AButton onClick={onIdAvaliable} type="dark" btnType="button">
          중복검사
        </AButton>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>비밀번호</Form.Label>
          <RegisterPred>비밀번호는 20자 이내로 입력해주세요.</RegisterPred>
          <Form.Control
            ref={pwdInput}
            name="passWord"
            type="password"
            onChange={onChangeRegister}
            value={passWord}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>비밀번호 확인</Form.Label>
          {!samePwd ? (
            <RegisterPred>비밀번호가 일치하지 않습니다.</RegisterPred>
          ) : (
            <RegisterPblue>비밀번호가 일치 합니다.</RegisterPblue>
          )}
          <Form.Control
            ref={pwdCheckInput}
            name="passWordCheck"
            type="password"
            onChange={onChangeRegister}
            value={passWordCheck}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>이름</Form.Label>
          <Form.Control
            ref={nameInput}
            name="userName"
            type="text"
            onChange={onChangeRegister}
            value={userName}
          />
        </Form.Group>
        <AButton type="dark" btnType="submit">
          회원가입
        </AButton>
      </Form>
    </RegisterDiv>
  );
}

export default Register;
