const https = require('https');

console.log('🧪 Testando conexão com Lovable...');

// Testar conexão com api.lovable.dev
const testConnection = (hostname) => {
    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: hostname,
            port: 443,
            path: '/',
            method: 'HEAD'
        }, (res) => {
            console.log(`✅ ${hostname}: ${res.statusCode}`);
            resolve(res.statusCode);
        });
        
        req.on('error', (error) => {
            console.log(`❌ ${hostname}: ${error.message}`);
            reject(error);
        });
        
        req.setTimeout(5000, () => {
            console.log(`⏰ ${hostname}: Timeout`);
            req.destroy();
            reject(new Error('Timeout'));
        });
        
        req.end();
    });
};

Promise.all([
    testConnection('lovable.dev').catch(() => null),
    testConnection('api.lovable.dev').catch(() => null)
]).then(() => {
    console.log('🎉 Teste de conectividade concluído!');
});
