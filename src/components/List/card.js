import React from "react";
import { Draggable } from "react-beautiful-dnd";

const CardComp = ({ card, index }) => {
  console.log(card, "-----000000")
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
    {(provided)=>(
      <div
      ref={provided.innerRef}
       {...provided.dragHandleProps}
       {...provided.draggableProps}
      
      >
      <div className="flex justify-center my-3">
        <div className="block p-3 rounded-lg shadow-lg bg-white max-w-sm w-full">
          <p className="text-gray-700 text-base mb-4">
          {card.title}
          </p> 
        </div>
      </div>
      </div>     
    )}
    {/* {provided.placeholder} */}
      </Draggable>
  );
};

export default CardComp;
