import React, { useContext, useEffect, useRef } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const msgEnd = useRef(null);

    const {onSent,showResult,loading,resultData,setInput,input,messages} = useContext(Context)

    useEffect(() => {
        msgEnd.current?.scrollIntoView();
    }, [messages, resultData]);

    const enterPressed = async (e) => {
        if (e.key == 'Enter') await onSent();
    }

    // Function to handle card clicks
    const handleCardClick = async (text) => {
        await onSent(text);  // Trigger the submission
    }

    return (
        <div className='main'>
            <div className="nav">
                <div>
                    <img src={assets.flora_icon} alt="" />
                    <p>Flora</p>
                </div>
            </div>
            <div className="main-container">

                {!showResult
                ?
                <>
                    <div className="greet">
                        <p><span>Hello, Welcome to Flora.</span></p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className="cards">
                        <div className="card" onClick={(e) => handleCardClick("What are the available commands in Flora?")}>
                            <p>What are the available commands in Flora?</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card" onClick={(e) => handleCardClick("/plan Grade 12 Calculus")}>
                            <p>/plan Grade 12 Calculus</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card" onClick={(e) => handleCardClick("/language Spanish")}>
                            <p>/language Spanish</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card" onClick={(e) => handleCardClick("/config")}>
                            <p>/config</p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                    </>
                    :<div className='result'>
                        {messages.map((message, i) =>
                            <div key={i} className={!message.isBot?"result-title":"result-data"}>
                                <img src={!message.isBot?assets.user_icon:assets.flora_icon} alt='' />
                                {message.isBot? <p dangerouslySetInnerHTML={{ __html: i === messages.length - 1 ? resultData : message.text }}></p> : <p>{message.text}</p>}
                            </div>
                        )}
                        <div ref={msgEnd}/>
                    </div>
                }

                

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} onKeyDown={enterPressed} type='text' placeholder='Enter a prompt here'/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className='bottom-info'>
                    Flora might display inaccurate info so double check its response. 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main