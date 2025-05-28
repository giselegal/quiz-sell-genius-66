import { 
  Home, 
  FileText, 
  BarChart3, 
  Users, 
  Settings,
  Palette,  // Novo ícone para Editor Visual
  Target
} from 'lucide-react';

export function Sidebar() {
  const menuItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/dashboard/quizzes', icon: FileText, label: 'Quizzes' },
    { href: '/dashboard/editor', icon: Palette, label: 'Editor Visual' }, // Nova opção
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/dashboard/leads', icon: Users, label: 'Leads' },
    { href: '/dashboard/settings', icon: Settings, label: 'Configurações' },
  ];
  return (
    <div className="flex flex-col h-full p-4 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-bold text-gray-800">Quiz App</div>
        <div className="text-gray-500">
          {/* User avatar or settings icon can go here */}
        </div>
      </div>
      {/* Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.label}>
              <a 
                href={item.href} 
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Footer */}
      <div className="mt-auto">
        <a 
          href="/dashboard/settings" 
          className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          <Settings className="w-5 h-5 mr-3" />
          Configurações
        </a>
    </div>
  );
}
