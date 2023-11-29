import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser; //firebase에 유저정보 확인
  if (!user) {
    return <Navigate to="/login" />; //firebase에 유저정보가 없다면 로그인 페이지로
  }
  return children;
}
