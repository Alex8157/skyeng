import React from "react";
import styles from "../styles/searcher.module.css";

const Searcher = ({ changeName, changeSort }) => {
  const [name, setName] = React.useState("");
  const [sort, setSort] = React.useState(true);

  React.useEffect(() => {
    changeSort(sort);
  }, [sort]);

  return (
    <div className={styles.searcher}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => changeName(name)}>Поиск</button>
      <div className={styles.sort}>
        Сортировать по:
        {sort ? (
          <span className={styles.sortText} onClick={() => setSort(false)}>
            убыванию количества репозиториев
          </span>
        ) : (
          <span className={styles.sortText} onClick={() => setSort(true)}>
            возрастанию количества репозиториев
          </span>
        )}
      </div>
    </div>
  );
};

export default Searcher;
