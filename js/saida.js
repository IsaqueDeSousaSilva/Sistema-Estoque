function enviarSaida() {
    const produto = document.getElementById('produto').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const data = document.getElementById('data').value;
    const cliente = document.getElementById('cliente').value.trim();
    const motivo = document.getElementById('motivo').value;
    const observacao = document.getElementById('observacao').value.trim();

    const msg = document.getElementById('mensagem');

    if (!produto || !data || !cliente || !motivo) {
        msg.innerText = 'Preencha todos os campos obrigatórios!';
        msg.style.color = 'red';
        return;
    }

    if (isNaN(quantidade) || quantidade <= 0) {
        msg.innerText = 'Quantidade deve ser maior que zero!';
        msg.style.color = 'red';
        return;
    }

    const hoje = new Date().toISOString().split('T')[0];
    if (data > hoje) {
        msg.innerText = 'Data não pode ser futura!';
        msg.style.color = 'red';
        return;
    }

    if (motivo === 'Perda' && !observacao) {
        msg.innerText = 'Para perdas, é obrigatório informar a observação!';
        msg.style.color = 'red';
        return;
    }

    fetch('../php/valida_saida.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto, quantidade, data, cliente, motivo, observacao })
    })
    .then(response => response.json())
    .then(data => {
        msg.innerText = data.mensagem;
        msg.style.color = data.sucesso ? 'green' : 'red';
        if (data.sucesso) {
            document.getElementById('formSaida').reset();
        }
    })
    .catch(error => {
        msg.innerText = 'Erro ao enviar: ' + error;
        msg.style.color = 'red';
    });
}
