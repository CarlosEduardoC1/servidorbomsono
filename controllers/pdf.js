'use-strict';
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { Base64Encode } = require('base64-stream');

exports.salvaPDF = async (req, res, next) => {

    let pdfDoc = new PDFDocument;

    pdfDoc.image('./assets/logo.jpg', 80, 30, { scale: 0.1 });
    pdfDoc.fontSize(12);
    pdfDoc.moveDown();
    pdfDoc.text("BOMSONO COLCHÕES", 95, 80, { align: 'center' });
    pdfDoc.text("FONE: (61) 3627-0806", 95, 100, { align: 'center' });
    pdfDoc.text("QD.52/54 BL. 03 LJ. 03 SETOR CENTRAL GAMA-DF", 95, 120, { align: 'center' });
    // QUEBRA DE LINHA
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.text("VENDA DE PRODUTOS", { align: 'center', });
    // QUEBRA DE LINHA
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.text("Dados do cliente", { align: 'left', });
    // QUEBRA DE LINHA
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.text("Nome do cliente: " + req.body.nome_cliente, { align: 'left', });
    pdfDoc.text("CPF: " + req.body.cpf, { align: 'left' })
    pdfDoc.text("Endereço do cliente: " + req.body.endereco_cliente + " " + req.body.bairro_cliente, { align: 'left', });
    pdfDoc.text("Telefone do cliente - Celular: " + req.body.fone_cliente_celular + " -  Residencial: " + req.body.fone_cliente_residencia, { align: 'left', });

    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.text("Dados do produto", { align: 'left', });

    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.text("Produto: " + req.body.produto, { align: 'left', });
    pdfDoc.text("Quantidade: " + req.body.qnt, { align: 'left', });
    pdfDoc.text("Forma de pagamento: " + req.body.forma_pagamento, { align: 'left', });
    pdfDoc.moveDown();
    pdfDoc.text("Valor total da venda: R$" + req.body.total + " em " + req.body.parcelas + " parcela(s).", { align: 'left', });
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();

    pdfDoc.text(req.body.obs, { align: 'left' });
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.moveDown();
    pdfDoc.text("Venda realizada por: " + req.body.operador + " em " + req.body.data_hora, { align: 'left', });
    pdfDoc.moveDown();
    pdfDoc.text("Agradecemos a preferência. Volte sempre!", { align: 'center', });

    // pdfDoc.text("Documento técnico à respeito do serviço realizado no dia " + dados.dtAgendamento + " às " + dados.hrInicio);
    // pdfDoc.text("O serviço foi acompanhado por " + dados.clienteNome);

    // pdfDoc.moveDown();
    // pdfDoc.moveDown();
    // pdfDoc.text("Dados do Cliente: " + dados.cliente);
    // pdfDoc.text("Tipo de atendimento: " + dados.tipo);
    // pdfDoc.text("Solicitação: " + dados.solicita);

    // pdfDoc.moveDown();
    // pdfDoc.moveDown();

    // pdfDoc.text("Data de início: " + dados.dtAgendamento);
    // pdfDoc.text("Hora de início: " + dados.hrInicio);
    // pdfDoc.text("Data de término: " + dados.dtFinalizacao);
    // pdfDoc.text("Hora de término: " + dados.hrFinalizacao);

    // pdfDoc.moveDown();
    // pdfDoc.moveDown();

    // pdfDoc.text("Troca de placas: " + dados.troca + "  " + dados.placas)

    // pdfDoc.moveDown();

    // pdfDoc.text("Serviço realizado: " + dados.servico)
    // pdfDoc.text("Situação: " + dados.situacao)
    // pdfDoc.text("Tempo decorrido do atendimento: " + dados.tmpAtendimento + "h")

    // pdfDoc.moveDown()

    // pdfDoc.text("Atendimento realizado por: " + dados.tecnico)

    // pdfDoc.moveDown();
    // pdfDoc.moveDown();
    // pdfDoc.moveDown();
    // pdfDoc.moveDown();

    // pdfDoc.text("WP INOVAÇÕES TÉCNOLÓGICAS", {
    //     align: 'center'
    // });
    // pdfDoc.text("Contato: (61) 998678333", {
    //     align: 'center'
    // });
    // pdfDoc.text("Equipe de Supórte Técnico", {
    //     align: 'center'
    // });

    // FIM DO ARQUIVO PDF
    var finalString = '';
    var stream = pdfDoc.pipe(new Base64Encode());
    pdfDoc.end();

    stream.on('data', (chunk) => {
        finalString += chunk;
    });

    stream.on('end', () => {
        res.status(200).json({ pdf: finalString, msg: "Venda cadastrada com sucesso!", status: 200 });
    })
}
