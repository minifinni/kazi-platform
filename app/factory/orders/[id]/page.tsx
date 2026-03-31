'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import OrderTimeline from '@/components/OrderTimeline';
import { createClient } from '@/lib/supabase/client';

const statusFlow = ['ordered', 'cutting', 'sewing', 'printing', 'qc', 'shipping', 'delivered'];

export default function FactoryOrderPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [note, setNote] = useState('');
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        router.push('/auth/login');
        return;
      }
      setUser(authUser);

      // Get order
      const { data: orderData } = await supabase
        .from('orders')
        .select('*, profiles(full_name)')
        .eq('id', orderId)
        .single();

      if (orderData) {
        setOrder(orderData);
        setNewStatus(orderData.status);
      }

      // Get updates
      const { data: updatesData } = await supabase
        .from('order_updates')
        .select('*, profiles(full_name)')
        .eq('order_id', orderId)
        .order('created_at', { ascending: true });

      setUpdates(updatesData || []);
      setLoading(false);
    };

    fetchData();
  }, [orderId, router, supabase]);

  const handleUpdateStatus = async () => {
    if (newStatus === order.status) return;
    
    setUpdating(true);

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (updateError) {
      alert('Failed to update status');
      setUpdating(false);
      return;
    }

    // Create update record
    const { data: newUpdate } = await supabase
      .from('order_updates')
      .insert({
        order_id: orderId,
        status: newStatus,
        note: note || undefined,
        updated_by: user.id,
      })
      .select('*, profiles(full_name)')
      .single();

    if (newUpdate) {
      setUpdates([...updates, newUpdate]);
    }

    setOrder({ ...order, status: newStatus });
    setNote('');
    setUpdating(false);
  };

  const getNextStatus = () => {
    const currentIndex = statusFlow.indexOf(order.status);
    return statusFlow[currentIndex + 1];
  };

  const getPrevStatus = () => {
    const currentIndex = statusFlow.indexOf(order.status);
    return statusFlow[currentIndex - 1];
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">Loading...</div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p>Order not found</p>
          <Link href="/factory" className="text-primary-600 hover:underline">
            Back to Factory
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/factory" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
          ← Back to Factory
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold capitalize">{order.product_type}</h1>
              <p className="text-gray-600">Order #{order.id.slice(0, 8)}</p>
              <p className="text-sm text-gray-500 mt-1">Customer: {order.profiles?.full_name}</p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y">
            <div>
              <div className="text-sm text-gray-500">Quantity</div>
              <div className="font-semibold">{order.quantity} units</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Unit Price</div>
              <div className="font-semibold">£{order.unit_price}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="font-semibold text-primary-600">£{order.total_price}</div>
            </div>
          </div>

          {order.notes && (
            <div className="mt-4">
              <div className="text-sm text-gray-500">Notes</div>
              <div className="mt-1 text-gray-700">{order.notes}</div>
            </div>
          )}
        </div>

        {/* Update Status - Mobile Friendly */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Update Status</h2>
          
          <div className="space-y-4">
            {/* Quick buttons */}
            <div className="grid grid-cols-2 gap-3">
              {getPrevStatus() && (
                <button
                  onClick={() => setNewStatus(getPrevStatus())}
                  className="py-4 px-4 bg-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-200 active:bg-gray-300 transition-colors"
                >
                  ← {getPrevStatus()}
                </button>
              )}
              {getNextStatus() && (
                <button
                  onClick={() => setNewStatus(getNextStatus())}
                  className="py-4 px-4 bg-primary-600 rounded-xl font-medium text-white hover:bg-primary-700 active:bg-primary-800 transition-colors"
                >
                  {getNextStatus()} →
                </button>
              )}
            </div>

            {/* Manual selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-4 py-4 border rounded-xl text-lg focus:ring-2 focus:ring-primary-500"
              >
                {statusFlow.map((s) => (
                  <option key={s} value={s}>
                    {s === 'qc' ? 'Quality Check' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note (optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note about this update..."
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>

            <button
              onClick={handleUpdateStatus}
              disabled={updating || newStatus === order.status}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {updating ? 'Updating...' : 'Save Status Update'}
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-bold mb-6">Production Progress</h2>
          <OrderTimeline currentStatus={order.status} updates={updates} />
        </div>

        {/* Updates History */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold mb-4">Update History</h2>
          {updates.length > 0 ? (
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="flex gap-4">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">
                        {update.status === 'qc' ? 'Quality Check' : update.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(update.created_at).toLocaleString()}
                      </span>
                    </div>
                    {update.note && (
                      <p className="text-gray-600 text-sm mt-1">{update.note}</p>
                    )}
                    {update.profiles && (
                      <p className="text-xs text-gray-400 mt-1">
                        by {update.profiles.full_name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No updates yet</p>
          )}
        </div>
      </div>
    </main>
  );
}
