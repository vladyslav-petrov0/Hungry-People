const forms = () => {

//= forms/anim-forms.js
//= forms/check-forms.js
//= forms/templates-forms.js
//= forms/select-forms.js
//= custom-scroll.js

    clearForms();
    animForms();
    formsSelect();
    customScroll();
    templatesForms();
    checkForms();

    // GENERAL FUNCTIONS
    
    function getElemHeight(el) {
        return parsF(styles(el).height);
    }
    
    function getElemMaxHeight(el) {
        return parsF(styles(el).maxHeight);
    }

    function isDeviceMobile() {
        return (window.innerWidth > 768) ? false : true;
    }

    function clearForms() {
        for (let item of qSelA('input, textarea')) {
            item.value = '';
        }
    }

    function checkByReg(form, reg = /[0-9]/) {
        if (form.tagName == 'INPUT' || form.tagName == 'TEXTAREA') {
            return form.value.toLowerCase().trim().search(reg);
        }
        if (form.tagName == 'SELECT') {
            return form.getAttribute('value').toLowerCase().trim().search(reg);
        }
    }

    function hideInputError(item) {
        const formSection = item.closest('.form__section');

        formSection.classList.remove('wrong-input');
        formSection.classList.add('selected');
    }

    function unselectForm(item) {
        const nodeLabel = qSel('.form__label', item.parentNode);

        nodeLabel.classList.remove('chosen');
        item.parentNode.classList.remove('selected');
        item.parentNode.classList.remove('wrong-input');
        item.value = '';
    }

}; // end
