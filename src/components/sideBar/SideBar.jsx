/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import "./SideBar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const SideBar = () => {
  const [extented, setExtented] = useState(false);
  
  const [darkMode, setDarkMode] = useState(false);
  const { prevPrompts, onSent, setRecentPrompt , newChat} = useContext(Context);

  const loadPrompt = async(prompt) =>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className="sideBar">
      <div className="top">
        {/* hide and show side bar using useState */}
        <img
          onClick={() => setExtented((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />

        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extented ? <p>New Chat</p> : null}
        </div>

        {extented ? (
          <div className="recent">
            <p className="recent-title">Recent</p>

            {prevPrompts.map((item, index) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div onClick={()=>loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0 ,18)}... </p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry ">
          <img src={assets.question_icon} alt="" />
          {extented ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry ">
          <img src={assets.history_icon} alt="" />
          {extented ? <p>Activity</p> : null}
        </div>

     
        <div className="bottom-item recent-entry ">
          <img src={assets.setting_icon} alt="" />
          
          {extented ? <p  >Setting</p> : null}
         {/* 
          {darkMode?  <ul >
            <li >Dark Mode </li>
           </ul> : null} */}
         
          

          
        </div>
      </div>
    </div>
  );
};

export default SideBar;
