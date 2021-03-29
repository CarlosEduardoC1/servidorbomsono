var Service = require('node-windows').Service;
// Criando um novo objeto do Serviço
var svc = new Service({
//Nome do servico
name:'server',
//Descricao que vai aparecer no Gerenciamento de serviço do Windows
description: 'Servidor sistema de estoque',
//caminho absoluto do seu script
script: 'D:\_projects\estoque\back'
});
svc.on('uninstall',function(){
console.log('Uninstall complete.');
});
// Desistalar serviço.
svc.uninstall();