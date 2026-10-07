<?php
header('Content-Type: application/json');

$dados = json_decode(file_get_contents('php://input'), true);

$produto = trim($dados['produto'] ?? '');
$quantidade = intval($dados['quantidade'] ?? 0);
$data = trim($dados['data'] ?? '');
$fornecedor = trim($dados['fornecedor'] ?? '');
$precoUnitario = floatval($dados['precoUnitario'] ?? 0);
$notaFiscal = trim($dados['notaFiscal'] ?? '');

if (empty($produto) || empty($data) || empty($fornecedor) || empty($notaFiscal)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Campos obrigatórios não preenchidos.']);
    exit;
}

if ($quantidade <= 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Quantidade inválida.']);
    exit;
}

if ($precoUnitario <= 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Preço unitário inválido.']);
    exit;
}

$valorTotal = $quantidade * $precoUnitario;

if (strtotime($data) > time()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Data não pode ser futura.']);
    exit;
}

$protocolo = 'ENT-' . date('Ymd') . '-' . strtoupper(substr(md5($notaFiscal), 0, 5));

echo json_encode([
    'sucesso' => true,
    'mensagem' => "Entrada registrada! Protocolo: $protocolo | Valor total: R$ " . 
                  number_format($valorTotal, 2, ',', '.')
]);
?>
