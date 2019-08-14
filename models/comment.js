var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // from User model
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);