import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Form, Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";

const errors = {
  "auth/email-already-in-use": "That email already exist.",
  "auth/weak-password": "Password should be at least 6 characters.",
};

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
      <GithubButton />
    </Wrapper>
  );
}
