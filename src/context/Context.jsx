import { createContext, useState } from "react";
import runChat from "../config/flora";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");
    const [resultEnd, setResultEnd] = useState("");
    const [messages,setMessages] = useState([
        {
            text: "<p>Hello! I am <strong>Flora AI Assistant</strong>, version 0.3, created by Steven Zhang and inspired by JushBJJ. I'm here to help you learn and explore various topics in a fun and engaging way! 🦌</p><p>For more information about Flora, you can visit <a target=”_blank” href='https://floraeducations.framer.ai/'>Flora’s Website</a>.</p><hr><h2>Your Current Configuration:</h2><ul><li><strong>🎯 Depth:</strong> High School</li><li><strong>🧠 Learning Style:</strong> Active</li><li><strong>🗣️ Communication Style:</strong> Socratic</li><li><strong>🌟 Tone Style:</strong> Encouraging</li><li><strong>🔎 Reasoning Framework:</strong> Causal</li><li><strong>😀 Emojis:</strong> ✅</li><li><strong>🌐 Language:</strong> English</li><li><strong>📚 Knowledge:</strong> None</li><li><strong>⌚ Timeframe:</strong> Disabled</li></ul><p><strong>❗Flora requires GPT-4 or Gemini with Code Interpreter to run properly❗</strong><br>Please note that this is the free public version of Flora, which uses a more cost-effective AI model.<br>See the feature differences between our <strong>business edition</strong> and <strong>education edition</strong> here (hyperlink). Sorry for the inconvenience 🙂</p><hr><p><strong>➡️ Please read the guide to configurations here:</strong> <a target=”_blank” href='https://floraeducations.framer.ai/projects/flora-ai/flora-configuration'>Here</a>. ⬅️</p><p>To start planning your learning journey, you can use the <strong>/plan</strong> command. If you're ready to dive into a lesson, just type <strong>/start</strong>! And if you need any help or want to adjust your learning preferences, let me know! 😊</p>",
            isBot: true
        }
    ]);

    const delayPara = (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },50*index)
    };

    const loader = '<div className="loader"><hr /><hr /><hr /></div>)'

    const onSent = async (inputText = input) => {
        if (!inputText) return; // Prevent sending blank input
        setResultData("")
        setResultEnd("") 
        setShowResult(true)
        setInput("")
        setMessages([
            ...messages,
            {text: inputText, isBot: false},
            {text: "", isBot: true}
        ]);
        setLoading(true)

        const response = await runChat(inputText) // Sends and gets response from OpenAI API
        let newResponseArray = response.split(" "); // Splits response into words array for typing effect

        // Runs a loop to print every word for typing effect
        for(let i=0; i<newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord+" ")
            setResultEnd(result=>result+nextWord+" ")

            // checks for the last word being typed and rescans the webpage for math formulas to convert them
            if (i==newResponseArray.length-1){
                setTimeout(() => {
                    window.MathJax.typesetPromise();
                    renderMarkdown(); // Refreshes the markdown format
                }, 50*i+500); // last loop for last word and it's time delay, plus 500ms
            }
        }
        setMessages([
            ...messages,
            {text: inputText, isBot: false},
            {text: response, isBot: true}
        ]);

        setLoading(false)
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        showResult,
        loading,
        resultData,
        resultEnd,
        input,
        setInput,
        messages
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider