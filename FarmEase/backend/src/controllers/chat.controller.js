import ApiError from '../utils/ApiError.js'
import ApiResponse from '../utils/ApiResponse.js'
import Chat from '../models/chat.model.js'
import User from '../models/user.model.js'


const startChat = async (req, res) => {
    try{
        const {user1, user2} =  req.body
        const {_id:id1} = await User.findOne({username: user1})
        const {_id:id2} = await User.findOne({username: user2})
        let chat = await Chat.findOne({
            participants: {$all: [id1, id2]}
        })
        if (!chat){
            chat = new Chat({participants: [id1, id2], messages:[]})
            await chat.save()
        }

        let newchat = {}
        newchat._id = chat._id
        newchat.messages = chat.messages
        newchat.participants = []

        for (let i in chat.participants){
            newchat.participants.push(await User.findOne({_id: chat.participants[i]}))
        }

        return res
        .status(200)
        .json({chat:newchat})

    } catch (err){
        return res
        .status(401)
        .json({message: err.message})
    }
}

const putChat = async (req, res) => {
    try{
        let {chatId, sender, text} = req.body
        if (!chatId || !sender || !text){
            throw new ApiError(401, "send all data")
        }
        console.log(chatId, sender, text)
        let chat = await Chat.findById(chatId)
        if (!chat){
            throw new ApiError(401, "Chat not found")
        }
        chat.messages.push({sender, text})
        await chat.save()
        return res
        .status(200)
        .json({chat})

    } catch(err) {
        return res
        .status(401)
        .json({message: err.message})
    }
}


export {startChat, putChat}