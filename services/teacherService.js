class TeacherService {
    constructor(db) {
        this.client = db.sequelize;
        this.Teacher = db.Teacher;
    }

    async create(FirstName, LastName, SchoolId) {
        return this.Teacher.create(
            {
                FirstName,
                LastName,
                SchoolId
            }
        ).catch(function (err) {
            console.log(err);
        });
    }

    async get(id) {
        return await this.Teacher.findOne({
            where: {id: id}
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    async getAll() {
        return await this.Teacher.findAll({
            where: {}
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    async delete(id) {
        return this.Teacher.destroy({
            where: {id: id}
        }).catch(function (err) {
            console.log(err);
        });
    }

}
module.exports = TeacherService;