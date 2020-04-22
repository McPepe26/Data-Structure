let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let GroupSchema = new Schema({
    groupName: {
        type: String,
        required : [true, 'El nombre es necesario']
    },
    public: {
        type: Boolean,
        default: false,
    },
    code: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'El usuario es necesario']
    }
});


module.exports = mongoose.model('Group', GroupSchema);
