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
  Truck,
  AlertCircle,
  CheckCircle,
  Clock,
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
  Calendar,
  MapPin,
  Activity,
  Zap,
  Shield,
  Database,
  RefreshCw,
  Lock,
  LogIn,
  Plane,
  Globe
} from 'lucide-react';
import DroneManagement from '@/components/DroneManagement';

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

export default function TarimDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard Admin Credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin@ailydian.com',
    password: 'LydianAgri2025!'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('tarim_dashboard_auth', 'true');
    } else {
      setError('Geçersiz kullanıcı adı veya şifre / Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('tarim_dashboard_auth');
  };

  // Check if user is already logged in
  useEffect(() => {
    const authStatus = localStorage.getItem('tarim_dashboard_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 124580.50,
    revenueChange: 12.5,
    totalOrders: 342,
    ordersChange: 8.3,
    totalCustomers: 1248,
    customersChange: 15.2,
    activeProducts: 156,
    productsChange: 3.1
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([
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
  ]);

  const [topProducts, setTopProducts] = useState<Product[]>([
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
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers' | 'analytics' | 'drones'>('overview');
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');

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
        return 'bg-gray-100 text-gray-700 border-gray-200';
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
        return 'bg-gray-100 text-gray-700';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, prefix = '', suffix = '' }: { title: string; value: number | string; change: number; icon: any; prefix?: string; suffix?: string }) => {
    const isPositive = change >= 0;
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-agri-300 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-gradient-to-br from-agri-100 to-forest-100 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-agri-700" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-agri-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </div>
        <div className="text-sm text-gray-600 font-semibold">{title}</div>
      </div>
    );
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
          <form onSubmit={handleLogin} className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Hoş Geldiniz / Welcome</h2>
              <p className="text-sm text-gray-600">Devam etmek için giriş yapın / Sign in to continue</p>
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
                <label className="block text-sm font-bold text-gray-700 mb-2">
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
                <label className="block text-sm font-bold text-gray-700 mb-2">
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
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <Eye className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-agri-600 to-forest-600 text-white font-bold py-4 rounded-lg hover:from-agri-700 hover:to-forest-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Giriş Yap / Sign In
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded">
                <div className="flex gap-2">
                  <Shield className="w-5 h-5 text-sky-700 flex-shrink-0" />
                  <div className="text-xs text-sky-900">
                    <p className="font-semibold mb-1">Giriş Bilgileri / Credentials</p>
                    <p className="text-sky-800 font-mono">
                      <strong>Email:</strong> admin@ailydian.com<br/>
                      <strong>Password:</strong> LydianAgri2025!
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
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-40 shadow-md">
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
                <h1 className="text-2xl font-display font-bold text-gray-900">Tarım Dashboard</h1>
                <p className="text-sm text-gray-600">Agricultural System Management</p>
              </div>
              <a
                href="/"
                className="ml-4 flex items-center gap-2 text-sm font-semibold text-agri-700 hover:text-agri-900 transition-all"
              >
                ← Back to Platform
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                className="flex items-center gap-2 bg-white border-2 border-agri-600 text-agri-600 font-bold px-4 py-2 rounded-lg hover:bg-agri-50 transition-all"
              >
                <Globe className="w-5 h-5" />
                <span>{language === 'tr' ? 'EN' : 'TR'}</span>
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full"></span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white border-2 border-red-600 text-red-600 font-bold px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
              >
                <Lock className="w-5 h-5" />
                <span>Çıkış / Logout</span>
              </button>
              <button className="flex items-center gap-2 bg-white border-2 border-gray-900 text-gray-900 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'customers', label: 'Customers', icon: Users },
              { id: 'drones', label: 'Drone Management', icon: Plane },
              { id: 'analytics', label: 'Analytics', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-agri-600 text-agri-700'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
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
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                  <button className="text-agri-600 hover:text-agri-700 font-semibold text-sm flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-gray-900">{order.id}</span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{order.businessName}</p>
                        <p className="text-xs text-gray-500">{order.items} items • {order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-agri-700">${order.total.toFixed(2)}</p>
                        <button className="text-gray-400 hover:text-gray-600 mt-1">
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
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-white border-2 border-gray-900 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Add Product
                    </button>
                    <button className="w-full bg-white border-2 border-gray-900 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Add Customer
                    </button>
                    <button className="w-full bg-white border-2 border-gray-900 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Export Report
                    </button>
                  </div>
                </div>

                {/* System Alerts */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">System Alerts</h3>
                  <div className="space-y-3">
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
                      <div className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-amber-900">Low Stock Alert</p>
                          <p className="text-xs text-amber-800">5 products below threshold</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-agri-50 border-l-4 border-agri-500 p-3 rounded">
                      <div className="flex gap-2">
                        <CheckCircle className="w-5 h-5 text-agri-700 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-agri-900">System Synced</p>
                          <p className="text-xs text-agri-800">Last sync: 2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-sky-50 border-l-4 border-sky-500 p-3 rounded">
                      <div className="flex gap-2">
                        <Activity className="w-5 h-5 text-sky-700 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-sky-900">Server Status</p>
                          <p className="text-xs text-sky-800">All systems operational</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products Table */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Top Selling Products</h2>
                <div className="flex gap-2">
                  <button className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    <Filter className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                    <Download className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Product</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Stock</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Sales</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                        <td className="py-3 px-4 font-semibold text-gray-900">{product.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{product.category}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 font-semibold">{product.stock}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 font-bold">${product.price.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-agri-700 font-bold">{product.sales}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${getProductStatusColor(product.status)}`}>
                            {product.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-gray-200 rounded transition-all">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 rounded transition-all">
                              <Edit className="w-4 h-4 text-gray-600" />
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
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Orders</h2>
            <p className="text-gray-600">Orders management interface coming soon...</p>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Management</h2>
            <p className="text-gray-600">Product management interface coming soon...</p>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Management</h2>
            <p className="text-gray-600">Customer management interface coming soon...</p>
          </div>
        )}

        {activeTab === 'drones' && (
          <DroneManagement language={language} />
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Reports</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-gray-200 mt-12">
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-600">
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
                <span>Auto-Refresh: ON</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              © 2025 Tarım Lydian Platform • Agricultural System Management
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
