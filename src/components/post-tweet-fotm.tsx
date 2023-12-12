import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.textarea`
  border: solid 2px white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttatchFileButton = styled.label``;
const AttatchFileInput = styled.input`
  display: none;
`;
const SubmitBtn = styled.input``;

export default function PostTweetForm() {
  return (
    <Form>
      <TextArea placeholder="What is happening?" />
      <AttatchFileButton htmlFor="file">Add Photo</AttatchFileButton>
      <AttatchFileInput type="file" id="file" accept="image/*" />
      <SubmitBtn type="submit" value="Post Tweet" />
    </Form>
  );
}
