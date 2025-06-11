document.addEventListener('DOMContentLoaded', () => {
    console.log('Sistema Escolar - Gerenciamento de Alunos carregado!');

    document.getElementById('novo-aluno-btn').addEventListener('click', () => {
        console.log("cliquei no fudido")
        document.getElementById('student-form-modal').classList.add('active')
    });


    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
        });
    });
    document.getElementById('student-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const aluno = {
            matricula: document.getElementById('student-matricula').value,
            nome: document.getElementById('student-name').value,
            email: document.getElementById('student-email').value,
            turma: document.getElementById('student-turma').value,
            status: document.getElementById('student-status').value,
            media: document.getElementById('student-media').value,
            presenca: document.getElementById('student-presenca').value,
            responsavel: document.getElementById('student-responsavel').value
        };

        console.log('Aluno salvo:', aluno);
        document.getElementById('student-form-modal').classList.add('active');
    });
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            document.getElementById('delete-student-id').value = id;
            document.getElementById('delete-confirm-modal').classList.add('active');
        });
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', () => {
        const id = document.getElementById('delete-student-id').value;
        console.log('Excluir aluno ID:', id);
        document.getElementById('delete-confirm-modal').classList.add('active');
    });

});