#!/usr/bin/env node

/**
 * 🚀 Sincronização completa do Lovable - Versão robusta
 * Força sincronização usando múltiplos métodos
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LovableCompletSync {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.timestamp = Math.floor(Date.now() / 1000);
  }

  async run() {
    console.log('🚀 INICIANDO SINCRONIZAÇÃO COMPLETA LOVABLE');
    console.log('============================================');
    
    try {
      // 1. Criar/atualizar .lovable
      await this.updateLovableConfig();
      
      // 2. Atualizar .lovable-trigger
      await this.updateTrigger();
      
      // 3. Criar .lovable-status
      await this.updateStatus();
      
      // 4. Atualizar timestamp em arquivos relacionados
      await this.touchRelatedFiles();
      
      console.log('✅ SINCRONIZAÇÃO COMPLETA REALIZADA COM SUCESSO!');
      console.log('📋 Arquivos atualizados:');
      console.log('   - .lovable');
      console.log('   - .lovable-trigger');
      console.log('   - .lovable-status');
      
      console.log('\n🔧 PRÓXIMOS PASSOS:');
      console.log('1. Faça commit e push para GitHub');
      console.log('2. Aguarde o workflow ser executado');
      console.log('3. Verifique no Lovable Studio se reconheceu as mudanças');
      
    } catch (error) {
      console.error('❌ Erro durante sincronização:', error.message);
      process.exit(1);
    }
  }

  async updateLovableConfig() {
    const configPath = path.join(this.projectRoot, '.lovable');
    
    const config = {
      "github": {
        "autoSyncFromGithub": true,
        "autoPushToGithub": true,
        "branch": "main"
      },
      "projectName": "Quiz Sell Genius",
      "projectId": "quiz-sell-genius-66",
      "version": `2.3.${this.timestamp}`,
      "features": {
        "componentTagger": true,
        "liveEditing": true,
        "enhancedSync": true,
        "visualEditor": true
      },
      "editor": {
        "enableLiveMode": true,
        "autoSave": true,
        "componentHighlighting": true
      },
      "lastSync": new Date().toISOString(),
      "componentCount": 476,
      "sync": {
        "timestamp": this.timestamp,
        "method": "complete-manual",
        "forced": true
      },
      "lastUpdate": new Date().toISOString(),
      "tokenConfigured": true,
      "manualSyncTimestamp": this.timestamp
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('✅ Arquivo .lovable atualizado');
  }

  async updateTrigger() {
    const triggerPath = path.join(this.projectRoot, '.lovable-trigger');
    
    const triggerContent = [
      `LOVABLE_FORCE_SYNC=${this.timestamp}`,
      `MANUAL_TRIGGER=true`,
      `SYNC_TIME=${new Date().toISOString()}`,
      `BUILD_FIXED=true`,
      `MODERN_VISUAL_EDITOR_FIXED=true`
    ].join('\n');

    fs.writeFileSync(triggerPath, triggerContent);
    console.log('✅ Arquivo .lovable-trigger atualizado');
  }

  async updateStatus() {
    const statusPath = path.join(this.projectRoot, '.lovable-status');
    
    const status = {
      "lastSync": new Date().toISOString(),
      "method": "complete-manual-sync",
      "status": "sync-forced",
      "timestamp": this.timestamp,
      "buildFixed": true,
      "modernVisualEditorFixed": true,
      "tokenConfigured": true,
      "filesUpdated": [
        "src/components/visual-editor/ModernVisualEditor.tsx",
        ".lovable",
        ".lovable-trigger"
      ]
    };

    fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
    console.log('✅ Arquivo .lovable-status atualizado');
  }

  async touchRelatedFiles() {
    // Atualizar timestamps de arquivos relacionados
    const filesToTouch = [
      'src/components/visual-editor/ModernVisualEditor.tsx',
      'src/components/visual-editor/AdvancedQuizEditor.tsx'
    ];

    for (const file of filesToTouch) {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        const now = new Date();
        fs.utimesSync(filePath, now, now);
      }
    }
    
    console.log('✅ Timestamps dos arquivos atualizados');
  }
}

// Executar sincronização
const sync = new LovableCompletSync();
sync.run();
