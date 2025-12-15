'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface Pesticide {
  product_name: string;
  company_name: string;
  active_ingredients: string;
  toxicity_category: string;
  site_use: string;
  pest_type: string;
  application_rate: string;
  restricted_use: string;
}

export default function PesticideTable() {
  const [pesticides, setPesticides] = useState<Pesticide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPesticides();
  }, []);

  const fetchPesticides = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/epa-pesticides');
      const data = await response.json();
      if (data.data) {
        setPesticides(data.data);
      }
    } catch (error) {
      console.error('Pesticide data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getToxicityColor = (category: string) => {
    if (category.includes('I')) return 'text-red-600 bg-red-50';
    if (category.includes('II')) return 'text-orange-600 bg-orange-50';
    if (category.includes('III')) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
        <div className="h-96 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const filteredPesticides = pesticides.filter(p =>
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.active_ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">EPA Registered Pesticides</h3>
        <p className="text-sm text-gray-600 mb-4">Agricultural chemicals database with safety information</p>

        <input
          type="text"
          placeholder="Search by product name or active ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Active Ingredient
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Toxicity
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Target Pests
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Restricted
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPesticides.map((pesticide, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <div className="font-semibold text-gray-900">{pesticide.product_name}</div>
                  <div className="text-xs text-gray-500">{pesticide.company_name}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {pesticide.active_ingredients}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getToxicityColor(pesticide.toxicity_category)}`}>
                    {pesticide.toxicity_category}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {pesticide.pest_type}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {pesticide.application_rate}
                </td>
                <td className="px-4 py-4 text-center">
                  {pesticide.restricted_use === 'Yes' ? (
                    <AlertTriangle className="w-5 h-5 text-red-600 mx-auto" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPesticides.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <XCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>No pesticides found matching your search</p>
        </div>
      )}
    </div>
  );
}
