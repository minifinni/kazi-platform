import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/Navbar';
import OrderStatusBadge from '@/components/OrderStatusBadge';

export default async function FactoryPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login?redirect=/factory');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || (profile.role !== 'employee' && profile.role !== 'admin')) {
    redirect('/dashboard');
  }

  // Get all orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*, profiles(full_name)')
    .order('created_at', { ascending: false });

  // Get pending quotes
  const { data: pendingQuotes } = await supabase
    .from('quotes')
    .select('*, profiles(full_name)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  // Group orders by status
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ordersByStatus = orders?.reduce((acc: any, order: any) => {
    if (!acc[order.status]) acc[order.status] = [];
    acc[order.status].push(order);
    return acc;
  }, {});

  const statusOrder = ['ordered', 'cutting', 'sewing', 'printing', 'qc', 'shipping', 'delivered'];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Factory Dashboard</h1>
            <p className="text-gray-600">Welcome, {profile.full_name}</p>
          </div>
          {profile.role === 'admin' && (
            <Link
              href="/admin"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900"
            >
              Admin Panel
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-primary-600">
              {orders?.filter(o => o.status !== 'delivered').length || 0}
            </div>
            <div className="text-sm text-gray-600">Active Orders</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-yellow-600">
              {orders?.filter(o => o.status === 'ordered').length || 0}
            </div>
            <div className="text-sm text-gray-600">New Orders</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-red-700">
              {orders?.filter(o => ['cutting', 'sewing', 'printing'].includes(o.status)).length || 0}
            </div>
            <div className="text-sm text-gray-600">In Production</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">
              {pendingQuotes?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Pending Quotes</div>
          </div>
        </div>

        {/* Pending Quotes Alert */}
        {pendingQuotes && pendingQuotes.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-yellow-800">
                  {pendingQuotes.length} pending quote{pendingQuotes.length > 1 ? 's' : ''}
                </span>
                <span className="text-yellow-700 ml-2">need attention</span>
              </div>
              {profile.role === 'admin' && (
                <Link
                  href="/admin"
                  className="text-yellow-800 font-medium hover:underline"
                >
                  Review →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Kanban Board */}
        <h2 className="text-xl font-bold mb-4">Production Queue</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-max pb-4">
            {statusOrder.map((status) => {
              const statusOrders = ordersByStatus?.[status] || [];
              return (
                <div key={status} className="w-72">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold capitalize">{status}</h3>
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {statusOrders.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {statusOrders.map((order: any) => (
                      <Link
                        key={order.id}
                        href={`/factory/orders/${order.id}`}
                        className="block bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-sm font-medium capitalize">
                            {order.product_type}
                          </div>
                          <OrderStatusBadge status={order.status} />
                        </div>
                        <div className="text-sm text-gray-600">
                          {order.quantity} units · £{order.total_price}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          {order.profiles?.full_name || 'Unknown'}
                        </div>
                        <div className="text-xs text-gray-400">
                          #{order.id.slice(0, 8)}
                        </div>
                      </Link>
                    ))}
                    {statusOrders.length === 0 && (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        No orders
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
