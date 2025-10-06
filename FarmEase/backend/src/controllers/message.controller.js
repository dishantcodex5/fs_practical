import Message from "../models/messages.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"



const putMessage = async (req, res) => {
    try{
        const {roomId, sender, message} = req.body
        if(!roomId || !sender || !message){
            throw new ApiError(400, "Please fill all the fields")
        }

        const newMessage = await Message.create({
            roomId, sender, message
        })

        return res.status(200).json(
            new ApiResponse(200, newMessage, "Message created successfully")
        )

    } catch(err) {
        return res.status(500).json(err.message)
    }
}  


const getMessage = async (req, res) => {
    try{
        const {roomId} = req.body
        if (!roomId){
            throw new ApiError(400, "Please fill all the fields")
        }
        const messages = await Message.find({roomId}).sort({timestamp: 1})
        return res.status(200).json(
            new ApiResponse(200, messages, "Messages retrieved successfully")
        )
    } catch(err) {
        return res.status(500).json(err.message)
    }
}



export {putMessage, getMessage}