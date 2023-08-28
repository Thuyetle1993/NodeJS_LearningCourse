const Course = require('./models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET]
    async index(req, res, next) {
        Course.find({})
            .then((courses) => {
                // courses = courses.map(course => course.toObject()) // Nhận lại một biến mảng mới sau khi map qua course từ DB

                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }
}

module.exports = new SiteController();
