
"use client";
/**
 * Componente de diagnóstico e correção de imagens para desenvolvimento
 * Este componente identifica e corrige problemas de imagens embaçadas
 */
import React, { useEffect, useState } from 'react';
import { analyzeImageUrl, checkRenderedImages, generateImageReport } from '../../utils/images/diagnostic';
import { analyzeImageUrl as jsAnalyzeImageUrl } from '../../utils/ImageChecker';
import { replaceBlurryIntroImages, isLikelyBlurryImage, getHighQualityImageUrl } from '../../utils/images/blurry-image-fixer';

// Estilos para o componente de diagnóstico
const diagnosticStyles = {
  container: {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    width: '350px',
    maxHeight: '500px',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    color: 'white',
    zIndex: 9999,
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    fontSize: '12px',
    fontFamily: 'monospace',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  header: {
    padding: '10px 15px',
    backgroundColor: '#e91e63',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    padding: '15px',
    overflowY: 'auto' as const,
    maxHeight: '400px',
  },
  section: {
    marginBottom: '15px',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '8px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    paddingBottom: '4px',
  },
  imageRow: {
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    marginBottom: '4px',
  },
  thumbnail: {
    width: '40px',
    height: '40px',
    objectFit: 'cover' as const,
    marginRight: '10px',
  },
  issue: {
    color: '#ff9800',
    marginBottom: '4px',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: 'none',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    marginRight: '5px',
    fontSize: '11px',
    cursor: 'pointer',
  },
  fixButton: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '11px',
    cursor: 'pointer',
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '5px',
    borderRadius: '4px',
    width: '100%',
    marginBottom: '10px',
  },
  footer: {
    padding: '10px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center' as const,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  badge: {
    display: 'inline-block',
    padding: '2px 6px',
    borderRadius: '10px',
    backgroundColor: '#ff5722',
    fontSize: '10px',
    marginLeft: '5px',
  },
  statusBadge: {
    padding: '2px 6px',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    fontSize: '10px',
  }
};

const ImageDiagnosticFixer = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [imageIssues, setImageIssues] = useState<any[]>([]);
  const [customUrl, setCustomUrl] = useState('');
  const [customUrlAnalysis, setCustomUrlAnalysis] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);
  const [fixStatus, setFixStatus] = useState({ fixed: 0, total: 0 });
  const [isFixingAll, setIsFixingAll] = useState(false);

  // Executar diagnóstico ao montar o componente
  useEffect(() => {
    runDiagnostic();
    
    // Executar novamente o diagnóstico quando novas imagens forem carregadas
    const observer = new MutationObserver((mutations) => {
      const hasNewImages = mutations.some(mutation => 
        Array.from(mutation.addedNodes).some(node => 
          node.nodeName === 'IMG' || 
          (node.nodeType === 1 && (node as Element).querySelector('img'))
        )
      );
      if (hasNewImages) {
        setTimeout(runDiagnostic, 1000);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    detectBlurryImages();
    
    return () => observer.disconnect();
  }, []);
  
  // Detectar imagens potencialmente embaçadas por inspeção visual
  const detectBlurryImages = () => {
    console.log('🔍 Analisando imagens para detectar embaçamento visual...');
    setTimeout(() => {
      const allImages = document.querySelectorAll('img');
      let blurryCount = 0;
      
      allImages.forEach(img => {
        if (img.width < 50 || img.height < 50) return;
        
        const style = window.getComputedStyle(img);
        if (style.filter.includes('blur') || img.style.filter.includes('blur')) {
          console.log('🔎 Imagem com blur CSS detectada:', img.src);
          blurryCount++;
          highlightBlurryImage(img);
        }
        
        if (img.src.includes('e_blur')) {
          console.log('🔎 Imagem com parâmetro de blur URL detectada:', img.src);
          blurryCount++;
          highlightBlurryImage(img);
        }
        
        if (img.src.includes('q_35') || img.src.includes('q_40') || img.src.includes('q_50')) {
          console.log('🔎 Imagem com qualidade baixa detectada:', img.src);
          blurryCount++;
          highlightBlurryImage(img);
        }
        
        if (img.classList.contains('placeholder') || 
            img.classList.contains('blur') || 
            img.parentElement?.classList.contains('blur-wrapper')) {
          console.log('🔎 Imagem com classe de blur detectada:', img.src);
          blurryCount++;
          highlightBlurryImage(img);
        }
      });
      
      if (blurryCount > 0) {
        console.log(`⚠️ Detectadas ${blurryCount} imagens potencialmente embaçadas`);
        setFixStatus(prev => ({ ...prev, total: prev.total + blurryCount }));
      } else {
        console.log('✅ Nenhuma imagem embaçada óbvia detectada');
      }
    }, 2000);
  };

  const highlightBlurryImage = (img: HTMLImageElement) => {
    img.classList.add('image-diagnostic-highlight');
    img.dataset.blurryImage = 'true';
  };

  const runDiagnostic = () => {
    const report = generateImageReport();
    setSummary(report.summary);
    setImageIssues(report.detailedIssues);
  };

  const analyzeCustomUrl = () => {
    if (!customUrl) return;
    const analysis = jsAnalyzeImageUrl(customUrl);
    setCustomUrlAnalysis(analysis);
  };

  const highlightImage = (element: HTMLElement) => {
    if (!element) return;
    
    document.querySelectorAll('.image-diagnostic-highlight').forEach(el => {
      el.classList.remove('image-diagnostic-highlight');
    });
    
    element.classList.add('image-diagnostic-highlight');
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    fixBlurryImage(element as HTMLImageElement);
    
    if (!document.getElementById('image-diagnostic-styles')) {
      const style = document.createElement('style');
      style.id = 'image-diagnostic-styles';
      style.innerHTML = `
        .image-diagnostic-highlight {
          outline: 4px solid #e91e63 !important;
          outline-offset: 4px !important;
          transition: outline 0.3s ease-out !important;
          animation: pulse-outline 1.5s infinite !important;
        }
        @keyframes pulse-outline {
          0% { outline-color: rgba(233, 30, 99, 0.8); }
          50% { outline-color: rgba(233, 30, 99, 0.3); }
          100% { outline-color: rgba(233, 30, 99, 0.8); }
        }
      `;
      document.head.appendChild(style);
    }
  };

  const fixBlurryImage = (imgElement: HTMLImageElement) => {
    if (!imgElement || !imgElement.src) return;
    
    const currentSrc = imgElement.src;
    console.log('🔧 Tentando corrigir imagem embaçada:', currentSrc);
    
    const newSrc = getHighQualityImageUrl(currentSrc);
    
    if (newSrc !== currentSrc) {
      console.log('🔄 Alterando URL da imagem para versão não-embaçada:', newSrc);
      
      const tempImg = new Image();
      tempImg.onload = () => {
        imgElement.src = newSrc;
        console.log('✅ Imagem corrigida aplicada com sucesso!');
        
        imgElement.style.transition = 'all 0.3s ease-out';
        imgElement.style.filter = 'none';
        imgElement.style.boxShadow = '0 0 0 2px #4CAF50';
        
        imgElement.classList.remove('blur', 'placeholder');
        if (imgElement.parentElement?.classList.contains('blur-wrapper')) {
          imgElement.parentElement.classList.remove('blur-wrapper');
        }
        
        setFixStatus(prev => ({ ...prev, fixed: prev.fixed + 1 }));
        
        setTimeout(() => {
          imgElement.style.boxShadow = 'none';
        }, 2000);
      };
      
      tempImg.onerror = () => {
        console.error('❌ Erro ao carregar nova imagem. Mantendo a original.');
      };
      
      tempImg.src = newSrc;
    } else {
      console.log('⚠️ Não foi possível otimizar mais esta imagem.');
    }
  };

  const fixAllBlurryImages = () => {
    setIsFixingAll(true);
    console.log('🔧 Corrigindo todas as imagens embaçadas...');
    
    if (imageIssues && imageIssues.length > 0) {
      imageIssues.forEach(issue => {
        if (issue.element) {
          fixBlurryImage(issue.element);
        }
      });
    }
    
    const stats = replaceBlurryIntroImages();
    setFixStatus(prev => ({ 
      fixed: prev.fixed + stats.replaced,
      total: prev.total + stats.total
    }));
    
    const markedBlurryImages = document.querySelectorAll('[data-blurry-image="true"]');
    markedBlurryImages.forEach(img => fixBlurryImage(img as HTMLImageElement));
    
    const introImages = document.querySelectorAll('.quiz-intro img, [data-section="intro"] img');
    console.log(`🔍 Verificando também ${introImages.length} imagens da introdução...`);
    introImages.forEach(img => fixBlurryImage(img as HTMLImageElement));
    
    setTimeout(() => {
      setIsFixingAll(false);
      runDiagnostic();
    }, 3000);
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={diagnosticStyles.container}>
      <div style={diagnosticStyles.header}>
        <div>
          📷 Diagnóstico de Imagens
          {summary && (
            <span style={diagnosticStyles.badge}>
              {summary.totalImagesWithIssues}
            </span>
          )}
        </div>
        <button 
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '↑' : '↓'}
        </button>
      </div>
      
      {isExpanded && (
        <div style={diagnosticStyles.content}>
          <div style={diagnosticStyles.section}>
            <div style={diagnosticStyles.sectionTitle}>Status da Correção</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>Imagens corrigidas: {fixStatus.fixed} / {fixStatus.total}</div>
              <div style={diagnosticStyles.statusBadge}>
                {isFixingAll ? 'Corrigindo...' : 'Pronto'}
              </div>
            </div>
            <button 
              style={diagnosticStyles.fixButton}
              onClick={fixAllBlurryImages}
              disabled={isFixingAll}
            >
              {isFixingAll ? 'Corrigindo imagens...' : 'Corrigir TODAS as imagens embaçadas'}
            </button>
          </div>

          {summary && (
            <div style={diagnosticStyles.section}>
              <div style={diagnosticStyles.sectionTitle}>Resumo</div>
              <div>Total de imagens: {summary.totalImagesRendered}</div>
              <div>Imagens com problemas: {summary.totalImagesWithIssues}</div>
              <div>Bytes totais: {(summary.totalDownloadedBytes / 1024).toFixed(2)} KB</div>
              <div>Impacto no desempenho: {summary.estimatedPerformanceImpact}</div>
            </div>
          )}

          <div style={diagnosticStyles.section}>
            <div style={diagnosticStyles.sectionTitle}>
              Analisar URL personalizada
            </div>
            <input
              type="text"
              style={diagnosticStyles.input}
              placeholder="Cole a URL da imagem aqui..."
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
            />
            <button
              style={diagnosticStyles.button}
              onClick={analyzeCustomUrl}
            >
              Analisar
            </button>
          </div>

          {customUrlAnalysis && (
            <div style={diagnosticStyles.section}>
              <div style={diagnosticStyles.sectionTitle}>
                Resultados da análise
              </div>
              <div>Formato: {customUrlAnalysis.format}</div>
              <div>Qualidade: {customUrlAnalysis.quality}</div>
              <div>Largura: {customUrlAnalysis.width}</div>
              <div>Transformações: {customUrlAnalysis.transformations?.length || 0}</div>
              {customUrlAnalysis.suggestions?.length > 0 && (
                <>
                  <div style={{ marginTop: '8px', fontWeight: 'bold' }}>Sugestões:</div>
                  {customUrlAnalysis.suggestions.map((sugestão: string, i: number) => (
                    <div key={i} style={diagnosticStyles.issue}>
                      • {sugestão}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {imageIssues.length > 0 && (
            <div style={diagnosticStyles.section}>
              <div style={diagnosticStyles.sectionTitle}>
                Problemas identificados ({imageIssues.length})
              </div>
              {imageIssues.map((item, index) => (
                <div 
                  key={index} 
                  style={diagnosticStyles.imageRow}
                  onClick={() => highlightImage(item.element)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <img 
                      src={item.url} 
                      style={diagnosticStyles.thumbnail} 
                      alt="Thumbnail" 
                    />
                    <div style={{ fontSize: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.url.substring(item.url.lastIndexOf('/') + 1)}
                    </div>
                  </div>
                  <div>
                    {item.issues.map((issue: string, i: number) => (
                      <div key={i} style={diagnosticStyles.issue}>
                        • {issue}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <button
              style={diagnosticStyles.button}
              onClick={runDiagnostic}
            >
              Verificar novamente
            </button>
            <button
              style={diagnosticStyles.button}
              onClick={() => {
                console.log('Relatório completo gerado:', generateImageReport());
              }}
            >
              Ver no Console
            </button>
          </div>
        </div>
      )}
      
      <div style={diagnosticStyles.footer}>
        Diagnóstico em tempo real • Apenas em desenvolvimento
      </div>
    </div>
  );
};

export default ImageDiagnosticFixer;
