const Course = require('./models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] /courses/create
    async create(req, res, next) {
        res.render('courses/create');
    }

    async store(req, res, next) {
        const course = new Course(req.body);
        try {
            await course.save();
            res.redirect('/me/list_courses');            
        } catch (error) {
            next(error);
        }
    }

    //[GET] /courses/:slug
    async show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch((error) => next(error));
    }

    //[GET] /courses/:id/edit
    async edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch((error) => next(error));
    }
    //[PUT] /courses/:id
    async update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/list_courses'))
            .catch((error) => next(error));
    }

    //[DELETE] /courses/:id
    async delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch((error) => next(error));
    }

    //[DELETE] /courses/:id/force
    async forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch((error) => next(error));
    }

    //[PATCH] /courses/:id/restore
    async restore(req, res, next) {
        Course.restore({ _id: req.params.id })           
            .then(() => {                
                // Cập nhật trường deleted thành false                
                return Course.updateOne({ _id: req.params.id }, { deleted: false });              
            })
            .then(() => res.redirect('back'))
            .catch((error) => next(error));
    }
}

module.exports = new CourseController();
