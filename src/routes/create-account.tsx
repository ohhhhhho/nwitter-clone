import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const errors = {
  "auth/email-already-in-use": "That email already exist.",
  "auth/weak-password": "Password should be at least 6 characters.",
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;
const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #fff;
  }
`;

export default function CreateAccout() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, SetError] = useState("");
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    SetError("");
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    SetError(""); //버튼 눌렀을때 에러 메세지 초기화
    if (isLoading || name === "" || email === "" || password === "") return; //빈값일때 함수를 종료시킴
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e) {
      //setError
      if (e instanceof FirebaseError) {
        console.log(e.code, e.message);
        if (e.message.includes("auth/email-already-in-use")) {
          SetError(errors["auth/email-already-in-use"]);
        } else if (e.message.includes("auth/weak-password")) {
          SetError(errors["auth/weak-password"]);
        } else {
          SetError("error");
        }
      }
    } finally {
      setLoading(false);
    }
    // console.log(name, email, password);
  };
  return (
    <Wrapper>
      <Title>Join X</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          value={name}
          placeholder="name"
          type="text"
          required
          onChange={onchange}
        ></Input>
        <Input
          name="email"
          value={email}
          placeholder="email"
          type="email"
          required
          onChange={onchange}
        ></Input>
        <Input
          name="password"
          value={password}
          placeholder="password"
          type="password"
          required
          onChange={onchange}
        ></Input>
        <Input
          type="submit"
          value={isLoading ? "Loding..." : "Create Account"}
        ></Input>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account?
        <Link to="/login">Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
