const fs = require('fs');
const { createCanvas } = require('canvas');

// Função para criar um canvas e desenhar o favicon
function createFavicon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Cor de fundo (dourado da marca)
  ctx.fillStyle = '#B89B7A';
  ctx.fillRect(0, 0, size, size);
  
  // Texto "G" no centro
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${Math.floor(size * 0.7)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('G', size/2, size/2 + size*0.05);
  
  return canvas.toBuffer();
}

// Criar favicons em diferentes tamanhos
try {
  const favicon16 = createFavicon(16);
  const favicon32 = createFavicon(32);
  const favicon64 = createFavicon(64);
  
  // Salvar os arquivos
  fs.writeFileSync('./public/favicon/favicon-16x16.png', favicon16);
  fs.writeFileSync('./public/favicon/favicon-32x32.png', favicon32);
  fs.writeFileSync('./public/favicon/favicon.ico', favicon64); // Simplificado, idealmente precisaria converter para .ico
  
  console.log('Favicons criados com sucesso!');
} catch (err) {
  console.error('Erro ao criar favicons:', err);
}
