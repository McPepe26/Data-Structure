let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const TestSchema = new Schema({
    nameTest: {
        type: String,
        required : [true, 'El nombre del exámen es necesario']
    },
    groupId:{
        type: Schema.Types.ObjectId, 
        ref: 'Group', 
        required: [true, 'El grupo es necesario']
    },
    doIt: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'El profesor es necesario']
    },
    dateIn: {
        day: {
            type: Number,
            required : [true, 'El día de inicio del exámen es necesario']
        },
        month: {
            type: Number,
            required : [true, 'El mes de inicio del exámen es necesario']
        },
        year: {
            type: Number,
            required : [true, 'El año de inicio del exámen es necesario']
        }
    },
    dateOut: {
        day: {
            type: Number,
            required : [true, 'El día de termino del exámen es necesario']
        },
        month: {
            type: Number,
            required : [true, 'El mes de termino del exámen es necesario']
        },
        year: {
            type: Number,
            required : [true, 'El año de termino del exámen es necesario']
        }
    },
    hourIn: {
        type: String,
        required : [true, 'El hora de inicio del exámen es necesario']
    },
    hourOut: {
        type: String,
        required : [true, 'El hora de fin del exámen es necesario']
    },
    time: {
        number: {
            type: Number,
            required : [true, 'La duración del exámen es necesaria']
        },
        type: {
            type: String,
            required : [true, 'La duración del exámen es necesaria']
        }
    },
    questionList: [
        {
            question: {
                type: String,
                required : [true, 'La pregunta es necesaria']
            },
            answerList: [
                {
                    answer: {
                        type: String,
                        required : [true, 'La respuesta de la pregunta es necesaria']
                    },
                    isCorrect: {
                        type: Boolean
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Test', TestSchema);