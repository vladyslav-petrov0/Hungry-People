const clipboard = () => {

//= notification.js

    const copiedItem = qSel('.contacts__item--address');

    copiedItem.addEventListener('click', copyItem);

    function copyItem() {

        const getHiddenInput = () => {
            const item = document.createElement('input');
            item.classList.add('contacts__input--hidden');
            item.value = this.textContent.trim();

            return item;
        }

        const copyFromInput = (input) => {
            input.select();
            document.execCommand("copy");
        };

        const hiddenInput = getHiddenInput();
        document.body.append(hiddenInput);
        
        if (hiddenInput != '') {
            copyFromInput(hiddenInput);
            notification('Copied');
        }

        hiddenInput.remove();
    };
};