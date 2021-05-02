const clipboard = () => {

//= notification.js

    const copiedItem = qSel('.contacts__item--address');

    copiedItem.addEventListener('click', copyText);

    function copyText(event) {

        const createHiddenInput = () => {
            const item = createNodeWithClass('input', 'contacts__input--hidden');
            item.value = this.textContent.trim();
            return item;
        }

        const copyFromInput = (input) => {
            input.select();
            document.execCommand("copy");
        };

        const hiddenInput = createHiddenInput();
        document.body.append(hiddenInput);
        
        if (hiddenInput.value != '') {
            copyFromInput(hiddenInput);
            showNotification('Succefully copied', 2000, event);
        }

        hiddenInput.remove();
    };
};