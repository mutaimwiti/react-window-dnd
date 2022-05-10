import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import List from "./components/List";
import Grid from "./components/Grid";

export default function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <List />
        <Grid />
      </DndProvider>
    </div>
  );
}
