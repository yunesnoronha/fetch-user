import { useState, useEffect } from "react";
import axios from "axios";

interface Picture {
  thumbnail: string;
}
interface User {
  first: string;
  last: string;
  picture?: Picture;
}

export const useFetchUsers = (): {
  users: User[];
  currentUser: User;
  nextUser: () => void;
  previousUser: () => void;
} => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({});
  const [nextUserIndex, setNextUserIndex] = useState(0);

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
    const handleIncreaseNextUser = (increment: number) => {
      setNextUserIndex((prevState) => {
        return prevState + increment;
      });
    };

    if (nextUserIndex === users.length - 1) {
      await fetchUsers();
    }
    handleIncreaseNextUser(1);
    // else {
    //   // setNextUserIndex(nextUserIndex + 1);
    //   handleIncreaseNextUser(1);

    //   setCurrentUser(users[nextUserIndex]);
    // }
  };

  const previousUser = () => {
    const handleDecreaseNextUser = (increment: number) => {
      setNextUserIndex((prevState) => {
        console.log(prevState);
        console.log("decremento", increment);
        return prevState - increment;
      });
    };
    if (nextUserIndex > 0) {
      handleDecreaseNextUser(1);
      // setCurrentUser(users[nextUserIndex]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setCurrentUser(users[nextUserIndex] || currentUser);
  }, [nextUserIndex]);

  return {
    users,
    currentUser,
    nextUser,
    previousUser
  };
};
