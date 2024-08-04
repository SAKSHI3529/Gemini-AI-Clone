/* eslint-disable no-unused-vars */
//import React from 'react'
import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
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
  } = useContext(Context);
  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <img src={assets.user_icon} alt="" />
        </div>

        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello, Nancy. </span>
                </p>
                <p>How can i help you today?</p>
              </div>

              <div className="cards">
                <div className="card">
                  <p onClick={()=>setInput("Suggest beautiful place to see on an upcoming recent road trip")}> Suggest beautiful place to see on an upcoming recent road trip
                  </p>
                  <img src={assets.compass_icon} alt="" />
                </div>

                <div className="card">
                  <p onClick={()=>setInput("Briefly summarize this concept: urban planning")}>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>

                <div className="card">
                  <p onClick={()=>setInput("Brainstorm team bonding activities for our work retreat")}>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.message_icon} alt="" />
                </div>

                <div className="card">
                  <p onClick={()=>setInput("Tell me about React js and React native")}>Tell me about React js and React native</p>
                  <img src={assets.code_icon} alt="" />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>

              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {/* if the loading is true then it display the loader div & if loading is false then is says info ia loaded and info will be display  */}
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}

          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter a promt here"
              />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
              </div>
            </div>
            <p className="botton-info">
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
