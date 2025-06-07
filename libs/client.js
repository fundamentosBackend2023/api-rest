const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
    name: {
        type: String,
        minlength: [2, 'Must have at least 2 characters'],
        required: [true, 'Mandatory field']
    },
    age: {
        type: Number,
        required: [true, 'Mandatory field'],
        min: [18, 'age should be equal or above legal age'],
        max: [120, 'age out of reasonable range']
    },
    city: {
        type: String,
        enum: {
        values: ['CDMX', 'Guadalajara', 'Monterrey'],
        message: '{VALUE} is not a valid city'
        },
    required: [true, 'Mandatory field']
    },
    email: {
        type: String,
        required: [true, 'Mandatory field'],
        validate: {
        validator: function(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `'${props.value}' Invalid email`
        }
    },
    spentAmount: {
        type: Number,
        min: [20.01, 'the amount must be above 20']
    }
});

const clientModel = model('clients', clientSchema);

module.exports = clientModel;