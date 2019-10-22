const Room = require("../models/Room");
const Block = require("../models/Block");

const registerRoom = async(req, res)=>{
    const { room_id, student_id } = req.body;
    Room.findOne({_id: room_id}, async(err, room)=>{
        if(err) {
            return res.json({success: false})
        }
        if(!room) {
            return res.json({success: false})
        }
        await room.update({
            $push:{
                occupants: student_id
            }
        }, (err)=>{
            if(err) {
                return res.json({success: false})
            }
            res.json({success: true})
        })
    })
}

const unregisterRoom = (req, res)=>{
    const { room_id, student_id } = req.body;
    Room.findOne({_id: room_id}, async(err, room)=>{
        if(err) {
            return res.json({success: false})
        }
        if(!room) {
            return res.json({success: false})
        }
        await room.update({
            $pull:{
                occupants: student_id
            }
        }, (err)=>{
            if(err) {
                return res.json({success: false})
            }
            res.json({success: true})
        })
    })
}

const createRoom = async(req, res)=>{
    const {
        number,
        block,
        gender,
        capacity
    } = req.body;
    const newRoom = new Room({number, gender, block, capacity});
    await newRoom.save((err, room)=>{
        if(err){
            return res.json({success: false});
        }
        if(!room){
            return res.json({success: false});
        }
        Block.findOne({_id: block}, async(err, block)=>{
            if(err) {
                return res.json({success: false})
            }
            if(!block) {
                return res.json({success: false})
            }
            await block.updateOne({
                $push:{
                    rooms: room._id
                }
            }, (err)=>{
                if(err) {
                    return res.json({success: false})
                }
            })
        })
    })
    res.json({success: true})
}

const deleteRoom = async(req, res)=>{
    const { _id } = req.params
    await Room.findOneAndDelete({_id},(err, room)=>{
        if(err){
            return res.json({success: false, message: err});
        }
        if(!room){
            return res.json({success: false, message: "room not deleted"});
        }
        Block.findOne({_id: room.block}, async(err, block)=>{
            if(err) {
                return res.json({success: false})
            }
            if(!block) {
                return res.json({success: false})
            }
            await block.updateOne({
                $pull:{
                    rooms: room._id
                }
            }, (err)=>{
                if(err) {
                    return res.json({success: false})
                }
            })
        })
        res.json({success: true})
    })
}

module.exports = {
    registerRoom,
    unregisterRoom,
    createRoom,
    deleteRoom
}