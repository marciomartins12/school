

module.exports = class loginController {
    static async login(req, res) {
        try {
            res.render('login/login');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página de login');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
     
}
