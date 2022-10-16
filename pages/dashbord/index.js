// import React, { useState } from "react";
// import MyList from "../../src/components/List/list";
// import { v4 as uuid } from "uuid";
// import NavigationBar from "../../src/components/navbar";
// import store from "../../src/utils/store";
// import storeApi from "../../src/utils/storeApi";
// import InputContainer from "../../src/components/Input";
// import { DragDropContext } from "react-beautiful-dnd";

// const DashBoard = () => {
//   const [data, setData] = useState(store);

//   const addMoreCard = (title, listId) => {
//     const newCardId = uuid();
//     const newCard = {
//       id: newCardId,
//       title,
//     };


//     const list = data.lists[listId];
//     list.cards = [...list.cards, newCard];

//     const newState = {
//       ...data,
//       lists: {
//         ...data.lists,
//         [listId]: list,
//       },
//     };
//     setData(newState);
//   };

//   const addMoreList = (title) => {
//     const newListId = uuid();
//     const newList = {
//       id: newListId,
//       title,
//       cards: [],
//     };
//     const newState = {
//       listIds: [...data.listIds, newListId],
//       lists: {
//         ...data.lists,
//         [newListId]: newList,
//       },
//     };
//     setData(newState);
//   };
//   const onDrageEnd = (result) => {
//     const { destination, source, dragggableId } = result;
//     if (!destination) {
//       return;
//     }
//     const sourceList = data.lists[source.droppableId];
//     const destinationList = data.lists[destination.droppableId];
//     const draggingCard = source.cards.filter(
//       (card) => card.is === dragggableId
//     )[0];
//     if (source.droppableId === destination.droppableId) {
//       sourceList.cards.splice(source.index, 1);
//       destinationList.cards.splice(destination.index, 0, card);
//       const newState = {
//         ...data,
//         lists: {
//           ...data.lists,
//           [source.id]: destination,
//         },
//       };
//       setData(newState);
//     }
//   };
//   return (
//     <div>
//       <NavigationBar />
//       <storeApi.Provider value={{ addMoreCard, addMoreList }}>
//           <div className="flex w-full">
//             <DragDropContext onDragEnd={onDrageEnd}>
//               {data.listIds.map((listId, index) => {
//                 const list = data.lists[listId];
//                 return <MyList list={list} key={listId} index={index} />;
//               })}
//               <div className="my-5 w-1/4">
//                 <InputContainer type={"list"} />
//               </div>
//             </DragDropContext>
//           </div>
//       </storeApi.Provider>
//     </div>
//   );
// };

// export default DashBoard;



import Layout from "../../src/components/Layout";
import {
  DotsVerticalIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import CardItem from "../../src/components/CardItem";
import BoardData from "../../src/data/bord-data.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

function createGuidId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);

  useEffect(() => {
    if (process.browser) {
      setReady(true);
    }
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if(e.keyCode === 13) //Enter
    {
      const val = e.target.value;
      if(val.length === 0) {
        setShowForm(false);
      }
      else {
        const boardId = e.target.attributes['data-id'].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat:0,
          attachment: 0,
          assignees: []
        }
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = '';
      }
    }
  }

  return (
    <Layout>
      <div className="p-10 flex flex-col h-screen">
        {/* Board columns */}
        {ready && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-4 gap-5 my-5">
              {boardData.map((board, bIndex) => {
                return (
                  <div key={board.name}>
                    <Droppable droppableId={bIndex.toString()}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className={`bg-gray-100 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                          >
                            <span
                              className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                          absolute inset-x-0 top-0"
                            ></span>
                            <h4 className=" p-3 flex justify-between items-center mb-2">
                              <span className="text-2xl text-gray-600">
                                {board.name}
                              </span>
                              {/* <DotsVerticalIcon className="w-5 h-5 text-gray-500" /> */}
                            </h4>

                            <div className="overflow-y-auto overflow-x-hidden h-auto"
                            style={{maxHeight:'calc(100vh - 290px)'}}>
                              {board.items.length > 0 &&
                                board.items.map((item, iIndex) => {
                                  return (
                                    <CardItem
                                      key={item.id}
                                      data={item}
                                      index={iIndex}
                                      className="m-3"
                                    />
                                  );
                                })}
                              {provided.placeholder}
                            </div>
                            
                            {
                              showForm && selectedBoard === bIndex ? (
                                <div className="p-3">
                                  <textarea className="border-gray-300 rounded focus:ring-purple-400 w-full" 
                                  rows={3} placeholder="Task info" 
                                  data-id={bIndex}
                                  onKeyDown={(e) => onTextAreaKeyPress(e)}/>
                                </div>
                              ): (
                                <button
                                  className="flex justify-center items-center my-3 space-x-2 text-lg"
                                  onClick={() => {setSelectedBoard(bIndex); setShowForm(true);}}
                                >
                                  <span>Add task</span>
                                  {/* <PlusCircleIcon className="w-5 h-5 text-gray-500" /> */}
                                </button>
                              )
                            }
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </DragDropContext>
        )}
      </div>
    </Layout>
  );
}