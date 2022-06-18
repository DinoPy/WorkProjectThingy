const mongoose = require('mongoose');

const listsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        description: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        items: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true,
                autopopulate: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

listsSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('List', listsSchema);
