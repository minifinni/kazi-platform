'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { createClient } from '@/lib/supabase/client';

interface PricingTier {
  id: string;
  product_type: string;
  min_qty: number;
  max_qty: number | null;
  price_per_unit: number;
}

export default function AdminPricingPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');

  const supabase = createClient();

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    const { data } = await supabase
      .from('pricing_tiers')
      .select('*')
      .order('product_type', { ascending: true })
      .order('min_qty', { ascending: true });
    
    setTiers(data || []);
    setLoading(false);
  };

  const handleSave = async (id: string) => {
    const price = parseFloat(editPrice);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    const { error } = await supabase
      .from('pricing_tiers')
      .update({ price_per_unit: price })
      .eq('id', id);

    if (error) {
      alert('Failed to update price');
      return;
    }

    setEditing(null);
    fetchTiers();
  };

  const getProductLabel = (type: string) => {
    const labels: Record<string, string> = {
      tshirt: 'T-Shirts',
      hoodie: 'Hoodies',
      embroidery_small: 'Embroidery (Small)',
      embroidery_large: 'Embroidery (Large)',
      screen_print_per_colour: 'Screen Print (per colour)',
      dtg_print: 'DTG Print',
    };
    return labels[type] || type;
  };

  const groupedTiers = tiers.reduce((acc, tier) => {
    if (!acc[tier.product_type]) acc[tier.product_type] = [];
    acc[tier.product_type].push(tier);
    return acc;
  }, {} as Record<string, PricingTier[]>);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to Admin
          </Link>
          <h1 className="text-3xl font-bold mt-2">Manage Pricing</h1>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedTiers).map(([productType, productTiers]) => (
            <div key={productType} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="font-bold text-lg">{getProductLabel(productType)}</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="text-sm text-gray-600 border-b">
                    <th className="px-6 py-3 text-left">Quantity Range</th>
                    <th className="px-6 py-3 text-right">Price per Unit</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productTiers.map((tier) => (
                    <tr key={tier.id} className="border-b last:border-0">
                      <td className="px-6 py-4">
                        {tier.min_qty} - {tier.max_qty || '+'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {editing === tier.id ? (
                          <input
                            type="number"
                            step="0.01"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="w-24 px-2 py-1 border rounded text-right"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium">£{tier.price_per_unit.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {editing === tier.id ? (
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleSave(tier.id)}
                              className="text-green-600 font-medium hover:text-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditing(null)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditing(tier.id);
                              setEditPrice(tier.price_per_unit.toString());
                            }}
                            className="text-primary-600 font-medium hover:text-primary-700"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
