"use client";
import React, { useState } from 'react';
import { ArrowLeft, Save, Palette } from 'lucide-react';

const EditorUltraSimples: React.FC = () => {
  const [cor, setCor] = useState('#B89B7A');
  const [titulo, setTitulo] = useState('Descubra Seu Estilo Único');
  
  const salvar = () => {
    localStorage.setItem('editorUltraSimples', JSON.stringify({ cor, titulo }));
    alert('Configurações salvas!');
  };

  const voltarParaAdmin = () => {
    window.history.back();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <button
          onClick={voltarParaAdmin}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
        
        <h1 style={{ margin: 0, fontSize: '24px', color: '#333' }}>
          🎨 Editor Visual Funcionando!
        </h1>
        
        <button
          onClick={salvar}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          <Save size={16} />
          Salvar
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Palette size={20} style={{ marginRight: '10px', color: '#666' }} />
            <h2 style={{ margin: 0, fontSize: '18px' }}>Controles do Editor</h2>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Cor Principal:
            </label>
            <input
              type="color"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              style={{ width: '50px', height: '40px', border: 'none', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Título Principal:
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Preview em Tempo Real</h2>
          
          <div style={{
            padding: '30px',
            backgroundColor: '#fffaf7',
            borderRadius: '8px',
            border: '1px solid #eee'
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: cor,
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              {titulo}
            </h1>
            
            <div style={{ textAlign: 'center' }}>
              <button style={{
                backgroundColor: cor,
                color: 'white',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Botão de Exemplo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorUltraSimples;
