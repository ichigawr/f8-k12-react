import { useState } from "react";
import "./App.css";
import Header from "./layouts/Header";
import List from "./components/List";
import Grid from "./components/Grid";
import Button from "./components/Button";

function App() {
  const [listView, setListView] = useState(true);

  return (
    <>
      <Header />
      <Button listView={listView} handleClick={setListView} />
      {listView ? <List /> : <Grid />}
    </>
  );
}

export default App;
