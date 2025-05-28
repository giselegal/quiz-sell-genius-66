"use client";
import { safeLocalStorage } from "@/utils/safeLocalStorage";
import { useToast } from "@/components/ui/use-toast";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ABTest, ABTestVariation } from '@/hooks/useABTest';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeft,
  BarChart, Copy,
  Edit, ExternalLink, Globe, LineChart,
  Plus, Save, Trash2, PieChart
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const ABTestManagerPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [tests, setTests] = useState<ABTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [selectedTabId, setSelectedTabId] = useState<'active' | 'archived'>('active');
  const [editMode, setEditMode] = useState(false);
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  // Variável de estado para edição
  const [editedTest, setEditedTest] = useState<ABTest | null>(null);

  // Use useCallback for functions that don't depend on state changes
  const handleSaveTests = useCallback((updatedTests: ABTest[]) => {
    try {
      safeLocalStorage.setItem('ab_tests', JSON.stringify(updatedTests));
      setTests(updatedTests);
      toast({
        title: 'Testes salvos',
        description: 'Os testes A/B foram salvos com sucesso.'
      });
    } catch (error) {
      console.error('Erro ao salvar testes:', error);
      toast({
        title: 'Erro ao salvar testes',
        description: 'Não foi possível salvar os testes A/B.',
        variant: 'destructive'
      });
    }
  }, [toast]);

  const loadTests = useCallback(() => {
    try {
      const savedTests = safeLocalStorage.getItem('ab_tests');
      if (savedTests) {
        const parsedTests = JSON.parse(savedTests) as ABTest[];
        setTests(parsedTests);

        // Se nenhum teste estiver selecionado, ou o teste selecionado não existir mais, selecionar o primeiro
        if (!selectedTest || !parsedTests.some(test => test.id === selectedTest.id)) {
          setSelectedTest(parsedTests.length > 0 ? parsedTests[0] : null);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar testes:', error);
      toast({
        title: 'Erro ao carregar testes',
        description: 'Não foi possível carregar os testes A/B salvos.',
        variant: 'destructive',
      });
    }
  }, [toast, selectedTest]); // Added selectedTest to dependencies

  useEffect(() => {
    loadTests();
  }, [loadTests]); // Dependency on loadTests

  const handleCreateTest = () => {
    const newTest: ABTest = {
      id: `test_${Date.now()}`,
      name: 'Novo Teste A/B',
      type: 'result',
      isActive: true,
      startDate: new Date().toISOString(),
      variations: [
        {
          id: `var_${Date.now()}_a`,
          name: 'Variação A (Original)',
          trafficPercentage: 50,
          content: {}
        },
        {
          id: `var_${Date.now()}_b`,
          name: 'Variação B',
          trafficPercentage: 50,
          content: {}
        }
      ]
    };
    const updatedTests = [...tests, newTest];
    handleSaveTests(updatedTests);
    setSelectedTest(newTest);
    setEditedTest(newTest);
    setEditMode(true);
    setIsCreatingTest(true);
  };

  const handleDeleteTest = (testId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este teste? Esta ação não pode ser desfeita.')) {
      const updatedTests = tests.filter(test => test.id !== testId);
      handleSaveTests(updatedTests);

      if (selectedTest && selectedTest.id === testId) {
        setSelectedTest(updatedTests.length > 0 ? updatedTests[0] : null);
      }
      toast({
        title: 'Teste excluído',
        description: 'O teste A/B foi excluído com sucesso.',
      });
    }
  };

  const handleToggleTestActive = (testId: string, isActive: boolean) => {
    const updatedTests = tests.map(test =>
      test.id === testId ? { ...test, isActive } : test
    );
    handleSaveTests(updatedTests);

    if (selectedTest && selectedTest.id === testId) {
      setSelectedTest({ ...selectedTest, isActive });
    }
    toast({
      title: 'Status atualizado',
      description: `O teste foi ${isActive ? 'ativado' : 'arquivado'}.`,
    });
  };

  const handleEditTest = () => {
    if (selectedTest) {
      setEditedTest({ ...selectedTest });
      setEditMode(true);
    }
  };

  const handleSaveEdit = () => {
    if (editedTest) {
      // Basic validation for traffic percentages
      const totalTraffic = editedTest.variations.reduce((sum, variation) => sum + (variation.trafficPercentage || 0), 0);
      if (totalTraffic !== 100) {
        toast({
          title: 'Erro de validação',
          description: 'A soma das porcentagens de tráfego das variações deve ser 100%.',
          variant: 'destructive',
        });
        return;
      }

      const updatedTests = tests.map(test =>
        test.id === editedTest.id ? editedTest : test
      );
      handleSaveTests(updatedTests);
      setSelectedTest(editedTest);
      setEditMode(false);
      setIsCreatingTest(false);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    // If we were creating a new test and canceled, remove it
    if (isCreatingTest && editedTest) {
      const updatedTests = tests.filter(test => test.id !== editedTest.id);
      handleSaveTests(updatedTests); // This will also update the 'tests' state
      setSelectedTest(updatedTests.length > 0 ? updatedTests[0] : null);
    } else {
      // If we were editing an existing test, revert changes
      setSelectedTest(prev => prev ? { ...prev } : null); // Revert to original selectedTest
    }
    setIsCreatingTest(false);
    setEditedTest(null); // Clear editedTest
  };

  const handleAddVariation = () => {
    if (!editedTest) return;

    const newVariation: ABTestVariation = {
      id: `var_${Date.now()}`,
      name: `Variação ${String.fromCharCode(65 + editedTest.variations.length)}`,
      trafficPercentage: 0,
      content: {}
    };
    const updatedVariations = [...editedTest.variations, newVariation];

    // Redistribute percentages equally
    const newPercentage = 100 / updatedVariations.length;
    const updatedVariationsWithPercentages = updatedVariations.map((variation) => ({
      ...variation,
      trafficPercentage: parseFloat(newPercentage.toFixed(2)), // Ensure float and limit decimals
    }));

    // Adjust the last variation to ensure sum is exactly 100% due to rounding
    const sumCurrentPercentages = updatedVariationsWithPercentages.slice(0, -1).reduce((acc, v) => acc + v.trafficPercentage, 0);
    updatedVariationsWithPercentages[updatedVariationsWithPercentages.length - 1].trafficPercentage = parseFloat((100 - sumCurrentPercentages).toFixed(2));


    setEditedTest({
      ...editedTest,
      variations: updatedVariationsWithPercentages
    });
  };

  const handleDeleteVariation = (variationId: string) => {
    if (!editedTest) return;

    if (editedTest.variations.length <= 2) {
      toast({
        title: 'Operação não permitida',
        description: 'Um teste A/B precisa ter pelo menos duas variações.',
        variant: 'destructive',
      });
      return;
    }
    const updatedVariations = editedTest.variations
      .filter(variation => variation.id !== variationId);

    // Redistribute percentages equally among remaining variations
    const newPercentage = 100 / updatedVariations.length;
    const updatedVariationsWithPercentages = updatedVariations.map((variation) => ({
      ...variation,
      trafficPercentage: parseFloat(newPercentage.toFixed(2)),
    }));

    // Adjust the last variation to ensure sum is exactly 100% due to rounding
    const sumCurrentPercentages = updatedVariationsWithPercentages.slice(0, -1).reduce((acc, v) => acc + v.trafficPercentage, 0);
    updatedVariationsWithPercentages[updatedVariationsWithPercentages.length - 1].trafficPercentage = parseFloat((100 - sumCurrentPercentages).toFixed(2));

    setEditedTest({
      ...editedTest,
      variations: updatedVariationsWithPercentages
    });
  };

  const handleUpdateVariation = (
    variationId: string,
    field: keyof ABTestVariation,
    value: any
  ) => {
    if (!editedTest) return;

    const updatedVariations = editedTest.variations.map(variation =>
      variation.id === variationId
        ? { ...variation, [field]: value }
        : variation
    );

    setEditedTest({
      ...editedTest,
      variations: updatedVariations
    });
  };

  const handleUpdateVariationContent = (
    variationId: string,
    field: string,
    value: any
  ) => {
    if (!editedTest) return;

    const updatedVariations = editedTest.variations.map(variation => {
      if (variation.id === variationId) {
        return {
          ...variation,
          content: {
            ...(variation.content || {}),
            [field]: value
          }
        };
      }
      return variation;
    });

    setEditedTest({
      ...editedTest,
      variations: updatedVariations
    });
  };

  const handleDuplicateVariation = (variationId: string) => {
    if (!editedTest) return;

    const variationToDuplicate = editedTest.variations.find(v => v.id === variationId);
    if (!variationToDuplicate) return;

    const newVariation: ABTestVariation = {
      ...JSON.parse(JSON.stringify(variationToDuplicate)), // Deep copy to avoid reference issues
      id: `var_${Date.now()}_copy`, // Unique ID for the copy
      name: `${variationToDuplicate.name} (cópia)`,
      trafficPercentage: 0 // Reset percentage for duplication, user will adjust
    };

    const updatedVariations = [...editedTest.variations, newVariation];

    // Redistribute percentages equally
    const newPercentage = 100 / updatedVariations.length;
    const updatedVariationsWithPercentages = updatedVariations.map((variation) => ({
      ...variation,
      trafficPercentage: parseFloat(newPercentage.toFixed(2)),
    }));

    const sumCurrentPercentages = updatedVariationsWithPercentages.slice(0, -1).reduce((acc, v) => acc + v.trafficPercentage, 0);
    updatedVariationsWithPercentages[updatedVariationsWithPercentages.length - 1].trafficPercentage = parseFloat((100 - sumCurrentPercentages).toFixed(2));

    setEditedTest({
      ...editedTest,
      variations: updatedVariationsWithPercentages
    });
    toast({
      title: 'Variação duplicada',
      description: 'A variação foi duplicada com sucesso.',
    });
  };

  // Filtra os testes com base na aba selecionada
  const filteredTests = tests.filter(test =>
    selectedTabId === 'active' ? test.isActive : !test.isActive
  );

  const getConversionRate = (testId: string, variationId: string) => {
    try {
      // Obter o número de visitantes
      const visitorKey = `ab_test_${testId}_visitor_count_${variationId}`;
      const visitors = safeLocalStorage.getItem(visitorKey);
      const visitorsCount = visitors ? parseInt(visitors, 10) : 0;

      // Obter o número de conversões
      const conversionKey = `ab_test_${testId}_${variationId}_conversions`;
      const conversions = safeLocalStorage.getItem(conversionKey);
      const conversionsCount = conversions ? parseInt(conversions, 10) : 0;

      if (visitorsCount === 0) return '0%';
      const rate = (conversionsCount / visitorsCount) * 100;
      return `${rate.toFixed(2)}%`;
    } catch (error) {
      console.error('Erro ao calcular taxa de conversão:', error);
      return 'N/A';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-semibold">Gerenciador de Testes A/B</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Testes</h2>
                <Button onClick={handleCreateTest} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Novo Teste
                </Button>
              </div>

              <Tabs
                defaultValue="active"
                value={selectedTabId}
                onValueChange={(value) => setSelectedTabId(value as 'active' | 'archived')}
                className="w-full"
              >
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="active" className="flex-1">Ativos</TabsTrigger>
                  <TabsTrigger value="archived" className="flex-1">Arquivados</TabsTrigger>
                </TabsList>
              </Tabs>
              {filteredTests.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  Nenhum teste {selectedTabId === 'active' ? 'ativo' : 'arquivado'} encontrado.
                </div>
              ) : (
                <ul className="space-y-2">
                  {filteredTests.map((test) => (
                    <li
                      key={test.id}
                      className={`
                        p-3 rounded-md cursor-pointer hover:bg-muted transition-colors
                        ${selectedTest?.id === test.id ? 'bg-muted border-l-4 border-primary' : ''}
                      `}
                      onClick={() => {
                        setSelectedTest(test);
                        setEditMode(false); // Exit edit mode when selecting a new test
                        setIsCreatingTest(false);
                        setEditedTest(null); // Clear editedTest
                      }}
                    >
                      <div className="font-medium">{test.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {test.type === 'result' ? 'Página de Resultados' : 'Página de Vendas'}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          {selectedTest ? (
            <Card>
              <CardContent className="p-6">
                {editMode && editedTest ? (
                  // Modo de edição
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="space-y-1 flex-1">
                        <Input
                          value={editedTest.name || ''}
                          onChange={(e) => setEditedTest(prev => prev ? { ...prev, name: e.target.value } : null)}
                          className="text-xl font-medium border-none bg-transparent focus-visible:ring-0 p-0 h-auto"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveEdit}>
                          <Save className="h-4 w-4 mr-2" />
                          Salvar
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="testType">Tipo de Teste</Label>
                          <select
                            id="testType"
                            value={editedTest.type || 'result'}
                            onChange={(e) => setEditedTest(prev => prev ? { ...prev, type: e.target.value as 'result' | 'sales' } : null)}
                            className="w-full mt-1 p-2 border rounded-md"
                          >
                            <option value="result">Página de Resultados</option>
                            <option value="sales">Página de Vendas</option>
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="startDate">Data de Início</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={editedTest.startDate ? new Date(editedTest.startDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => setEditedTest(prev => prev ? { ...prev, startDate: new Date(e.target.value).toISOString() } : null)}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="endDate">Data de Término (Opcional)</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={editedTest.endDate ? new Date(editedTest.endDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              setEditedTest(prev => prev ? {
                                ...prev,
                                endDate: value ? new Date(value).toISOString() : undefined
                              } : null);
                            }}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="testStatus">Status</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <Switch
                              id="testStatus"
                              checked={editedTest.isActive || false}
                              onCheckedChange={(checked) => setEditedTest(prev => prev ? { ...prev, isActive: checked } : null)}
                            />
                            <Label htmlFor="testStatus">
                              {editedTest.isActive ? 'Ativo' : 'Inativo'}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Variações</h3>
                        <Button size="sm" variant="outline" onClick={handleAddVariation}>
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar Variação
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {editedTest.variations.map((variation) => (
                          <Card key={variation.id} className="p-4 border">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor={`variationName-${variation.id}`}>Nome da Variação</Label>
                                <Input
                                  id={`variationName-${variation.id}`}
                                  value={variation.name}
                                  onChange={(e) => handleUpdateVariation(variation.id, 'name', e.target.value)}
                                  className="mt-1"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`variationDomain-${variation.id}`}>Domínio (opcional)</Label>
                                <div className="flex items-center mt-1">
                                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <Input
                                    id={`variationDomain-${variation.id}`}
                                    value={variation.domain || ''}
                                    onChange={(e) => handleUpdateVariation(variation.id, 'domain', e.target.value)}
                                    placeholder="ex: variacao-a.meudominio.com.br"
                                  />
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`trafficPercentage-${variation.id}`}>Distribuição de Tráfego (%)</Label>
                                <Input
                                  id={`trafficPercentage-${variation.id}`}
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={variation.trafficPercentage || 0}
                                  onChange={(e) => handleUpdateVariation(variation.id, 'trafficPercentage', parseInt(e.target.value, 10))}
                                  className="mt-1"
                                />
                              </div>
                            </div>

                            <div className="mt-4">
                              <h4 className="font-medium mb-2">Conteúdo da Variação (Opcional)</h4>
                              <Label htmlFor={`checkoutUrl-${variation.id}`}>URL de Checkout</Label>
                              <Input
                                id={`checkoutUrl-${variation.id}`}
                                value={(variation.content?.checkoutUrl as string) || ''}
                                onChange={(e) => handleUpdateVariationContent(variation.id, 'checkoutUrl', e.target.value)}
                                placeholder="https://checkout.exemplo.com/seu-produto"
                                className="mt-1"
                              />

                              <Label htmlFor={`regularPrice-${variation.id}`} className="mt-3 block">Preço Regular</Label>
                              <Input
                                id={`regularPrice-${variation.id}`}
                                value={(variation.content?.pricing?.regularPrice as string) || ''}
                                onChange={(e) => {
                                  const pricing = {
                                    ...((variation.content?.pricing as object) || {}),
                                    regularPrice: e.target.value
                                  };
                                  handleUpdateVariationContent(variation.id, 'pricing', pricing);
                                }}
                                placeholder="R$ 175,00"
                                className="mt-1"
                              />

                              <Label htmlFor={`currentPrice-${variation.id}`} className="mt-3 block">Preço Atual</Label>
                              <Input
                                id={`currentPrice-${variation.id}`}
                                value={(variation.content?.pricing?.currentPrice as string) || ''}
                                onChange={(e) => {
                                  const pricing = {
                                    ...((variation.content?.pricing as object) || {}),
                                    currentPrice: e.target.value
                                  };
                                  handleUpdateVariationContent(variation.id, 'pricing', pricing);
                                }}
                                placeholder="R$ 39,00"
                                className="mt-1"
                              />

                              <Label htmlFor={`installments-${variation.id}`} className="mt-3 block">Informação de Parcelamento</Label>
                              <Input
                                id={`installments-${variation.id}`}
                                value={(variation.content?.pricing?.installments as string) || ''}
                                onChange={(e) => {
                                  const pricing = {
                                    ...((variation.content?.pricing as object) || {}),
                                    installments: e.target.value
                                  };
                                  handleUpdateVariationContent(variation.id, 'pricing', pricing);
                                }}
                                placeholder="4X de R$ 10,86"
                                className="mt-1"
                              />
                            </div>

                            <div className="flex justify-end mt-4 space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDuplicateVariation(variation.id)}
                              >
                                <Copy className="h-4 w-4 mr-1" />
                                Duplicar
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteVariation(variation.id)}
                                disabled={editedTest.variations.length <= 2}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Excluir
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Modo de visualização
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1 flex-1">
                        <h2 className="text-xl font-semibold">{selectedTest.name}</h2>
                        <p className="text-sm text-muted-foreground">
                          {selectedTest.type === 'result' ? 'Página de Resultados' : 'Página de Vendas'}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Switch
                            checked={selectedTest.isActive}
                            onCheckedChange={(checked) => handleToggleTestActive(selectedTest.id, checked)}
                          />
                          <Label>
                            {selectedTest.isActive ? 'Ativo' : 'Inativo'}
                          </Label>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleEditTest}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteTest(selectedTest.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Data de Início</h3>
                        <p className="font-semibold">{new Date(selectedTest.startDate).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Data de Término</h3>
                        <p className="font-semibold">{selectedTest.endDate ? new Date(selectedTest.endDate).toLocaleDateString() : 'Não definida'}</p>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          selectedTest.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}>
                          {selectedTest.isActive ? 'Ativo' : 'Inativo'}
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Performance</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Variações</h4>
                            <p className="text-2xl font-semibold">{selectedTest.variations.length}</p>
                          </div>
                          <BarChart className="h-8 w-8 text-muted-foreground opacity-50" />
                        </Card>
                        <Card className="p-4 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Dias Ativos</h4>
                            <p className="text-2xl font-semibold">
                              {Math.max(0, Math.ceil((new Date().getTime() - new Date(selectedTest.startDate).getTime()) / (1000 * 60 * 60 * 24)))}
                            </p>
                          </div>
                          <LineChart className="h-8 w-8 text-muted-foreground opacity-50" />
                        </Card>
                        <Card className="p-4 flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">Distribuição Total</h4>
                            <p className="text-2xl font-semibold">
                              {selectedTest.variations.reduce((a, b) => a + (b.trafficPercentage || 0), 0)}%
                            </p>
                          </div>
                          <PieChart className="h-8 w-8 text-muted-foreground opacity-50" />
                        </Card>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Detalhes das Variações</h3>
                      <div className="space-y-4">
                        {selectedTest.variations.map((variation) => (
                          <Card key={variation.id} className="p-4">
                            <div className="flex flex-col md:flex-row justify-between md:items-center">
                              <div className="mb-2 md:mb-0">
                                <h4 className="font-medium">{variation.name}</h4>
                                <div className="flex flex-wrap items-center mt-1 text-sm text-muted-foreground gap-x-4">
                                  <div className="flex items-center">
                                    <BarChart className="h-4 w-4 mr-1" />
                                    <span>{variation.trafficPercentage || 0}% do tráfego</span>
                                  </div>
                                  {variation.domain && (
                                    <div className="flex items-center">
                                      <Globe className="h-4 w-4 mr-1" />
                                      <span>{variation.domain}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                                <div className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs">
                                  CR: {getConversionRate(selectedTest.id, variation.id)}
                                </div>
                                {(variation.content?.checkoutUrl as string) && (
                                  <a
                                    href={variation.content?.checkoutUrl as string}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-xs text-blue-600 hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Abrir checkout
                                  </a>
                                )}
                              </div>
                            </div>
                            {(variation.content?.pricing?.regularPrice || variation.content?.pricing?.currentPrice || variation.content?.pricing?.installments) && (
                              <div className="mt-4 border-t pt-4">
                                <h5 className="text-sm font-medium mb-2">Informações de Preço:</h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                  {variation.content?.pricing?.regularPrice && (
                                    <p>
                                      <span className="text-muted-foreground">Regular:</span>{' '}
                                      {variation.content.pricing.regularPrice}
                                    </p>
                                  )}
                                  {variation.content?.pricing?.currentPrice && (
                                    <p>
                                      <span className="text-muted-foreground">Atual:</span>{' '}
                                      {variation.content.pricing.currentPrice}
                                    </p>
                                  )}
                                  {variation.content?.pricing?.installments && (
                                    <p>
                                      <span className="text-muted-foreground">Parcelas:</span>{' '}
                                      {variation.content.pricing.installments}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Nenhum teste selecionado</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecione um teste existente ou crie um novo para começar.
                </p>
                <Button onClick={handleCreateTest}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Novo Teste
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ABTestManagerPage;