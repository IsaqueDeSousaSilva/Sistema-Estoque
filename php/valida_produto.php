<?php
header('Content-Type: application/json');

$dados = json_decode(file_get_contents('php://input'), true);

$nome = trim($dados['nome'] ?? '');
$descricao = trim($dados['descricao'] ?? '');
$preco = floatval($dados['preco'] ?? 0);
$quantidade = intval($dados['quantidade'] ?? 0);
$categoria = trim($dados['categoria'] ?? '');
$fornecedor = trim($dados['fornecedor'] ?? '');

if (empty($nome) || empty($descricao) || empty($categoria) || empty($fornecedor)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Campos obrigatórios não preenchidos.']);
    exit;
}

if ($preco <= 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Preço inválido.']);
    exit;
}

if ($quantidade < 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Quantidade inválida.']);
    exit;
}

$valorTotal = $preco * $quantidade;

if ($preco < 100) {
    $faixa = 'Econômico';
} elseif ($preco < 1000) {
    $faixa = 'Intermediário';
} else {
    $faixa = 'Premium';
}

echo json_encode([
    'sucesso' => true,
    'mensagem' => "Produto '$nome' cadastrado! Valor total em estoque: R$ " . 
                  number_format($valorTotal, 2, ',', '.') . 
                  " | Faixa: $faixa"
]);
?>
