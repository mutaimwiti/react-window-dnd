import { useDrop } from "react-dnd";
import React, { useState } from "react";
import update from "immutability-helper";
import { FixedSizeGrid } from "react-window";

import Item from "./Item";
import { ITEMS, ItemTypes } from "../utils";

const columnCount = 3;
const rowCount = Math.ceil(ITEMS.length / columnCount);

const Grid = () => {
  const [items, setItems] = useState(ITEMS);
  const [, drop] = useDrop({ accept: ItemTypes.ITEM });

  const moveItem = (id, atIndex) => {
    const { item, index } = findItem(id);
    setItems(
      update(items, {
        $splice: [
          [index, 1],
          [atIndex, 0, item]
        ]
      })
    );
  };

  const findItem = (id) => {
    const item = items.filter((c) => `${c.id}` === id)[0];
    return {
      item,
      index: items.indexOf(item)
    };
  };

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const dataIndex = rowIndex * columnCount + columnIndex;

    if (dataIndex >= items.length) return null;

    const item = items[dataIndex];

    return (
      <div key={dataIndex} style={style} className="post">
        <Item
          key={item.id}
          id={`${item.id}`}
          text={item.text}
          moveItem={moveItem}
          findItem={findItem}
        />
      </div>
    );
  };

  return (
    <div ref={drop} style={{ border: "2px solid red", padding: "5px" }}>
      <FixedSizeGrid
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={150}
        rowHeight={60}
        height={290}
        width={700}
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  );
};

export default Grid;
