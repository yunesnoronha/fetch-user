import { useFetchUsersWithReducer } from "./fetchUsersWithReducer";
import "./styles.css";

export default function App() {
  const {
    users,
    currentUser,
    nextUser,
    previousUser
  } = useFetchUsersWithReducer();

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) =>
        user.first === currentUser.first ? (
          <b key={user.first + user.last}>{user.first + ` ` + user.last}</b>
        ) : (
          <p key={user.first + user.last}>{user.first + ` ` + user.last}</p>
        )
      )}
      <h2>Current User</h2>
      <div>
        <img src={currentUser.picture?.thumbnail} alt="avatar" />
        <p>{currentUser.first}</p>
        <button onClick={previousUser}>Previous</button>
        <button onClick={nextUser}>Next</button>
      </div>
    </div>
  );
}
