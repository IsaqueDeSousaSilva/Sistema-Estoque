function enviarFornecedor() {
    const nome = document.getElementById('nome').value.trim();
    const cnpj = document.getElementById('cnpj').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const produtoFornecido = document.getElementById('produtoFornecido').value.trim();

    const msg = document.getElementById('mensagem');

    // Validação
    if (!nome || !cnpj || !telefone || !email || !endereco || !produtoFornecido) {
        msg.innerText = ' Preencha todos os campos!';
        msg.style.color = 'red';
        return;
    }

    // Validação de CNPJ (14 dígitos)
    const cnpjLimpo = cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) {
        msg.innerText = ' CNPJ deve conter 14 dígitos!';
        msg.style.color = 'red';
        return;
    }

    // Validação de e-mail
    if (!email.includes('@') || !email.includes('.')) {
        msg.innerText = ' E-mail inválido!';
        msg.style.color = 'red';
        return;
    }

    // Envio via Fetch
    fetch('../php/valida_fornecedor.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cnpj, telefone, email, endereco, produtoFornecido })
    })
    .then(response => response.json())
    .then(data => {
        msg.innerText = data.mensagem;
        msg.style.color = data.sucesso ? 'green' : 'red';
        if (data.sucesso) {
            document.getElementById('formFornecedor').reset();
        }
    })
    .catch(error => {
        msg.innerText = 'Erro ao enviar: ' + error;
        msg.style.color = 'red';
    });
}
