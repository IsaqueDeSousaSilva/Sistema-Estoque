function enviarProduto() {
    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const categoria = document.getElementById('categoria').value.trim();
    const fornecedor = document.getElementById('fornecedor').value.trim();

    const msg = document.getElementById('mensagem');

    // Validação no cliente
    if (!nome || !descricao || !categoria || !fornecedor) {
        msg.innerText = ' Preencha todos os campos de texto!';
        msg.style.color = 'red';
        return;
    }

    if (isNaN(preco) || preco <= 0) {
        msg.innerText = ' Preço deve ser maior que zero!';
        msg.style.color = 'red';
        return;
    }

    if (isNaN(quantidade) || quantidade < 0) {
        msg.innerText = ' Quantidade inválida!';
        msg.style.color = 'red';
        return;
    }

    // Envio via Fetch (AJAX)
    fetch('../php/valida_produto.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao, preco, quantidade, categoria, fornecedor })
    })
    .then(response => response.json())
    .then(data => {
        msg.innerText = data.mensagem;
        msg.style.color = data.sucesso ? 'green' : 'red';
        if (data.sucesso) {
            document.getElementById('formProduto').reset();
        }
    })
    .catch(error => {
        msg.innerText = 'Erro ao enviar: ' + error;
        msg.style.color = 'red';
    });
}
