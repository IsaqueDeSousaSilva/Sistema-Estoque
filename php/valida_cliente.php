<?php
header('Content-Type: application/json');

$dados = json_decode(file_get_contents('php://input'), true);

$nome = trim($dados['nome'] ?? '');
$cpf = trim($dados['cpf'] ?? '');
$telefone = trim($dados['telefone'] ?? '');
$email = trim($dados['email'] ?? '');
$endereco = trim($dados['endereco'] ?? '');
$dataNascimento = trim($dados['dataNascimento'] ?? '');

if (empty($nome) || empty($cpf) || empty($telefone) || empty($email) || empty($endereco) || empty($dataNascimento)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Campos obrigatórios não preenchidos.']);
    exit;
}

$cpfLimpo = preg_replace('/\D/', '', $cpf);
if (strlen($cpfLimpo) !== 11) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: CPF inválido.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: E-mail inválido.']);
    exit;
}

$timestampNasc = strtotime($dataNascimento);
if ($timestampNasc === false) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Data de nascimento inválida.']);
    exit;
}
if ($timestampNasc > time()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Data de nascimento não pode ser futura.']);
    exit;
}

$idade = floor((time() - $timestampNasc) / (365.25 * 24 * 60 * 60));
if ($idade < 18) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Cliente deve ter pelo menos 18 anos.']);
    exit;
}

$codigoCliente = 'CLI-' . strtoupper(substr(md5($cpfLimpo), 0, 6));

if ($idade < 25) {
    $faixa = 'Jovem';
} elseif ($idade < 60) {
    $faixa = 'Adulto';
} else {
    $faixa = 'Sênior';
}

$cpfMascarado = substr($cpfLimpo, 0, 3) . '.***.***-' . substr($cpfLimpo, -2);

echo json_encode([
    'sucesso' => true,
    'mensagem' => "Cliente '$nome' cadastrado! Código: $codigoCliente | CPF: $cpfMascarado | Faixa: $faixa ($idade anos)"
]);
?>
