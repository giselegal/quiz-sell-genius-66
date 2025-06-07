const fs = require('fs');
const path = require('path');

console.log('🔄 Iniciando sincronização manual do Lovable...');

// Atualizar timestamp
const timestamp = Math.floor(Date.now() / 1000);
const triggerContent = `LOVABLE_FORCE_SYNC=${timestamp}`;

fs.writeFileSync('.lovable-trigger', triggerContent);
console.log('✅ Timestamp atualizado:', timestamp);

// Verificar configuração
if (fs.existsSync('.lovable')) {
    const config = JSON.parse(fs.readFileSync('.lovable', 'utf8'));
    config.sync.timestamp = timestamp;
    config.lastUpdate = new Date().toISOString();
    
    fs.writeFileSync('.lovable', JSON.stringify(config, null, 2));
    console.log('✅ Configuração .lovable atualizada');
}

console.log('🎉 Sincronização manual concluída!');
