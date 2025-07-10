module.exports = class teacherController {
    static async dashboard(req, res) {
        try {
            res.render('teacher/dashboard');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial do teacher');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
    static async classes(req, res) {
        try {
            res.render('teacher/classes')
        } catch(error) {
            console.log(error)
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
    static async grades(req, res) {
        try {
            res.render('teacher/grades');
        } catch (error) {
            console.log(error, 'erro ao renderizar a página');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
}