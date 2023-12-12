import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-fotm";
import { auth } from "../firebase";

const Wrraper = styled.div``;
export default function Home() {
  // const logOut = () => {
  //   auth.signOut();
  //   console.log(auth.currentUser);
  // };
  return (
    <Wrraper>
      <PostTweetForm />
    </Wrraper>
  );
}
