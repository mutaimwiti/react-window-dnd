import { useDrop } from "react-dnd";
import React, { useState } from "react";
import update from "immutability-helper";
import { FixedSizeList } from "react-window";

import Item from "./Item";
import { ITEMS, ItemTypes } from "../utils";

const List = () => {
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

  const Row = ({ index, style }) => {
    const item = items[index];

    return (
      <div key={index} style={style} className="post">
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
      <FixedSizeList
        itemCount={items.length}
        itemSize={50}
        height={290}
        width={250}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default List;
