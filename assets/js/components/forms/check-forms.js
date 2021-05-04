const checkForms = () => {
    const submitBtns = qSelA('.btn--form');

    for (let btn of submitBtns) {
        btn.addEventListener('click', submitForm);
    }

    function submitForm(e) {
        const formBlock = this.parentNode,
            formPhone = qSel('.form__elem--phone', formBlock),
            formEmail = qSel('.form__elem--email', formBlock),
            formPeople = qSel('.select__hidden--people', formBlock),
            formTime = qSel('.select__hidden--time', formBlock),
            formDate = qSel('.form__elem--date', formBlock),
            formName = qSel('.form__elem--name', formBlock),
            formMessage = qSel('.form__elem--message', formBlock);

        const nameReg = /^[a-z0-9]{2,60}$/,
            emailReg = /^[a-z0-9][a-z0-9.-_]{2,62}[a-z0-9][@][a-z0-9]{1,30}[.][a-z]{2,10}([.][a-z]{2,10})?$/,
            phoneReg = /^[+][0-9]{3}[(][0-9]{2}[)][0-9]{2}[-][0-9]{2}[-][0-9]{3}$/,
            peopleReg = /^[0-9]{1,2}$/,
            dateReg = /^[0-9]{2}[/][0-9]{2}$/,
            timeReg = /^[0-9]{2}[:][0-9]{2}$/;
        
        const forms = new Map([
            [formName, nameReg],
            [formPhone, phoneReg],
            [formEmail, emailReg],
            [formPeople, peopleReg],
            [formTime, timeReg],
            [formDate, dateReg],
            [formMessage, nameReg]
        ]);
        
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

    } //submit forms
};