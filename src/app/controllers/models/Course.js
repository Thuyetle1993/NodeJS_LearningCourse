const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-updater');

const Course = new Schema(
    {
        name: { type: String, maxLength: 255, required: true },
        image: { type: String, maxLength: 255 },
        description: { type: String },
        videoID: { type: String, required: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Adđ Plugin
// add plugin slug
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);
