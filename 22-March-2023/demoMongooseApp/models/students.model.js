const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    street:String,
    city: String,
    state: String,
    country: String,
    pincode: Number
})

const studentSchema =  new Schema({
  name: String,  
  age: {
    type: Number,
    min: 18,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /\S+@\S+\.\S+/,
    lowercase: true
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () =>{
        return Date.now();
    }
  },
  updatedAt:{
    type: Date,
    default: () =>{
        return Date.now();
    }
  },
  subjects: {
    type: [String],
    validate:{
        validator: x => x.length != 0,
        message: props => `${props.value} is not a valid subject!`
    }
  },
  enrollmentId: mongoose.ObjectId,
  address: addressSchema
});

const studentModel = mongoose.model("Student", studentSchema);
module.exports = studentModel;







