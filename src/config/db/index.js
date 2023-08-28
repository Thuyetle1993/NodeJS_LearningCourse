const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/F8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected Successfully!!!');
    } catch (error) {
        console.error('Connection Error:', error);
    }
}

module.exports = { connect };
