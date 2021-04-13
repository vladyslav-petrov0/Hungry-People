const templatesForms = () => {
    const formTemplates = qSelA('.form__elem--template');

    for (let formItem of formTemplates) {

        const userInput = [];
        const emptyField = '_';
        let formTemplate;
        
        setDefaultTemplate();

        formItem.addEventListener('focus', (e) => {
            setInputValue();
            formItem.addEventListener('input', defineUserInput);

            formItem.addEventListener('blur', () => {
                if (userInput[0] == emptyField) unselectForm(formItem);
                formItem.removeEventListener('input', defineUserInput);
            });
        });

        function defineUserInput(e) {

            if (e.data == null) {
                if (userInput.includes(emptyField)) {
                    userInput.splice(userInput.indexOf(emptyField) - 1, 1, emptyField);
                } else {
                    userInput.splice(userInput.length - 1, 1, emptyField);
                }
            } else {
                if (e.data.match(/[0-9]/) && userInput.includes(emptyField)) {
                    userInput.splice(userInput.indexOf(emptyField), 1, e.data);
                }
            }

            setInputValue();
        }

        function setInputValue() {
            const currentValue = Array.from(formTemplate);
            let counter = 0;

            currentValue.forEach((item, index, arr) => {
                if (item == emptyField) {
                    arr[index] = userInput[counter];
                    counter++;
                } 
            });
            
            formItem.value = currentValue.join('');
        }

        function setDefaultTemplate() {
            defineDefaultTemplate();

            formTemplate = formTemplate.replace(/[.]/g, emptyField);
            for (let i = 0; i < formTemplate.match(new RegExp(emptyField, 'g')).length; i++) {
                userInput.push(emptyField);
            }

            function defineDefaultTemplate() {
                if (formItem.classList.contains('form__elem--phone')) formTemplate = `+380(..)..-..-...`;
                if (formItem.classList.contains('form__elem--date')) formTemplate = `../..`;
            }
        }
    }
};