import React from "react";
import styles from "../styles/table.module.css";

const Table = ({ users, open }) => {
  return (
    <div className={styles.table}>
      {users.map((user) => {
        return (
          <div key={user.id} className={styles.row} onClick={() => open(user)}>
            <img className={styles.avatar} src={user.avatar_url} alt="avatar" />
            <div className={styles.login}>{user.login}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Table;
