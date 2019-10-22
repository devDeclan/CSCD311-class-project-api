const Profile = require("../models/Profile");
const Programme = require("../models/Programme");

const getProgrammes = async(req, res)=>{
    Programme.find({}, (err, programmes)=>{
        if(err) {
            return res.json({success: false, message: err})
        }
        res.json({success: true, data: programmes})
    })
}
const createProgramme = async(req, res)=>{
    const { code, name } = req.body;
    const newProgramme = new Programme({ code, name});
    await newProgramme.save((err, programme)=>{
        if(err){
            return res.json({success: false});
        }
        if(!programme){
            return res.json({success: false});
        }
        res.json({success: true})
    })
}
const deleteProgramme = async(req, res)=>{
    const { code } = req.params
    Programme.findOneAndDelete({_id:code}, (err, programme)=>{
        if(err){
            return res.json({success: false});
        }
        if(!programme){
            return res.json({success: false});
        }
        Profile.find({programme: programme._id}, (err, profiles)=>{
            if(err){
                return res.json({success: false});
            }
            profiles.forEach((profile)=>{
                profile.update({
                    $unset: {programme: 1}
                },(err)=>{
                    if(err){
                        return res.json({success: false})
                    }
                })
            })
            res.json({success: true})
        })
    })
}

module.exports = {
    createProgramme,
    deleteProgramme,
    getProgrammes
}