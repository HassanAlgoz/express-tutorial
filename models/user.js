const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;


// User Schema
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    nickname: {type: String, unique: true},
    role: {type: String, default: "member"},
    age: Number,
}, { timestamps: true });


// methods ======================
// we have two type of methods: 'methods', and 'statics'.
// 'methods' are private to instances of the object User, which allows the use of 'this' keyword.
// 'statics' are attached to the user object, so that you don't need an instance of the object created with the keyword 'new' to actually call the function.

// generating a hash
// passwords are not saved to the database as is. Instead, they are hashed first, then saved.
// hashes are always the same for the same password given the same "salt".
userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
// this method takes the password, hashes it, and compares it to the user's own password
// when the two hashes are equal, it means the passwords match
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.isMember = function() {
    return (this.role === "member");
};
userSchema.methods.isAuthor = function() {
    return (this.role === "author");
};

module.exports = mongoose.model('User', userSchema);