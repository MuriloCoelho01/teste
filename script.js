function renderOptions(data, name, container) {
    container.innerHTML = '';

    data.forEach(item => {
        const label = document.createElement('label');
        label.className = 'option-label';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = name;
        input.value = item.name;
        input.className = 'mr-3 w-5 h-5';

        const span = document.createElement('span');
        span.className = 'text-gray-700';
        span.textContent = `${item.emoji} ${item.name}${item.description ? ' (' + item.description + ')' : ''}`;

        label.appendChild(input);
        label.appendChild(span);
        container.appendChild(label);
    });
}

fetch('menu.json')
  .then(res => res.json())
  .then(data => {
      renderOptions(data.burgers, 'burger', document.getElementById('burger-section'));
      renderOptions(data.drinks, 'drink', document.getElementById('drink-section'));
      renderOptions(data.payments, 'payment', document.getElementById('payment-section'));
  })
  .catch(err => {
      console.error('Erro ao carregar o menu.json:', err);
      alert('Erro ao carregar o cardápio.');
  });

// Função para mostrar mensagens customizadas
function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    messageText.textContent = message;
    messageBox.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const orderBtn = document.getElementById('orderOnWhatsappBtn');
    const phoneNumber =  '5511977923128';
    console.log(phoneNumber)

    orderBtn.addEventListener('click', () => {
        const selectedBurger = document.querySelector('input[name="burger"]:checked');
        const selectedDrink = document.querySelector('input[name="drink"]:checked');
        const selectedPayment = document.querySelector('input[name="payment"]:checked');

        if (!selectedBurger) {
            showMessage('Por favor, selecione um hambúrguer.');
            return;
        }
        if (!selectedDrink) {
            showMessage('Por favor, selecione uma bebida.');
            return;
        }
        if (!selectedPayment) {
            showMessage('Por favor, selecione uma forma de pagamento.');
            return;
        }

        let message = `Olá, gostaria de fazer um pedido:%0A`;
        message += `🍔 1x ${selectedBurger.value}%0A`;
        message += `🥤 1x ${selectedDrink.value}%0A%0A`;
        message += `💳 Forma de pagamento: ${selectedPayment.value}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });
});
