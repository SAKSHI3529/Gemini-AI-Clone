/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(""); // To save the input data
  const [recentPrompt, setRecentPrompt] = useState(""); //stores the input data to show in display screen
  const [prevPrompts, setPrevPrompts] = useState([]); // To store the all the history and show in the recent tab
  const [showResult, setShowResult] = useState(false); // To hide the greet text and show result there
  const [loading, setLoading] = useState(false); //To display loading animation show data is loading
  const [resultData, setResultData] = useState(""); //To display the result on display

  //for print the word one by one in animation 
 const delayPara = (index , nextWord) =>{
    setTimeout(function (){
      setResultData(prev=>prev+nextWord);
    },75*index)
 }

 const newChat = () =>{
  setLoading(false)
  setShowResult(false)
 }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt !==undefined){
      response = await run(prompt);
      setRecentPrompt(prompt)
    }

    else{
      setPrevPrompts(prev=>[...prev , input])
      setRecentPrompt(input)
      response = await run(input)
    }
   

    //In showing result whare ia ** at the bold tag to customiz the text
    let responseArray = response.split("**");
    let newResponse = "";
    for(let i=0 ; i < responseArray.length; i++)
      {
      if(i===0 || i%2 !==1){
          newResponse += responseArray[i];
      }
      else{
        newResponse += "<b>"+responseArray[i]+"</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArray = newResponse2.split(" ");
    for(let i=0 ; i<newResponseArray.length ; i++)
      {
       const nextWord = newResponseArray[i];
       delayPara(i, nextWord+" ")
      }

    // let htmlResponse = newResponseArray.split("```")

    // for(let i=0 ; i<htmlResponse.length ; i++){
    //   if(i===0 || i%2 !==1){
    //     newResponseArray = den
    // }
    // }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
