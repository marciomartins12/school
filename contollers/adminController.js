
const bcrypt = require('bcryptjs');

module.exports = class AdminController {
    static async dashboar(req, res) {
        try {
            res.render('dashboard');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial do admin');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
}
