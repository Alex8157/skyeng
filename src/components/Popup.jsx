import React from "react";
import styles from "../styles/popup.module.css";

const Popup = ({ user, close }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.inner}>
        <img
          src="https://cdn.icon-icons.com/icons2/1769/PNG/512/4115230-cancel-close-cross-delete_114048.png"
          className={styles.close}
          onClick={() => close(user)}
        />
        <img className={styles.avatar} src={user.avatar_url} alt="avatar" />
        <span className={styles.login}>login: {user.login}</span>
        <span className={styles.id}>id: {user.id}</span>
        <span className={styles.url}>url: {user.url}</span>
      </div>
    </div>
  );
};

export default Popup;
