const User = require("../models/User");
const Profile = require("../models/Profile");

const login = (req, res)=>{
    const {student_id, pin} = req.body;
    console.log(req.body)
    User.findOne({student_id})
        .populate('profile')
        .exec(async(err, user)=>{
            console.log(user)
            if(err){
                return res.json({success: false, message: err})
            }
            if(!user){
                return res.json({success: false, message: "user does not exist"})
            }else{
                if(pin !== user.pin){
                    return res.json({success: false, message: "invalid password"})
                }
                res.json({success: true, user})
            }
        })
}

const register = async(req, res)=>{
    const {
        first_name,
        last_name,
        other_names,
        email_address,
        dob,
        gender,
        programme,
        admission_year
    } = req.body;

    const newUser = new User();
    await newUser.save((err, user)=>{
        if(err){
            console.log(err)
            return res.json({success: false, message: err})
        }
        if(!user){
            return res.json({success: false, message: "user not created"})
        }
        const newProfile = new Profile({
            first_name,last_name,other_names,dob,gender,programme,admission_year, email_address
        });
        newProfile.save(async(err, profile)=>{
            if(err){
                console.log(err)
                return res.json({success: false})
            }
            if(!profile){
                console.log("404")
                return res.json({success: false})
            }
            await user.updateOne({profile: profile._id}, (err)=>{
                if(err){
                    console.log(err)
                    return res.json({success: false})
                }
            })
            user = user.populate('profile');
            return res.json({success: true, user})
        })
    })
}


module.exports = {
    login, 
    register
}