const Sequelize = require('sequelize')

class SchoolService {
    constructor(db) {
        this.client = db.sequelize;
        this.School = db.School;
    }

    async create(Name, Address, Description) {
        return this.School.create(
            {
                Name,
                Address,
                Description
            }
        ).catch(function (err) {
            console.log(err);
        });
    }

    async get(id) {
        return await this.School.findOne({
            where: {id: id}
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    async getAll() {
        return await this.School.findAll({
            where: {}
        })
        .catch(function (err) {
            console.log(err);
        });
    }

    async delete(id) {
        return this.School.destroy({
            where: {id: id}
        }).catch(function (err) {
            console.log(err);
        });
    }

}
module.exports = SchoolService;