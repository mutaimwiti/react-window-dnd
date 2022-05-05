import React from "react";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";

import { ItemTypes } from "./ItemTypes";

const Wrapper = styled.div`
  border: 1px dashed gray;
  padding: 0.5rem 1rem;
  margin: 5px;
  margin-bottom: 0.5rem;
  background-color: white;
  cursor: move;
  opacity: ${(props) => (props.isDragging ? 0 : 1)};
`;

const Item = ({ id, text, moveItem, findItem }) => {
  const originalIndex = findItem(id).index;

  const [, drag] = useDrag({
    item: { type: ItemTypes.ITEM, id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveItem(droppedId, originalIndex);
      }
    }
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findItem(id);
        moveItem(draggedId, overIndex);
      }
    }
  });

  return <Wrapper ref={(node) => drag(drop(node))}>{text}</Wrapper>;
};

export default Item;
