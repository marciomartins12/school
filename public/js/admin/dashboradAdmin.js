document.addEventListener('DOMContentLoaded', () => {
    console.log('Sistema Escolar - Área Administrativa carregada!');

    const addAgendaBtn = document.getElementById('add-agenda-btn');
    const agendaModal = document.getElementById('agenda-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal-btn')
    
 
    if (addAgendaBtn) { 
        addAgendaBtn.addEventListener('click', () => {
            console.log("clicquei no fudido")
            agendaModal.classList.add('active');
        });
    }

    closeModalBtns.forEach(button => {
        button.addEventListener('click', () => {
            agendaModal.classList.remove('active');
            addAgendaForm.reset();
        });
    });


    if (agendaModal) { 
        agendaModal.addEventListener('click', (event) => {
            if (event.target === agendaModal) {
                agendaModal.classList.remove('active');
                addAgendaForm.reset();
            }
        });
    }

   
});