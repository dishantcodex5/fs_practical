import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import axios from 'axios'
import { socket } from "../../App";

export default function Chat() {
  const username = useSearchParams()[0].get('with');
  const curuser = useSelector((state) => state.login.user) || {username: "", avatar: "#"}
  const isLogin = useSelector((state) => state.login.isLogin)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const [chatId, setChatId] = useState('')
  const [otherUser, setOtherUser] = useState({username: '', avatar: '#'});
  const [messages, setMessages] = useState([
    { sender: "John", text: "Hey there!" },
    { sender: "Jane", text: "Hello! How are you?" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const ref1 = useRef(null)
  const ref2 = useRef(null)

  useEffect(() => {
    // console.log(curuser, isLogin)
    if (!isLogin) navigate('/')
  })

  useEffect(() => {
    ref1.current.scrollIntoView({behavior: 'smooth'})
    ref2.current.scrollIntoView({behavior: 'smooth'})
  }, [messages])
  
  useEffect(() => { 
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/chat/start`, {user1: curuser.username, user2: username}, {
        withCredentials: true
    })
    .then((res) => {
        if (res.status<400){
          let {participants, messages:t_messages, _id} = res.data.chat
          if (participants[0].username===username){
            setOtherUser(participants[0])
          }
          else{
            setOtherUser(participants[1])
          }
          setMessages(t_messages)
          setChatId(_id)
        }
        else {
          console.log(res)
          navigate('/')
        }
        setLoading(false)
      })
    .catch((err) => {
        console.error("Error fetching user:", err)
        navigate('/')
        setLoading(false)
    })
  }, [username, curuser.username]);


  useEffect(() => {
    const handleChatSend = ({ chatId: t_chatId, text }) => {
      console.log({ t_chatId, text });
      console.log(chatId);
      console.log(chatId === t_chatId);
  
      if (chatId === t_chatId) {
        setMessages((msgs) => [...msgs, { sender: otherUser.username, text }]);
      }
    };
  
    socket.on('chatSend', handleChatSend);
  
    return () => {
      socket.off('chatSend', handleChatSend); // Cleanup previous listener to prevent duplication
    };
  }, [chatId]); // Depend on chatId so that the latest value is always used

  useEffect(() => {
    socket.emit('map', curuser.username)
  }, [])

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { sender: curuser.username, text: newMessage }]);
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/chat/put`, {chatId, sender:curuser.username, text: newMessage}, {
      withCredentials: true
    })
    .then((res) => {
      if (res.status<400){
        // console.log(res.data) 
      }
    }) 
    .catch((err) => {
      console.log(err.message)
    })
    .finally(() => {
      setLoading(false)
    })
    socket.emit('chatSend', {chatId, to:otherUser.username, text: newMessage})
    // console.log(chatId, otherUser.username, newMessage)
    setNewMessage("");
  };

  if (!otherUser) return <div>Loading...</div>;

  return (
    <>
    <div ref={ref2}></div>
    {loading && (
        <>
            <div className="z-[100] opacity-10 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed bg-black" />
            <Loader2 className="z-[100] opacity top-[45vh] left-[45vw] min-h-[10vh] min-w-[10vw] fixed flex justify-center w-10 opacity-100 h-10 animate-spin text-gray-800 " />
        </>
    )}
    <div className="flex flex-col h-screen p-4 max-w-md mx-auto border rounded-lg shadow-md">
      <div className="flex items-center space-x-2 border-b pb-2">
        <img src={otherUser.avatar} alt={otherUser.username} className="w-10 h-10 rounded-full" />
        <span className="font-semibold">{otherUser.username}</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === curuser.username ? "justify-end" : "justify-start"}`}
          >
            {msg.sender !== curuser.username && (
              <img src={otherUser.avatar} className="w-8 h-8 rounded-full mr-2" alt="avatar" />
            )}
            <div
              className={`p-2 rounded-lg max-w-xs ${
                msg.sender === curuser.username ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={ref1}></div>
      </div>
      <div className="flex items-center border-t p-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-md focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
    </>
  );
}
