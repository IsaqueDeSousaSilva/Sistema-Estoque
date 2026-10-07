function enviarEntrada() {
    const produto = document.getElementById('produto').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const data = document.getElementById('data').value;
    const fornecedor = document.getElementById('fornecedor').value.trim();
    const precoUnitario = parseFloat(document.getElementById('precoUnitario').value);
    const notaFiscal = document.getElementById('notaFiscal').value.trim();

    const msg = document.getElementById('mensagem');

    if (!produto || !data || !fornecedor || !notaFiscal) {
        msg.innerText = 'Preencha todos os campos!';
        msg.style.color = 'red';
        return;
    }

    if (isNaN(quantidade) || quantidade <= 0) {
        msg.innerText = 'Quantidade deve ser maior que zero!';
        msg.style.color = 'red';
        return;
    }

    if (isNaN(precoUnitario) || precoUnitario <= 0) {
        msg.innerText = 'Preço unitário inválido!';
        msg.style.color = 'red';
        return;
    }

    const hoje = new Date().toISOString().split('T')[0];
    if (data > hoje) {
        msg.innerText = 'Data não pode ser futura!';
        msg.style.color = 'red';
        return;
    }

    fetch('../php/valida_entrada.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto, quantidade, data, fornecedor, precoUnitario, notaFiscal })
    })
    .then(response => response.json())
    .then(data => {
        msg.innerText = data.mensagem;
        msg.style.color = data.sucesso ? 'green' : 'red';
        if (data.sucesso) {
            document.getElementById('formEntrada').reset();
        }
    })
    .catch(error => {
        msg.innerText = 'Erro ao enviar: ' + error;
        msg.style.color = 'red';
    });
}
