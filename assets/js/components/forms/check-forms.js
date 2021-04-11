const checkForms = () => {
    const btnSubmit = qSel('.btn--book');

    btnSubmit.addEventListener('click', submitForm);

    function submitForm(e) {
        const formBlock = this.parentNode,
            formPhone = qSel('.form__elem--phone', formBlock),
            formEmail = qSel('.form__elem--email', formBlock),
            formPeople = qSel('.select__hidden--people', formBlock),
            formTime = qSel('.select__hidden--time', formBlock),
            formDate = qSel('.form__elem--date', formBlock),
            formName = qSel('.form__elem--name', formBlock);

        const nameReg = /^[a-z]{2,60}$/,
            emailReg = /^[a-z0-9][a-z0-9.-_]{2,62}[a-z0-9][@][a-z0-9]{1,30}[.][a-z]{2,10}([.][a-z]{2,10})?$/,
            phoneReg = /^[+][0-9]{3}[(][0-9]{2}[)][0-9]{2}[-][0-9]{2}[-][0-9]{3}$/,
            peopleReg = /^[0-9]{1,2}$/,
            dateReg = /^[0-9]{2}[/][0-9]{2}$/,
            timeReg = /^[0-9]{2}[:][0-9]{2}$/;
        
        const forms = [
            [formName, nameReg],
            [formPhone, phoneReg],
            [formEmail, emailReg],
            [formPeople, peopleReg],
            [formTime, timeReg],
            [formDate, dateReg]
        ];
        
        const validInputFields = () => {
            for (let form of forms) {
                if (checkByReg(form[0], form[1]) != 0) {
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
        listenFormEdit();

        function showInputError(item) {
            const formSection = item.closest('.form__section');

            formSection.classList.add('wrong-input');
            formSection.classList.add('selected');
        }

        function listenFormEdit() {
            for (let form of forms) {
                if (form[0].tagName == 'INPUT') {
                    form[0].addEventListener('input', () => {
                        setTimeout(() => {
                            if (checkByReg(form[0], form[1]) == 0) {
                                hideInputError(form[0]);
                            }
                        }, 1);
                    })
                }
            }
        }

    } //submit forms
};