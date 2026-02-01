import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Please provide a valid URL",
    },
  },
});

export default mongoose.model("user", userSchema);
