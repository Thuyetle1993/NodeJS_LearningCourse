const Course = require('./models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET]  me/stored/courses
    async listCourses(req, res, next) {
        Course.find({})
            .then((courses) => {
                // courses = courses.map(course => course.toObject()) // Nhận lại một biến mảng mới sau khi map qua course từ DB

                res.render('me/list_courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }
    async trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render('me/trash_courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }
}

module.exports = new MeController();
