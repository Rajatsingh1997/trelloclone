import React, { useContext, useState } from "react";
import { XCircleIcon } from '@heroicons/react/24/solid'
import storeApi from "../../utils/storeApi";

const InputContainer = ({listId, type}) => {
  const [addTodo, setAddTodo] = useState(false);
  const [title, setTitle]= useState("")
  const {addMoreCard, addMoreList}= useContext(storeApi)
 
  const handlebtnConfirm=()=>{
    if(title.length>=1){
      if(type==="card"){
        addMoreCard(title, listId)
        setAddTodo(false);
        setTitle("")
      }else{
        addMoreList(title)
        setAddTodo(false);
        setTitle("")
      }
     
    }

  }
  console.log(type, "typetypetypetype")
  return (
    <div>
      {!addTodo ? (
        <button
          type="button"
          className=" inline-block px-5 py-1.5 bg-teal-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
          onClick={(e) => setAddTodo(true)}
          
        >
         {type==="card"?  "+ Add a Card": "+ Add another List"}
        </button>
      ) : (
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <div>
            <textarea
              type="text"
              className="text-gray-700 p-2 text-base mb-4 w-full border-2 border-gray-400"
              placeholder={type==="card"? "Enter a title for this card": "Enter list of title"}
              onChange={(e)=>setTitle(e.target.value)}
              value={title}
            ></textarea>
          </div>
          <div className="flex flex-1">
          <button
            type="button"
            className="inline-block px-5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded "
            onClick={handlebtnConfirm}
          >
           {type==="card" ?  "Add Card" : "Add List"}
          </button>
          <XCircleIcon className="h-6 w-6 text-blue-500" onClick={(e)=>setAddTodo(false)}/>
         </div>
        </div>
      )}
    </div>
  ); 
};

export default InputContainer;

