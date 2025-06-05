// Arquivo para importações otimizadas de ícones Lucide
// Carrega apenas os ícones que realmente precisamos

// Ícones para Quiz e Landing Page
export {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  Clock,
  Star,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';

// Ícones para Resultado
export {
  ShoppingCart,
  Heart,
  Gift,
  Target,
  Zap,
  TrendingUp,
  Award,
  Shield,
  Download,
  Share2,
  Copy,
  ExternalLink
} from 'lucide-react';

// Ícones para Admin (carregamento lazy)
export const AdminIcons = {
  BarChart: () => import('lucide-react').then(m => ({ default: m.BarChart })),
  Users: () => import('lucide-react').then(m => ({ default: m.Users })),
  Settings: () => import('lucide-react').then(m => ({ default: m.Settings })),
  Eye: () => import('lucide-react').then(m => ({ default: m.Eye })),
  Edit: () => import('lucide-react').then(m => ({ default: m.Edit })),
  Trash: () => import('lucide-react').then(m => ({ default: m.Trash })),
  Plus: () => import('lucide-react').then(m => ({ default: m.Plus })),
  Save: () => import('lucide-react').then(m => ({ default: m.Save })),
  Upload: () => import('lucide-react').then(m => ({ default: m.Upload })),
  Database: () => import('lucide-react').then(m => ({ default: m.Database })),
  LineChart: () => import('lucide-react').then(m => ({ default: m.LineChart })),
  PieChart: () => import('lucide-react').then(m => ({ default: m.PieChart })),
  TrendingDown: () => import('lucide-react').then(m => ({ default: m.TrendingDown })),
  AlertTriangle: () => import('lucide-react').then(m => ({ default: m.AlertTriangle })),
  RefreshCw: () => import('lucide-react').then(m => ({ default: m.RefreshCw })),
  Filter: () => import('lucide-react').then(m => ({ default: m.Filter })),
  Search: () => import('lucide-react').then(m => ({ default: m.Search })),
  Calendar: () => import('lucide-react').then(m => ({ default: m.Calendar })),
  Mail: () => import('lucide-react').then(m => ({ default: m.Mail })),
  Phone: () => import('lucide-react').then(m => ({ default: m.Phone }))
};

// Função utilitária para carregar ícones do admin dinamicamente
export const loadAdminIcon = async (iconName: keyof typeof AdminIcons) => {
  const iconLoader = AdminIcons[iconName];
  if (iconLoader) {
    const { default: IconComponent } = await iconLoader();
    return IconComponent;
  }
  return null;
};
