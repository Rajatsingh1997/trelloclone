import React from "react";
import { Droppable } from "react-beautiful-dnd";
import InputContainer from "../Input";
import CardComp from "./card";

const MyList = ({ list, index }) => {
  return (
    <div className="w-1/4 rounded overflow-hidden shadow-lg ml-4 my-5 bg-slate-200">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2"> {list.title}</div>
        <Droppable droppableId={list.id.toString()}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mt-4"
            >
              {list.cards.map((card, index) => (
                <CardComp key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <InputContainer listId={list.id} type={"card"} />
      </div>
    </div>
  );
};

export default MyList;
