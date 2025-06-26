document.addEventListener('DOMContentLoaded', function() {
    toggleLoginFields(); 
});

function toggleLoginFields() {
    const accountType = document.getElementById('account-type').value;
    const alunoFields = document.getElementById('aluno-fields');
    const professorFields = document.getElementById('professor-fields');
    const adminFields = document.getElementById('admin-fields');
    const refeitorioFields = document.getElementById('refeitorio-fields');

    alunoFields.classList.add('hidden');
    professorFields.classList.add('hidden');
    adminFields.classList.add('hidden');
    refeitorioFields.classList.add('hidden');

    
    if (accountType === 'aluno') {
        alunoFields.classList.remove('hidden');
    } else if (accountType === 'professor') {
        professorFields.classList.remove('hidden');
    } else if (accountType === 'admin') {
        adminFields.classList.remove('hidden');
    } else if (accountType === 'refeitorio') {
        refeitorioFields.classList.remove('hidden');
    }
}