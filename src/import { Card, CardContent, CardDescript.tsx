import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Server, 
  Users, 
  Database, 
  Cpu, 
  Network,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useSystemCapacity } from '../../hooks/useSystemCapacity';

export default function CapacityDashboard() {
  const { 
    capacity, 
    usage, 
    bottlenecks, 
    utilizationPercent, 
    isNearLimit, 
    isCritical,
    upgradeOptions,
    recommendations 
  } = useSystemCapacity();

  const getStatusColor = (percent: number) => {
    if (percent > 90) return 'text-red-600';
    if (percent > 75) return 'text-orange-600';
    if (percent > 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusBadge = (percent: number) => {
    if (percent > 90) return <Badge variant="destructive">Crítico</Badge>;
    if (percent > 75) return <Badge className="bg-orange-100 text-orange-800">Atenção</Badge>;
    if (percent > 50) return <Badge className="bg-yellow-100 text-yellow-800">Moderado</Badge>;
    return <Badge className="bg-green-100 text-green-800">Saudável</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Server className="h-8 w-8 text-blue-600" />
            Capacidade do Sistema
          </h2>
          <p className="text-gray-600 mt-1">
            Monitore e otimize a performance da aplicação
          </p>
        </div>
        
        {isNearLimit && (
          <Badge variant="outline" className="text-orange-600 border-orange-300">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Próximo do Limite
          </Badge>
        )}
      </div>

      {/* Status Geral */}
      <Card className={`border-2 ${isCritical ? 'border-red-200 bg-red-50' : isNearLimit ? 'border-orange-200 bg-orange-50' : 'border-green-200 bg-green-50'}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Status Atual do Sistema</span>
            {getStatusBadge(utilizationPercent)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {usage.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Usuários Ativos</div>
              <div className="text-xs text-gray-500">
                de {capacity.maxUsers.toLocaleString()} máximo
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${getStatusColor(utilizationPercent)}`}>
                {utilizationPercent.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Utilização</div>
              <Progress value={utilizationPercent} className="mt-2" />
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {capacity.recommendedUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Recomendado</div>
              <div className="text-xs text-gray-500">
                Para operação segura
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Detalhadas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <Database className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.storageUsedMB.toFixed(1)} MB</div>
            <Progress value={(usage.storageUsedMB / 100) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              de ~100 MB disponível
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memória RAM</CardTitle>
            <Cpu className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.memoryUsedMB.toFixed(0)} MB</div>
            <Progress value={(usage.memoryUsedMB / 200) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              de 200 MB recomendado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Network className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.apiCallsPerMinute}/min</div>
            <Progress value={(usage.apiCallsPerMinute / 100) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              de 100/min limite
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessões</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usage.concurrentSessions}</div>
            <Progress value={(usage.concurrentSessions / 100) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              sessões simultâneas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gargalos Identificados */}
      {bottlenecks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Gargalos Identificados
            </CardTitle>
            <CardDescription>
              Componentes que podem afetar a performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bottlenecks.map((bottleneck, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{bottleneck.component}</h4>
                    <Badge 
                      variant={bottleneck.impact === 'critical' ? 'destructive' : 'outline'}
                      className={
                        bottleneck.impact === 'high' ? 'text-orange-600 border-orange-300' :
                        bottleneck.impact === 'medium' ? 'text-yellow-600 border-yellow-300' :
                        'text-blue-600 border-blue-300'
                      }
                    >
                      {bottleneck.impact}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilização: {bottleneck.utilization.toFixed(1)}%</span>
                      <span>{bottleneck.current.toFixed(1)} / {bottleneck.limit.toFixed(1)}</span>
                    </div>
                    <Progress value={bottleneck.utilization} />
                  </div>
                  
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    💡 {bottleneck.solution}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Opções de Upgrade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Planos de Escalabilidade
          </CardTitle>
          <CardDescription>
            Opções para aumentar a capacidade do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {upgradeOptions.map((option, index) => (
              <div key={index} className={`border rounded-lg p-4 ${index === 0 ? 'border-blue-300 bg-blue-50' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold">{option.tier}</h4>
                  {index === 0 && <Badge>Atual</Badge>}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    {option.capacity.toLocaleString()} usuários
                  </div>
                  <div className="text-sm text-gray-600">{option.architecture}</div>
                  <div className="font-medium">{option.cost}</div>
                </div>
                
                <ul className="text-sm space-y-1 mb-4">
                  {option.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-xs text-gray-500 mb-3">
                  Implementação: {option.implementation}
                </div>
                
                {index > 0 && (
                  <Button variant="outline" className="w-full">
                    Saber Mais
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recomendações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Recomendações de Otimização
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  rec.priority === 'high' ? 'bg-red-500' :
                  rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{rec.area}</h4>
                    <div className="flex gap-2">
                      <Badge variant="outline" size="sm">
                        {rec.priority}
                      </Badge>
                      <Badge variant="outline" size="sm">
                        {rec.effort} effort
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{rec.description}</p>
                  <p className="text-xs text-green-600">✅ {rec.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
