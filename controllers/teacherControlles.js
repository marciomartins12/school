module.exports = class teacherController {
    static async dashboard(req, res) {
        try {
            res.send("so testando")
        } catch (error) {
            console.log(error, 'erro ao renderizar a página inicial do teacher');
            res.status(500).serd("erro ao buscar a pagina");
        }
    }
}