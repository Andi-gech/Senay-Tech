import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'react-lottie';
import { motion } from "framer-motion"
import websitedev from "./assets/settings.png"
import appdev from "./assets/app-settings.png"
import design from "./assets/web-design.png"
import technical from "./assets/technical-support.png"
import './App.css'
import animationData from './assets/Animation - 1705334391939.json';
import chaticon from "./assets/chat.png"
import axios from 'axios';

import logo from "./assets/ic.png"
export default function HomePage() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [questions] = useState([
    'What kind of website/app/bot do you like us to build?',
        'Give me your Email Address?',
        'Who do we call you?',
        'Any additional info to tell?'
  ]);

  const [openchat, setopenchat] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', message: 'HELLO !! welcome to Senay Tech' }
 ]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  
      console.log(messagesEndRef.current.scrollHeight);
    }
  };

  const senddata = () => {
    console.log(messages);
    const messagesentbyme=messages.filter(message => message?.sender === 'me');
    const message = {
      whatDoYouLike: messagesentbyme[0]?.message,
      email: messagesentbyme[1]?.message,
      caller: messagesentbyme[2]?.message,
      additionalInfo: messagesentbyme[3]?.message,
  };
  
  axios.post('https://crabby-frog-swimsuit.cyclic.app/message', { message })
  .then((response) => {
     setMessages([
       ...messages,{
         sender: 'bot',
         message: response.data.message
       }
     ])
     setCurrentQuestion(0)
     scrollToBottom()
  })
  .catch((error) => {
    console.error('Error sending message:', error);
  });

   
  };

const sendMessage = () => {
  if (currentQuestion === questions.length + 1) {
    return;
  }
  setMessages(prevMessages => [
    ...prevMessages,
    { sender: 'me', message: inputMessage }
  ]);
  
  if (inputMessage.trim() !== '') {
    setInputMessage('');
  }

  setCurrentQuestion(prevQuestion => prevQuestion + 1);
  scrollToBottom()

 
};

  useEffect(() => {
    if (currentQuestion === questions.length) {
     
      senddata()
    } else if (currentQuestion < questions.length) {
      setTimeout(() => {
        
     
      setMessages( [
        ...messages,
        { sender: 'bot', message: questions[currentQuestion] }
      ])
   
     
       }, 500);
       scrollToBottom();
    }
  }, [currentQuestion, questions]);

  return (
    <div className=' w-[96%] relative  flex-col flex overflow-hidden   rounded-md   h-[1500px]'>
      {openchat &&  
        <div className='w-[400px] backdrop-blur-sm bg-opacity-25 overflow-hidden shadow-white shadow-sm h-[350px] z-30 bottom-[53px] right-[50px] rounded-md fixed bg-black flex flex-col items-center justify-between '>
          <div  className=' chat w-full h-[300px]  overflow-y-auto flex flex-col '>
            {messages?.map((message, index) => (
              <div key={index} className={` px-4 w-[80%] min-h-[50px] rounded-md flex items-center  text-[14px]  text-white mt-2 ${message?.sender === 'me' ? 'self-end bg-indigo-700 ' : 'self-start bg-indigo-600'}`}>{message?.message}</div>
            ))}
 
            <div ref={messagesEndRef} className={` w-[80%] min-h-[50px] rounded-md flex items-center   text-white mt-2 ${'ddr' === 'me' ? 'self-end bg-indigo-700 ' : 'self-start '}`}></div>
           
          </div>
          <div className=' w-full flex flex-row '>
            <textarea
              className=' w-[80%] h-[40px] outline-blue-500 bg-gray-100 overflow-hidden'
              onChange={(e) => setInputMessage(e.target.value)}
              value={inputMessage}
              placeholder="Enter your text here..." // Placeholder text
            />
            <button disabled={currentQuestion === questions.length?true:false} className=' w-[60px] h-[40px] bg-blue-600 rounded-sm text-white' onClick={sendMessage}>send</button>      
          </div>
        </div>
      }
      <div className='w-[300px] h-[70px]   items-center z-10 fixed  bottom-0 right-[10px] flex flex-row justify-center'>
        <div className='px-2 bg-white  backdrop-blur-sm bg-opacity-10 rounded-full text-white p-1'>Send Message to our devs </div>
        <div onClick={() => setopenchat(!openchat)} className='w-[50px] h-[50px] bg-white rounded-full flex items-center cursor-pointer justify-center '>
          <img src={chaticon} className="w-[30px] h-[30px]" alt="profile picture" srcSet="" />
        </div>
      </div>
      <div className=' w-full h-[500px] flex'>
        <div className=' flex-1   flex items-center justify-center'>
          <div className=' flex items-center justify-center   flex-col'>
            <p className=' font-bold text-white  text-center  w-[470px] text-[26px]'><span className=' text-[50px] font-serif'>E</span>mpowering Digital Transformation: Innovate, Create, Elevate</p>
            <button className="bg-transparent mt-4 hover:bg-white text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded">
              Explore Now
            </button>
            <p className='  text-white  text-center mt-3 w-[400px]  text-[16px]'>Unlocking the Power of Technology to Shape Tomorrow's Solutions Today.</p>
          </div>
        </div>
        <div className=' flex-1  flex items-center justify-center'>
          <Lottie 
            options={defaultOptions}
            height={400}
            width={500}
          />
        </div>
      </div>
      <div className='w-full mt-[100px] h-[400px] flex-col items-center flex'>
        <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight text-white">
          Services
        </h1>
        <div className=' w-full h-[400px] flex flex-row'>
          <motion.div
            className='  justify-center backdrop-blur-md duration-500 hover:shadow-orange-500  shadow-sm rounded-md flex-col shadow-gray-200 w-[250px] mt-[20px] flex items-center h-[350px] mx-4'
            initial={{ y: 170 ,opacity:0}}
            transition={{ type: "spring", stiffness: 100 }}
            whileInView={{y:0,opacity:1}}
          >
            <img src={websitedev} className='w-[100px] h-[100px]'/>
            <p className=' text-gray-200 font-semibold  '>Website Development</p>
            <button
              class="flex items-center mt-10 gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
              type="button">
              See Projects
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
              </svg>
            </button>
          </motion.div>
          <motion.div
            className='   backdrop-blur-md shadow-sm rounded-md flex-col duration-500 hover:shadow-orange-600  shadow-gray-200 w-[250px] mt-[20px] flex items-center justify-center h-[350px] mx-4'
            initial={{ y: 170 ,opacity:0}}
            transition={{ type: "spring",delay:0.1,stiffness: 100 }}
            whileInView={{y:0,opacity:1}}
          >
            <img src={appdev} className='w-[100px] h-[100px]'/>
            <p className=' text-gray-200 font-semibold   '>App Development</p>
            <button
              class="flex items-center mt-10 gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
              type="button">
              See Projects
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
              </svg>
            </button>
          </motion.div>
          <motion.div
            className='   backdrop-blur-md shadow-sm duration-500 hover:shadow-orange-500  rounded-md flex-col shadow-gray-200 w-[250px] mt-[20px] flex items-center justify-center h-[350px] mx-4'
            initial={{ y: 170 ,opacity:0}}
            transition={{ type: "spring",delay:0.2, stiffness: 100 }}
            whileInView={{y:0,opacity:1}}
          >
            <img src={design} className='w-[100px] h-[100px]'/>
            <p className=' text-gray-200 font-semibold '>UI/UX Design</p>
            <button
              class="flex items-center mt-10 gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
              type="button">
              See Projects
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
              </svg>
            </button>
          </motion.div>
          <motion.div
            className='   backdrop-blur-md shadow-sm duration-500 hover:shadow-orange-500  rounded-md flex-col shadow-gray-200 w-[250px] mt-[20px] flex items-center justify-center h-[350px] mx-4'
            initial={{ y: 170 ,opacity:0}}
            transition={{ type: "spring",delay:0.3,stiffness: 100 }}
            
            whileInView={{y:0,opacity:1}}
          ><img src={technical} className='w-[100px] h-[100px]'/>
          <p className=' text-gray-200 font-semibold '>Telegram Bot</p>
          <button
            class="flex items-center mt-10 gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-200 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
            type="button">
            See Projects
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
            </svg>
          </button></motion.div>
        </div>
      </div>
      <div className='w-full mt-[100px] justify-center h-[400px] flex-col items-center flex'>
        <h1 className="mb-2 mt-0 text-5xl text-center font-medium leading-tight text-white">
          Recent Works
        </h1>
        <div className=' mt-3 flex flex-row'>
          <div className='w-[150px]   h-[150px] flex flex-col  items-center justify-center  mx-2  '>
            <img src={logo} className='w-[100px] h-[100px] mb-[20px]'/>
            <p className='  text-white  flex   items-center justify-center  font-thin text-center text-[15px]'>Industrial-clearance (uk)</p>
          </div>
          <div className='w-[150px]   h-[150px] flex flex-col  items-center justify-center  mx-2  '>
            <img src={logo} className='w-[100px] h-[100px] mb-[20px]'/>
            <p className='  text-white  flex   items-center justify-center  font-thin text-center text-[15px]'>Industrial-clearance</p>
          </div>
          <div className='w-[150px]   h-[150px] flex flex-col  items-center justify-center  mx-2  '>
            <img src={logo} className='w-[100px] h-[100px] mb-[20px]'/>
            <p className='  text-white  flex   items-center justify-center  font-thin text-center text-[15px]'>Industrial-clearance</p>
          </div>
          <div className='w-[150px]   h-[150px] flex flex-col  items-center justify-center  mx-2  '>
            <img src={logo} className='w-[100px] h-[100px] mb-[20px]'/>
            <p className='  text-white  flex   items-center justify-center  font-thin text-center text-[15px]'>Industrial-clearance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
