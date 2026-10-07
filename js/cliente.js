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

    const cpfLimpo = cpf.replace(/\D/g, '
