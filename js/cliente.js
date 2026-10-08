function enviarCliente() {
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const email = document.getElementById('email').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value;

    const msg = document.getElementById('mensagem');

    if (!nome || !cpf || !telefone || !email || !endereco || !dataNascimento) {
        msg.innerText = 'Preencha todos os campos!';
        msg.style.color = 'red';
        return;
    }

    const cpfLimpo = cpf.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
        msg.innerText = 'CPF deve conter 11 dígitos!';
        msg.style.color = 'red';
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        msg.innerText = 'E-mail inválido!';
        msg.style.color = 'red';
        return;
    }

    const hoje = new Date().toISOString().split('T')[0];

    if (dataNascimento > hoje) {
        msg.innerText = 'A data de nascimento não pode ser futura!';
        msg.style.color = 'red';
        return;
    }

    fetch('../php/valida_cliente.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            cpf,
            telefone,
            email,
            endereco,
            dataNascimento
        })
    })
    .then(response => response.json())
    .then(data => {
        msg.innerText = data.mensagem;
        msg.style.color = data.sucesso ? 'green' : 'red';

        if (data.sucesso) {
            document.getElementById('formCliente').reset();
        }
    })
    .catch(error => {
        msg.innerText = 'Erro ao enviar: ' + error;
        msg.style.color = 'red';
    });
}
