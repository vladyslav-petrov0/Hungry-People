const checkForms = () => {
    const submitBtns = qSelA('.btn--form');

    for (let btn of submitBtns) {
        btn.addEventListener('click', submitForm);
    }

    function submitForm(e) {
        const qSelForm = (el) => qSel(el, this.parentNode);
        
        const forms = new Map()
        .set(qSelForm('.form__elem--name'), /^[a-z0-9]{2,60}$/)
        .set(qSelForm('.form__elem--phone'), /^[+][0-9]{3}[(][0-9]{2}[)][0-9]{2}[-][0-9]{2}[-][0-9]{3}$/)
        .set(qSelForm('.form__elem--email'), /^[a-z0-9][a-z0-9.-_]{2,62}[a-z0-9][@][a-z0-9]{1,30}[.][a-z]{2,10}([.][a-z]{2,10})?$/)
        .set(qSelForm('.select__hidden--people'), /^[0-9]{1,2}$/)
        .set(qSelForm('.select__hidden--time'), /^[0-9]{2}[:][0-9]{2}$/)
        .set(qSelForm('.form__elem--date'), /^[0-9]{2}[/][0-9]{2}$/)
        .set(qSelForm('.form__elem--message'), /^[a-z0-9]{2,60}$/);

        const validInputFields = () => {
            for (let form of forms) {
                if (!form[0]) continue;

                if (checkByReg(form[0], form[1]) != 0) {
                    const showInputError = item => {
                        const formSection = item.closest('.form__section');
            
                        formSection.classList.add('wrong-input');
                        formSection.classList.add('selected');
                    }

                    showInputError(form[0]);
                    e.preventDefault();

                    const changeBtnColor = () => {
                        if (!this.classList.contains('rejected')) {
                            this.classList.add('rejected');
                            setTimeout(() => {
                                this.classList.remove('rejected');
                            }, 1000);
                        }
                    };

                    changeBtnColor();
                }
            }
        }

        validInputFields();
        listenForValidInput();

        function listenForValidInput() {
            for (let form of forms) {
                if (!form[0]) continue;

                if (form[0].tagName == 'INPUT' || form[0].tagName == 'TEXTAREA') {
                    form[0].addEventListener('input', () => {
                        setTimeout(() => {
                            if (!checkByReg(form[0], form[1])) {
                                hideInputError(form[0]);
                            }
                        }, 1);
                    })
                }
            }
        }

    }
};