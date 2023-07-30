import React from "react";
import styles from "../styles/app.module.css";
import { PostService } from "../API/PostService";
import Searcher from "./Searcher";
import Table from "./Table";
import Popup from "./Popup";

const App = () => {
  const [name, setName] = React.useState("");
  const [sort, setSort] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [openUser, setOpenUser] = React.useState("");
  const [more, setMore] = React.useState(false);
  const pageRef = React.useRef(1);

  React.useEffect(() => {
    if (!!name) startSearch();
  }, [name, sort]);

  const getData = () => {
    return PostService.getData({ name, page: pageRef.current, sort });
  };

  const startSearch = async () => {
    pageRef.current = 1;
    const data = await getData();
    setUsers(data.items);
    setMore(data.items.length === 30 ? true : false);
  };

  const loadMore = async () => {
    pageRef.current += 1;
    const data = await getData();
    setUsers((prev) => [...prev, ...data.items]);
    setMore(data.items.length === 30 ? true : false);
  };

  return (
    <div className={styles.app}>
      <Searcher
        changeName={(newName) => setName(newName)}
        changeSort={setSort}
      />
      <Table users={users} open={setOpenUser} />
      {openUser && <Popup user={openUser} close={() => setOpenUser("")} />}
      {!!more && (
        <div className={styles.more} onClick={loadMore}>
          Загрузить еще
        </div>
      )}
    </div>
  );
};

export default App;
