

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
            console.log(error, 'erro ao renderizar a página estudante do admin');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
    static async teacher(req, res) {
        try {
            res.render('admin/teacher');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página teacher do admin');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
    static async event(req, res) {
        try {
            res.render('admin/events');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página eventos do admin');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
    static async class(req, res) {
        try {
            res.render('admin/class');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página turmas do admin');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
    static async settings(req, res) {
        try {
            res.render('admin/settings');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página config do admin');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
}
