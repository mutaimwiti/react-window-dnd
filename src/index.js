import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import List from "./List";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <List />
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
