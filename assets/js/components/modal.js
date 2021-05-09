const modal = () => {
    const bookTableBtn = qSel('.btn--book-modal'),
        bookTableModal = qSel('.modal--book');

    const bindBtnToModal = (btn, modal) => {

        const showModal = (event) => {
            modal.classList.add('active');
            
            document.body.style.overflow = 'hidden';
            currentNoScrollSessions.push(1);

            const removeModal = (event) => {
                const btnModalExit = qSel('.modal__exit', modal);

                if (event.target == btnModalExit || event.target == modal) {
                    modal.classList.remove('active');

                    document.body.style.overflow = '';
                    currentNoScrollSessions.pop();
                    
                    document.removeEventListener('click', removeModal);
                }
            };

            document.addEventListener('click', removeModal);
        }

        btn.addEventListener('click', showModal);
    };

    bindBtnToModal(bookTableBtn, bookTableModal);
};