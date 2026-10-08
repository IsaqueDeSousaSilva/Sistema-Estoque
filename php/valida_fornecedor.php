<?php
header('Content-Type: application/json');

$dados = json_decode(file_get_contents('php://input'), true);

$nome = trim($dados['nome'] ?? '');
$cnpj = trim($dados['cnpj'] ?? '');
$telefone = trim($dados['telefone'] ?? '');
$email = trim($dados['email'] ?? '');
$endereco = trim($dados['endereco'] ?? '');
$produtoFornecido = trim($dados['produtoFornecido'] ?? '');

if (empty($nome) || empty($cnpj) || empty($telefone) || empty($email) || empty($endereco) || empty($produtoFornecido)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Campos obrigatórios não preenchidos.']);
    exit;
}

$cnpjLimpo = preg_replace('/\D/', '', $cnpj);
if (strlen($cnpjLimpo) !== 14) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: CNPJ inválido.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: E-mail inválido.']);
    exit;
}

$codigoFornecedor = 'FORN-' . strtoupper(substr(md5($cnpjLimpo), 0, 6));

echo json_encode([
    'sucesso' => true,
    'mensagem' => "Fornecedor '$nome' cadastrado! Código interno: $codigoFornecedor | Produto: $produtoFornecido"
]);
?>
