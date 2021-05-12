const modal = () => {
    const bookTableBtn = qSel('.btn--book-modal'),
        bookTableModal = qSel('.modal--book');

    const bindBtnToModal = (btn, modal) => {

        const showModal = (event) => {
            modal.classList.add('active');
            
            document.body.style.overflow = 'hidden';
            currentNoScrollSessions.push('modal');

            const removeModal = (event) => {
                const btnModalExit = qSel('.modal__exit', modal);

                if (event.target == btnModalExit || event.target == modal) {
                    modal.classList.remove('active');

                    document.body.style.overflow = '';
                    currentNoScrollSessions.splice(currentNoScrollSessions.indexOf('modal'), 1);
                    
                    document.removeEventListener('click', removeModal);
                }
            };

            document.addEventListener('click', removeModal);
        }

        btn.addEventListener('click', showModal);
    };

    bindBtnToModal(bookTableBtn, bookTableModal);
};