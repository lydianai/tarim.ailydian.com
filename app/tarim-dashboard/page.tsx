'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  ChevronRight,
  Activity,
  Shield,
  Database,
  RefreshCw,
  Lock,
  LogIn,
  Plane,
  X,
  Save,
  Moon,
  Sun,
  Monitor,
  Languages,
  User,
  Plus
} from 'lucide-react';
import DroneManagement from '@/components/DroneManagement';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { useDroneContext } from '@/contexts/DroneContext';
import { fetchDroneTelemetry } from '@/lib/api-client';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ProductTour from '@/components/ProductTour';

interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  totalCustomers: number;
  customersChange: number;
  activeProducts: number;
  productsChange: number;
}

interface Order {
  id: string;
  customerName: string;
  businessName: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  sales: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
}

interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface SettingsData {
  language: 'tr' | 'en';
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  account: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

export default function TarimDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Secure server-side authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError(data.error || 'Geçersiz kullanıcı adı veya şifre / Invalid credentials');
      }
    } catch (err) {
      setError('Bir hata oluştu / An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
        }
      } catch (err) {
        console.error('Session check error:', err);
      }
    };
    checkAuth();
  }, []);

  const stats: DashboardStats = {
    totalRevenue: 124580.50,
    revenueChange: 12.5,
    totalOrders: 342,
    ordersChange: 8.3,
    totalCustomers: 1248,
    customersChange: 15.2,
    activeProducts: 156,
    productsChange: 3.1
  };

  const recentOrders: Order[] = [
    {
      id: 'AG-20251219001',
      customerName: 'John Smith',
      businessName: 'Green Valley Farms',
      total: 2450.00,
      status: 'processing',
      date: '2025-12-19',
      items: 5
    },
    {
      id: 'AG-20251219002',
      customerName: 'Sarah Johnson',
      businessName: 'Sunrise Agricultural Co.',
      total: 1850.75,
      status: 'shipped',
      date: '2025-12-19',
      items: 3
    },
    {
      id: 'AG-20251218003',
      customerName: 'Mike Davis',
      businessName: 'Harvest Moon Ranch',
      total: 3200.00,
      status: 'delivered',
      date: '2025-12-18',
      items: 8
    },
    {
      id: 'AG-20251218004',
      customerName: 'Emily Brown',
      businessName: 'Golden Fields Farm',
      total: 1425.50,
      status: 'pending',
      date: '2025-12-18',
      items: 4
    },
    {
      id: 'AG-20251217005',
      customerName: 'David Wilson',
      businessName: 'Valley View Organics',
      total: 980.25,
      status: 'shipped',
      date: '2025-12-17',
      items: 2
    }
  ];

  const topProducts: Product[] = [
    {
      id: 1,
      name: 'Organic Fertilizer Premium',
      category: 'Fertilizers',
      stock: 450,
      price: 45.99,
      sales: 128,
      status: 'active'
    },
    {
      id: 2,
      name: 'John Deere 6R Tractor',
      category: 'Machinery',
      stock: 8,
      price: 89500.00,
      sales: 3,
      status: 'active'
    },
    {
      id: 3,
      name: 'Precision Irrigation System',
      category: 'Equipment',
      stock: 25,
      price: 1250.00,
      sales: 45,
      status: 'active'
    },
    {
      id: 4,
      name: 'Corn Seeds - Hybrid Variety',
      category: 'Seeds',
      stock: 15,
      price: 125.00,
      sales: 89,
      status: 'low_stock'
    },
    {
      id: 5,
      name: 'Soil pH Test Kit Professional',
      category: 'Tools',
      stock: 0,
      price: 85.00,
      sales: 67,
      status: 'out_of_stock'
    }
  ];

  const customers: Customer[] = [
    {
      id: 'CUST-001',
      name: 'John Smith',
      email: 'john@greenvalley.com',
      company: 'Green Valley Farms',
      totalOrders: 45,
      totalSpent: 125400.50,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: 'CUST-002',
      name: 'Sarah Johnson',
      email: 'sarah@sunriseagri.com',
      company: 'Sunrise Agricultural Co.',
      totalOrders: 32,
      totalSpent: 89750.25,
      status: 'active',
      joinDate: '2024-03-22'
    },
    {
      id: 'CUST-003',
      name: 'Mike Davis',
      email: 'mike@harvestmoon.com',
      company: 'Harvest Moon Ranch',
      totalOrders: 28,
      totalSpent: 67890.00,
      status: 'active',
      joinDate: '2024-05-10'
    }
  ];

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers' | 'analytics' | 'drones'>('overview');
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({
    language: 'tr',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    account: {
      name: 'Admin User',
      email: 'admin@ailydian.com',
      phone: '+1 (555) 123-4567',
      company: 'Lydian Agriculture Platform'
    }
  });

  // Drone Context
  const droneContext = useDroneContext();

  // Real-time data sync
  useEffect(() => {
    const interval = setInterval(() => {
      // Sync real data from APIs
      syncRealTimeData();
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const syncRealTimeData = async () => {
    // Fetch real drone data (for future integration)
    await fetchDroneTelemetry();

    // Update system alerts based on real data
    if (droneContext.drones.length > 0) {
      const lowBatteryDrones = droneContext.drones.filter(d => d.battery < 30);
      if (lowBatteryDrones.length > 0) {
        console.log('Low battery alert:', lowBatteryDrones);
      }
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'processing':
        return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'shipped':
        return 'bg-violet-100 text-violet-700 border-violet-200';
      case 'delivered':
        return 'bg-agri-100 text-agri-700 border-agri-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-white border-gray-200';
    }
  };

  const getProductStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return 'bg-agri-100 text-agri-700';
      case 'low_stock':
        return 'bg-amber-100 text-amber-700';
      case 'out_of_stock':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-white';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }: { title: string; value: number | string; change: number; icon: any; prefix?: string; suffix?: string }) => {
    const isPositive = change >= 0;
    return (
      <div className="bg-neon-100 rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-agri-300 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-gradient-to-br from-agri-100 to-forest-100 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-agri-700" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-agri-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </div>
        <div className="text-sm text-gray-400 font-semibold">{title}</div>
      </div>
    );
  };

  const exportReport = () => {
    const csvContent = `Order ID,Customer,Company,Total,Status,Date,Items\n${recentOrders.map(o =>
      `${o.id},${o.customerName},${o.businessName},${o.total},${o.status},${o.date},${o.items}`
    ).join('\n')}`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarim-dashboard-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-agri-600 via-forest-600 to-agri-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-agri-600 to-forest-600 p-8 text-white text-center">
            <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-2">Tarım Dashboard</h1>
            <p className="text-sm opacity-90">Agricultural System Management</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="p-8 bg-gray-50">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Hoş Geldiniz / Welcome</h2>
              <p className="text-sm text-gray-400">Devam etmek için giriş yapın / Sign in to continue</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Kullanıcı Adı / Username
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                    placeholder="admin@ailydian.com"
                    required
                  />
                  <Users className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Şifre / Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                    placeholder="••••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-400"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-agri-600 to-forest-600 text-white font-bold py-4 rounded-lg hover:from-agri-700 hover:to-forest-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Giriş Yap / Sign In
                </>
              )}
            </button>

            <div className="mt-6 pt-6 border-t-2 border-gray-300 space-y-4">
              {/* Demo Credentials */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 p-5 rounded-xl shadow-lg">
                <div className="flex gap-3">
                  <div className="bg-blue-500 p-2 rounded-lg h-fit">
                    <Activity className="w-5 h-5 text-white flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold mb-3 text-white text-sm">🎯 Demo Giriş Bilgileri / Demo Credentials</p>
                    <div className="space-y-2 font-mono bg-white border border-blue-200 p-4 rounded-lg shadow-sm">
                      <p className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-white min-w-[70px]">Email:</span>
                        <span className="text-blue-700 font-semibold">admin@ailydian.com</span>
                      </p>
                      <p className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-white min-w-[70px]">Password:</span>
                        <span className="text-blue-700 font-semibold">LydianAgri2025!</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUsername('admin@ailydian.com');
                        setPassword('LydianAgri2025!');
                      }}
                      className="mt-3 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                    >
                      ⚡ Otomatik Doldur / Auto-Fill
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 p-4 rounded-xl">
                <div className="flex gap-3">
                  <div className="bg-green-500 p-2 rounded-lg h-fit">
                    <Shield className="w-5 h-5 text-white flex-shrink-0" />
                  </div>
                  <div>
                    <p className="font-bold mb-1 text-white text-xs">🔒 Güvenli Giriş / Secure Login</p>
                    <p className="text-xs text-white leading-relaxed">
                      Sunucu taraflı JWT kimlik doğrulama ile korunmaktadır.<br/>
                      Server-side JWT authentication with HttpOnly cookies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-50 to-forest-50">
      {/* Header */}
      <header className="bg-neon-100 border-b-2 border-gray-200 sticky top-0 z-40 shadow-md">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="bg-gradient-to-br from-agri-600 to-forest-600 p-3 rounded-xl hover:shadow-lg transition-all"
              >
                <BarChart3 className="w-8 h-8 text-white" />
              </a>
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Tarım Dashboard</h1>
                <p className="text-sm text-gray-400">Agricultural System Management</p>
              </div>
              <a
                href="/"
                className="ml-4 flex items-center gap-2 text-sm font-semibold text-agri-700 hover:text-agri-900 transition-all"
              >
                ← Back to Platform
              </a>
            </div>

            {/* Actions */}
            <div id="dashboard-container" className="flex items-center gap-4">
              <div id="language-switcher">
                <LanguageSwitcher />
              </div>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full"></span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-neon-100 border-2 border-red-600 text-red-600 font-bold px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
              >
                <Lock className="w-5 h-5" />
                <span>Çıkış / Logout</span>
              </button>
              <button
                id="dark-mode-toggle"
                onClick={() => setShowSettingsModal(true)}
                className="flex items-center gap-2 bg-neon-100 border-2 border-gray-900 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-neon-100 border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3, tourId: 'overview-tab' },
              { id: 'orders', label: 'Orders', icon: ShoppingCart, tourId: 'marketplace-tab' },
              { id: 'products', label: 'Products', icon: Package, tourId: 'marketplace-tab' },
              { id: 'customers', label: 'Customers', icon: Users, tourId: 'analytics-tab' },
              { id: 'drones', label: 'Drone Management', icon: Plane, tourId: 'drone-tab' },
              { id: 'analytics', label: 'Analytics', icon: Activity, tourId: 'analytics-tab' }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  data-tour={tab.tourId}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-agri-600 text-agri-700'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={stats.totalRevenue.toFixed(2)}
                change={stats.revenueChange}
                icon={DollarSign}
                prefix="$"
              />
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                change={stats.ordersChange}
                icon={ShoppingCart}
              />
              <StatCard
                title="Total Customers"
                value={stats.totalCustomers}
                change={stats.customersChange}
                icon={Users}
              />
              <StatCard
                title="Active Products"
                value={stats.activeProducts}
                change={stats.productsChange}
                icon={Package}
              />
            </div>

            {/* Charts & Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-neon-100 rounded-xl shadow-lg p-6 border-2 border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-agri-600 hover:text-agri-700 font-semibold text-sm flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-white">{order.id}</span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">{order.businessName}</p>
                        <p className="text-xs text-gray-400">{order.items} items • {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-agri-700">${order.total.toFixed(2)}</p>
                        <button className="text-gray-400 hover:text-gray-400 mt-1">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions & Alerts */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-neon-100 rounded-xl shadow-lg p-6 border-2 border-gray-100">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowAddProductModal(true)}
                      className="w-full bg-neon-100 border-2 border-gray-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2"
                    >
                      <Package className="w-5 h-5" />
                      Add Product
                    </button>
                    <button
                      onClick={() => setShowAddCustomerModal(true)}
                      className="w-full bg-neon-100 border-2 border-gray-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2"
                    >
                      <Users className="w-5 h-5" />
                      Add Customer
                    </button>
                    <button
                      onClick={exportReport}
                      className="w-full bg-neon-100 border-2 border-gray-900 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Export Report
                    </button>
                  </div>
                </div>

                {/* System Alerts */}
                <div className="bg-neon-100 rounded-xl shadow-lg p-6 border-2 border-gray-100">
                  <h3 className="text-lg font-bold text-white mb-4">System Alerts</h3>
                  <div className="space-y-3">
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
                      <div className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-amber-900">Low Stock Alert</p>
                          <p className="text-xs text-amber-800">{topProducts.filter(p => p.status === 'low_stock' || p.status === 'out_of_stock').length} products below threshold</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-agri-50 border-l-4 border-agri-500 p-3 rounded">
                      <div className="flex gap-2">
                        <CheckCircle className="w-5 h-5 text-agri-700 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-agri-900">System Synced</p>
                          <p className="text-xs text-agri-800">Last sync: {new Date(droneContext.bigDataSync.lastSync).toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-sky-50 border-l-4 border-sky-500 p-3 rounded">
                      <div className="flex gap-2">
                        <Activity className="w-5 h-5 text-sky-700 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-sky-900">Drone Status</p>
                          <p className="text-xs text-sky-800">{droneContext.drones.filter(d => d.status === 'active').length} drones active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products Table */}
            <div className="bg-neon-100 rounded-xl shadow-lg p-6 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Top Selling Products</h2>
                <div className="flex gap-2">
                  <button className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    <Filter className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    <Download className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-bold text-white">Product</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-white">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-white">Stock</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-white">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-white">Sales</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-white">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                        <td className="py-3 px-4 font-semibold text-white">{product.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-400">{product.category}</td>
                        <td className="py-3 px-4 text-sm text-white font-semibold">{product.stock}</td>
                        <td className="py-3 px-4 text-sm text-white font-bold">${product.price.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-agri-700 font-bold">{product.sales}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${getProductStatusColor(product.status)}`}>
                            {product.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-gray-200 rounded transition-all">
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-all">
                              <Edit className="w-4 h-4 text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-all">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Links to Main Platform */}
            <div className="bg-gradient-to-r from-agri-600 via-forest-600 to-agri-700 rounded-xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Platform Quick Links</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="/?tab=soil" className="bg-neon-100/10 backdrop-blur-sm hover:bg-neon-100/20 rounded-lg p-4 border border-white/20 transition-all group">
                  <div className="text-white">
                    <div className="text-sm font-semibold mb-1">Soil Analysis</div>
                    <div className="text-xs text-white/80">USDA SSURGO Data</div>
                  </div>
                </a>
                <a href="/?tab=drones" className="bg-neon-100/10 backdrop-blur-sm hover:bg-neon-100/20 rounded-lg p-4 border border-white/20 transition-all group">
                  <div className="text-white">
                    <div className="text-sm font-semibold mb-1">Live Drone Map</div>
                    <div className="text-xs text-white/80">Real-time monitoring</div>
                  </div>
                </a>
                <a href="/?tab=crops" className="bg-neon-100/10 backdrop-blur-sm hover:bg-neon-100/20 rounded-lg p-4 border border-white/20 transition-all group">
                  <div className="text-white">
                    <div className="text-sm font-semibold mb-1">Crop Catalog</div>
                    <div className="text-xs text-white/80">5000+ varieties</div>
                  </div>
                </a>
                <a href="/?tab=big-data" className="bg-neon-100/10 backdrop-blur-sm hover:bg-neon-100/20 rounded-lg p-4 border border-white/20 transition-all group">
                  <div className="text-white">
                    <div className="text-sm font-semibold mb-1">Big Data</div>
                    <div className="text-xs text-white/80">Analytics & Insights</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-neon-100 rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">All Orders</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500"
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <button className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Items</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-white">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{order.customerName}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{order.businessName}</td>
                      <td className="py-3 px-4 text-sm font-bold text-agri-700">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-400">{order.date}</td>
                      <td className="py-3 px-4 text-sm text-white">{order.items}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-neon-100 rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Product Catalog</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500"
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="flex items-center gap-2 bg-agri-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-agri-700"
                >
                  <Plus className="w-5 h-5" />
                  Add Product
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Stock</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Sales</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold text-white">{product.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{product.category}</td>
                      <td className="py-3 px-4 text-sm text-white font-semibold">{product.stock}</td>
                      <td className="py-3 px-4 text-sm text-white font-bold">${product.price.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm text-agri-700 font-bold">{product.sales}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getProductStatusColor(product.status)}`}>
                          {product.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-neon-100 rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Customer Management</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500"
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                <button
                  onClick={() => setShowAddCustomerModal(true)}
                  className="flex items-center gap-2 bg-agri-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-agri-700"
                >
                  <Plus className="w-5 h-5" />
                  Add Customer
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Customer ID</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Orders</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Total Spent</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-white">{customer.id}</td>
                      <td className="py-3 px-4 font-semibold text-white">{customer.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{customer.email}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{customer.company}</td>
                      <td className="py-3 px-4 text-sm text-white font-semibold">{customer.totalOrders}</td>
                      <td className="py-3 px-4 text-sm font-bold text-agri-700">${customer.totalSpent.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          customer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-white'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Eye className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-200 rounded">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'drones' && (
          <DroneManagement language={language} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}
      </main>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-neon-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-agri-600 to-forest-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Settings</h2>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-2 hover:bg-neon-100/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Language Settings */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-agri-600" />
                  Language / Dil
                </h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSettings({...settings, language: 'tr'})}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-bold transition-all ${
                      settings.language === 'tr'
                        ? 'border-agri-600 bg-agri-50 text-agri-700'
                        : 'border-gray-300 bg-neon-100 text-white hover:border-gray-400'
                    }`}
                  >
                    Türkçe
                  </button>
                  <button
                    onClick={() => setSettings({...settings, language: 'en'})}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 font-bold transition-all ${
                      settings.language === 'en'
                        ? 'border-agri-600 bg-agri-50 text-agri-700'
                        : 'border-gray-300 bg-neon-100 text-white hover:border-gray-400'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Theme Settings */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-agri-600" />
                  Theme / Tema
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setSettings({...settings, theme: 'light'})}
                    className={`py-3 px-4 rounded-lg border-2 font-bold transition-all flex items-center gap-2 justify-center ${
                      settings.theme === 'light'
                        ? 'border-agri-600 bg-agri-50 text-agri-700'
                        : 'border-gray-300 bg-neon-100 text-white hover:border-gray-400'
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                    Light
                  </button>
                  <button
                    onClick={() => setSettings({...settings, theme: 'dark'})}
                    className={`py-3 px-4 rounded-lg border-2 font-bold transition-all flex items-center gap-2 justify-center ${
                      settings.theme === 'dark'
                        ? 'border-agri-600 bg-agri-50 text-agri-700'
                        : 'border-gray-300 bg-neon-100 text-white hover:border-gray-400'
                    }`}
                  >
                    <Moon className="w-5 h-5" />
                    Dark
                  </button>
                  <button
                    onClick={() => setSettings({...settings, theme: 'auto'})}
                    className={`py-3 px-4 rounded-lg border-2 font-bold transition-all flex items-center gap-2 justify-center ${
                      settings.theme === 'auto'
                        ? 'border-agri-600 bg-agri-50 text-agri-700'
                        : 'border-gray-300 bg-neon-100 text-white hover:border-gray-400'
                    }`}
                  >
                    <Monitor className="w-5 h-5" />
                    Auto
                  </button>
                </div>
              </div>

              {/* Notification Settings */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-agri-600" />
                  Notifications / Bildirimler
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <span className="text-sm font-semibold text-white">Email Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, email: e.target.checked }
                      })}
                      className="w-5 h-5"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <span className="text-sm font-semibold text-white">Push Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.notifications.push}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, push: e.target.checked }
                      })}
                      className="w-5 h-5"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <span className="text-sm font-semibold text-white">SMS Notifications</span>
                    <input
                      type="checkbox"
                      checked={settings.notifications.sms}
                      onChange={(e) => setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, sms: e.target.checked }
                      })}
                      className="w-5 h-5"
                    />
                  </label>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-agri-600" />
                  Account / Hesap
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Name</label>
                    <input
                      type="text"
                      value={settings.account.name}
                      onChange={(e) => setSettings({
                        ...settings,
                        account: { ...settings.account, name: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.account.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        account: { ...settings.account, email: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Phone</label>
                    <input
                      type="tel"
                      value={settings.account.phone}
                      onChange={(e) => setSettings({
                        ...settings,
                        account: { ...settings.account, phone: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">Company</label>
                    <input
                      type="text"
                      value={settings.account.company}
                      onChange={(e) => setSettings({
                        ...settings,
                        account: { ...settings.account, company: e.target.value }
                      })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500"
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setLanguage(settings.language);
                    setShowSettingsModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-agri-600 to-forest-600 text-white font-bold py-3 rounded-lg hover:from-agri-700 hover:to-forest-700 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-6 bg-gray-200 text-white font-bold py-3 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-neon-100 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-agri-600 to-forest-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Add Product</h2>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="p-2 hover:bg-neon-100/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Product Name</label>
                <input type="text" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Category</label>
                <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500">
                  <option>Fertilizers</option>
                  <option>Machinery</option>
                  <option>Seeds</option>
                  <option>Equipment</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Price</label>
                  <input type="number" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Stock</label>
                  <input type="number" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500" />
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-agri-600 to-forest-600 text-white font-bold py-3 rounded-lg hover:from-agri-700 hover:to-forest-700 transition-all">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-neon-100 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-agri-600 to-forest-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Add Customer</h2>
              </div>
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="p-2 hover:bg-neon-100/20 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Customer Name</label>
                <input type="text" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Company</label>
                <input type="text" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Phone</label>
                <input type="tel" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500" />
              </div>
              <button className="w-full bg-gradient-to-r from-agri-600 to-forest-600 text-white font-bold py-3 rounded-lg hover:from-agri-700 hover:to-forest-700 transition-all">
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-neon-100 border-t-2 border-gray-200 mt-12">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-agri-600" />
                <span>Secure System</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-agri-600" />
                <span>Data Synced</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-agri-600" />
                <span>Auto-Refresh: {droneContext.realTimeData ? 'ON' : 'OFF'}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Tarım Lydian Platform • Agricultural System Management
            </div>
          </div>
        </div>
      </footer>

      {/* Product Tour */}
      <ProductTour />
    </div>
  );
}
