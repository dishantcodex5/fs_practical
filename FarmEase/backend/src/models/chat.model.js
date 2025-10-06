import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})


const chatSchema = new mongoose.Schema({
    'participants' : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    'messages': [messageSchema]
})


const Chat = mongoose.model("Chat", chatSchema)


export default Chat