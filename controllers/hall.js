const Room = require("../models/Room");
const Hall = require("../models/Hall");
const Block = require("../models/Block");

const getHalls = (req, res)=>{
    Hall.find({})
        .exec((err, halls)=>{
            if(err) {
                return res.json({success: false})
            }
            if(!halls) {
                return res.json({success: false})
            }
            res.json({success: true, data: halls})
        })
}

const getHall = (req, res)=>{
    const { _id } = req.params;
    Hall.findOne({_id})
        .populate('blocks')
        .exec((err, hall)=>{
            if(err) {
                return res.json({success: false})
            }
            if(!hall) {
                return res.json({success: false})
            }
            res.json({success: true, data: hall})
        })
}

const createHall = async(req, res)=>{
    const { code, name, gender } = req.body;
    const newHall = new Hall({code, name, gender});
    await newHall.save((err, hall)=>{
        if(err){
            return res.json({success: false});
        }
        if(!hall){
            return res.json({success: false});
        }else{
            res.json({success: true})
        }
    })
}

const deleteHall = async(req, res)=>{
    const { _id } = req.params;
    await Hall.findOneAndDelete({_id}, (err, hall)=>{
        if(err){
            return res.json({success: false})
        }
        if(!hall){
            return res.json({success: false})
        }
        Block.find({_id: { $in: hall.blocks}}, (err, blocks)=>{
            if(err){
                return res.json({success: false})
            }
            if(!blocks){
                return res.json({success: false})
            }
            blocks.forEach((block)=>{
                Room.deleteMany({_id: { $in: block.rooms}}, (err)=>{
                    if(err){
                        return res.json({success: false})
                    }
                })
                block.remove((err)=>{
                    if(err){
                        return res.json({success: false})
                    }
                })
            })
        })
        res.json({success: true})
    })
}

module.exports = {
    getHall,
    getHalls,
    createHall,
    deleteHall
}