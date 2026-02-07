import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import DashFrame from "../../components/dashboard/DashFrame";
import DashPath from "../../components/dashboard/DashPath";
import DashCards from "../../components/books/DashCards";

function UserPosts() {
  const { data, loading } = useContext(UserContext);
  const userBooks = data.user.books;

  if (loading) return <p>...</p>;

  return (
    <DashFrame>
      <DashPath path="> Suas postagens" />
      <DashCards userBooks={userBooks}></DashCards>
    </DashFrame>
  );
}

export default UserPosts;
