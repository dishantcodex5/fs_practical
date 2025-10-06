import mongoose from "mongoose"


const messageSchema = new mongoose.Schema({
    'roomId': {
        type: String,
        required: true
    },
    'sender': {
        type: String,
        required: true
    },
    'message': {
        type: String,
        required: true
    },
    'timestamp' : {
        type: Date,
        default: Date.now(),
        index: true
    }
},{'timestamps': true})


const Message = mongoose.model("Message", messageSchema)

export default Message