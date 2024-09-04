import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,messages} = useContext(Context)

  return (
    <div className='main'>
        <div className="nav">
            <div>
                <img src={assets.flora_icon} alt="" />
                <p>Flora</p>
            </div>
            <img src={assets.user_icon} alt="" />
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
                    <div className="card">
                        <p>What is the most trending place to visit in Canada?</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Briefly summarize this concept: catalyst in chemistry</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Brainstorm team bonding activities for a computer science group project</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Improve the readability of the following code</p>
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
                </div>
            }

            

            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here'/>
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