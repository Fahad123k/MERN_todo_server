const mongoose= require('mongoose')
const bcrypt= require('bcrypt')
const {Schema}= mongoose;

const UserSchema= new Schema({
    firstname:String,
    lasttname:String,
    username:{type:String,required:true},
    password:{type:String,required:true},
})



UserSchema.pre('save',async function(next) {
    
    const user= this;

    if(!user.isModified('password')) return next();

    const salt =await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(user.password,salt)
    user.password=hash;
    next()
})

UserSchema.methods.comparePassword=async function(password){
     return bcrypt.compare(password,this.password)
}

const User= mongoose.model("User",UserSchema);

module.exports= User;