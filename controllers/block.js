const Room = require("../models/Room");
const Hall = require("../models/Hall");
const Block = require("../models/Block");

const getBlock = (req, res)=>{
    console.log("fucked me")
    const { _id } = req.params;
    Block.findOne({_id})
        .populate('rooms')
        .exec((err, block)=>{
            if(err) {
                return res.json({success: false})
            }
            if(!block) {
                return res.json({success: false})
            }
            res.json({success: true, data: block})
        })
}

const createBlock = async(req, res)=>{
    console.log("hit me")
    const { hall, code, name, gender } = req.body;
    console.log(req.body)
    const newBlock = new Block({hall, code, name, gender});
    await newBlock.save((err, block)=>{
        console.log("new block", block)
        if(err){
            console.log(err)
            return res.json({success: false, message: err});
        }
        if(!block){
            return res.json({success: false, message: "block not created"});
        }
        Hall.findOne({_id: hall}, async(err, hall)=>{
            console.log("new hall",hall)
            if(err){
                console.log(err)
                return res.json({success: false, message: err})
            }
            if(!hall){
                return res.json({success: false})
            }
            await hall.updateOne({
                $push:{
                    blocks:block._id
                }
            }, (err, block)=>{
                res.json({success: true})
            })
        })
    })
}

const deleteBlock = async(req, res)=>{
    const { _id } = req.params;
    await Block.findOne({_id}, (err, block)=>{
        console.log("block",block)
        if(err){
            console.log("errror",err)
            return res.json({success: false})
        }
        if(!block){
            return res.json({success: false})
        }
        Room.deleteMany({_id: { $in: block.rooms}}, (err)=>{
            if(err){
                return res.json({success: false})
            }
        })
        Hall.findOne({_id: block.hall}, async(err, hall)=>{
            if(err){
                return res.json({success: false})
            }
            if(!hall){
                return res.json({success: false})
            }
            await hall.updateOne({
                $pull:{
                    blocks:block._id
                }
            })
        })
        res.json({success: true, data: block})
    })
}

module.exports = {
    getBlock,
    createBlock,
    deleteBlock
}