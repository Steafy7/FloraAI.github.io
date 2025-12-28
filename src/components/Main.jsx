import React, { useContext, useEffect, useRef } from 'react'
import './Main.css'
import { assets } from '../assets/assets'
import { Context } from '../context/Context'

const Main = () => {

    const msgEnd = useRef(null);
    const resultContainerRef = useRef(null);

    const {onSent,showResult,loading,resultMessage,resultEnd,setInput,input,messages,isAtBottom,setIsAtBottom} = useContext(Context)

    const autoResizeTextarea = (e) => {
        const textarea = e.target;
        textarea.style.height = "10px"; // Reset height
        textarea.style.height = textarea.scrollHeight + "px"; // Set to scrollHeight
    };

    // Scrolls when initial message is sent.
    useEffect(() => {
        renderMarkdown(); // Refreshes the markdown format
        window.MathJax.typesetPromise();

        if (showResult) {
            setTimeout(() => {
                if (resultContainerRef.current) {
                    resultContainerRef.current.scrollTop = resultContainerRef.current.scrollHeight;
                }
            }, 50); // Give the DOM time to mount
        }
    }, [showResult]);

    useEffect(() => {
        renderMarkdown(); // Refreshes the markdown format
        window.MathJax.typesetPromise();

        // If the user has NOT scrolled up, auto-scroll
        if (resultContainerRef.current && isAtBottom) {
            resultContainerRef.current.scrollTop = resultContainerRef.current.scrollHeight
        }
    }, [messages, resultMessage]);

    // Detects user scroll position
    const handleScroll = () => {
        if (!resultContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = resultContainerRef.current;
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    };

    // Function to handle when enter key pressed
    const enterPressed = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await sendMessage();
            window.MathJax.typesetPromise();
            setIsAtBottom(true);
            autoResizeTextarea;
        }
    }

    // Function to handle when send button is clicked
    const sendMessage = async () => {
        if (!loading) {
            setIsAtBottom(true);
        }
        if (!loading && resultMessage === resultEnd) {
            await onSent();
            window.MathJax.typesetPromise();
        }
    }

    // Function to handle card clicks
    const handleCardClick = async (text) => {
        await onSent(text);  // Trigger the submission
        window.MathJax.typesetPromise();
        setIsAtBottom(true);
    }

    return (
        <div className='main'>
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
                    :<div className='result' ref={resultContainerRef} onScroll={handleScroll}>
                        {messages.map((message, i) =>
                            <div key={i} className={!message.isBot?"result-title":"result-data"}>
                                <img src={!message.isBot?assets.user_icon:assets.flora_icon} alt='' />
                                {message.isBot? <github-md dangerouslySetInnerHTML={{ __html: i === messages.length - 1 ? resultMessage : message.text }}></github-md> : <github-md>{message.text}</github-md>}
                            </div>
                        )}
                    </div>
                }

                

                <div className="main-bottom">
                    <div className="search-box">
                        <textarea
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                autoResizeTextarea(e);
                            }}
                            onKeyDown={enterPressed}
                            placeholder="Enter a prompt here"
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={()=>sendMessage()} src={assets.send_icon} alt="" />
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