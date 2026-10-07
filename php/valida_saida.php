<?php
header('Content-Type: application/json');

$dados = json_decode(file_get_contents('php://input'), true);

$produto = trim($dados['produto'] ?? '');
$quantidade = intval($dados['quantidade'] ?? 0);
$data = trim($dados['data'] ?? '');
$cliente = trim($dados['cliente'] ?? '');
$motivo = trim($dados['motivo'] ?? '');
$observacao = trim($dados['observacao'] ?? '');

if (empty($produto) || empty($data) || empty($cliente) || empty($motivo)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Campos obrigatórios não preenchidos.']);
    exit;
}

if ($quantidade <= 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Quantidade inválida.']);
    exit;
}

if (strtotime($data) > time()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Data não pode ser futura.']);
    exit;
}

if ($motivo === 'Perda' && empty($observacao)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro: Perdas exigem observação.']);
    exit;
}

$alertas = [
    'Venda' => 'Venda registrada com sucesso!',
    'Perda' => 'Perda registrada. Verifique o estoque!',
    'Devolução' => 'Devolução registrada.',
    'Transferência' => 'Transferência registrada.'
];

$alerta = $alertas[$motivo] ?? 'Saída registrada.';

$protocolo = 'SAI-' . date('Ymd') . '-' . strtoupper(substr(md5($produto . $data), 0, 5));

echo json_encode([
    'sucesso' => true,
    'mensagem' => "$alerta Protocolo: $protocolo | Produto: $produto | Qtd: $quantidade"
]);
?>
