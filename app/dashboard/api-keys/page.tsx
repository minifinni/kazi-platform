'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { createClient } from '@/lib/supabase/client';
import { Copy, Trash2, Key, Plus, Eye, EyeOff } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  created_at: string;
  last_used_at: string | null;
  is_active: boolean;
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [showNewKey, setShowNewKey] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, created_at, last_used_at, is_active')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setApiKeys(data);
    }
    setLoading(false);
  };

  const generateApiKey = async () => {
    if (!newKeyName.trim()) return;
    
    setCreating(true);
    setError('');
    
    try {
      // Generate a random key
      const prefix = 'kazi_';
      const randomPart = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      const fullKey = `${prefix}${randomPart}`;
      
      // Hash the key for storage
      const encoder = new TextEncoder();
      const data = encoder.encode(fullKey);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const keyHash = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Save to database
      const { error: insertError } = await supabase
        .from('api_keys')
        .insert({
          name: newKeyName,
          key_hash: keyHash,
        });
      
      if (insertError) throw insertError;
      
      // Show the key once
      setShowNewKey(fullKey);
      setNewKeyName('');
      fetchApiKeys();
    } catch (err: any) {
      setError(err.message || 'Failed to create API key');
    } finally {
      setCreating(false);
    }
  };

  const deleteKey = async (id: string) => {
    if (!confirm('Are you sure? This will invalidate this API key immediately.')) return;
    
    await supabase.from('api_keys').delete().eq('id', id);
    fetchApiKeys();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">API Keys</h1>
          <p className="opacity-90">Manage API access for programmatic order creation</p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Key className="w-5 h-5" />
              Kazi Manufacturing API
            </h3>
            <p className="text-blue-800 text-sm mb-4">
              Use API keys to create orders programmatically. Perfect for integrating with your 
              e-commerce platform or internal systems.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-gray-300 overflow-x-auto">
              <div className="text-green-400"># Create an order via API</div>
              <div>curl -X POST https://kazimanufacturing.com/api/v1/orders \</div>
              <div>  -H "Authorization: Bearer YOUR_API_KEY" \</div>
              <div>  -H "Content-Type: application/json" \</div>
              <div>{`  -d '{"product_type":"tshirt","quantity":100,...}'`}</div>
            </div>
          </div>

          {/* Create New Key */}
          <div className="bg-white border rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Create New API Key</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Key name (e.g., Shopify Integration)"
                value={newKeyName}
                onChange={e => setNewKeyName(e.target.value)}
                className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                onClick={generateApiKey}
                disabled={creating || !newKeyName.trim()}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {creating ? 'Creating...' : 'Create Key'}
              </button>
            </div>
            {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
          </div>

          {/* Show New Key */}
          {showNewKey && (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-yellow-900">Copy Your API Key</h3>
                <button 
                  onClick={() => setShowNewKey(null)}
                  className="text-yellow-700 hover:text-yellow-900"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-yellow-800 text-sm mb-4">
                This is the only time you'll see this key. Copy it now and store it securely.
              </p>
              <div className="flex gap-2">
                <code className="flex-1 bg-gray-900 text-green-400 px-4 py-3 rounded-lg font-mono text-sm break-all">
                  {showNewKey}
                </code>
                <button
                  onClick={() => copyToClipboard(showNewKey)}
                  className="bg-yellow-400 text-yellow-900 px-4 py-3 rounded-lg font-semibold hover:bg-yellow-500"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* API Keys List */}
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="font-semibold">Your API Keys</h2>
            </div>
            
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading...</div>
            ) : apiKeys.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No API keys yet. Create one above to get started.
              </div>
            ) : (
              <div className="divide-y">
                {apiKeys.map(key => (
                  <div key={key.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{key.name}</h3>
                      <p className="text-sm text-gray-500">
                        Created {new Date(key.created_at).toLocaleDateString()}
                        {key.last_used_at && ` • Last used ${new Date(key.last_used_at).toLocaleDateString()}`}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteKey(key.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                      title="Delete key"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
