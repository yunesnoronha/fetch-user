import { useState, useEffect, useReducer } from "react";
import axios from "axios";

interface Picture {
  thumbnail: string;
}
interface User {
  first: string;
  last: string;
  picture?: Picture;
}

const ControllerPagination = (state: number, action: { type: string }) => {
  switch (action.type) {
    case "increment": {
      return state + 1;
    }
    case "decrement": {
      return state - 1;
    }
  }
  throw Error("Unknown action: " + action.type);
};

const nextUserIndex: number = 0;

export const useFetchUsersWithReducer = (): {
  users: User[];
  currentUser: User;
  nextUser: () => void;
  previousUser: () => void;
} => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({});

  const [state, dispatch] = useReducer(ControllerPagination, nextUserIndex);

  const fetchUsers = async () => {
    // try {
    await axios
      .get("https://randomuser.me/api/")
      .then(({ data }) => {
        const user: User = {
          ...data.results[0].name,
          picture: { ...data.results[0].picture }
        };
        setCurrentUser(user);
        setUsers([...users, user]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const nextUser = async () => {
    if (state === users.length - 1) {
      await fetchUsers();
    }
    dispatch({ type: "increment" });

    console.log("state", state);
  };

  const previousUser = () => {
    if (state > 0) {
      dispatch({ type: "decrement" });
      // setCurrentUser(users[nextUserIndex]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentUser(users[state] || currentUser);
  }, [state]);

  return {
    users,
    currentUser,
    nextUser,
    previousUser
  };
};
