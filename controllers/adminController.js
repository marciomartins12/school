

module.exports = class adminController {
    static async dashboard(req, res) {
        try {
            res.render('admin/dashboard');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial do admin');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
     static async student(req, res) {
        try {
            res.render('admin/student');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial do admin');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
}
