function disabledButton(buttonEl, inactiveButtonClass) {
  buttonEl.classList.add(inactiveButtonClass);
  buttonEl.setAttribute('disabled', 'disabled');
}

function enabledButton(buttonEl, inactiveButtonClass) {
  buttonEl.classList.remove(inactiveButtonClass);
  buttonEl.removeAttribute('disabled');
}

export {disabledButton, enabledButton};
