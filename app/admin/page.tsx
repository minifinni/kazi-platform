import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/Navbar';
import OrderStatusBadge from '@/components/OrderStatusBadge';

export default async function AdminPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login?redirect=/admin');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/dashboard');
  }

  // Get stats
  const { data: orders } = await supabase.from('orders').select('*');
  const { data: quotes } = await supabase.from('quotes').select('*');
  const { data: users } = await supabase.from('profiles').select('*');

  const totalRevenue = orders?.reduce((sum, o) => sum + parseFloat(o.total_price), 0) || 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link
            href="/factory"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700"
          >
            Factory View
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-primary-600">{orders?.length || 0}</div>
            <div className="text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-green-600">
              £{totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-gray-600">Total Revenue</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-blue-600">
              {quotes?.filter(q => q.status === 'pending').length || 0}
            </div>
            <div className="text-gray-600">Pending Quotes</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-purple-600">{users?.length || 0}</div>
            <div className="text-gray-600">Total Users</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/admin/orders"
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-bold">Manage Orders</h3>
            <p className="text-sm text-gray-600">View and update all orders</p>
          </Link>
          <Link
            href="/admin/pricing"
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-bold">Manage Pricing</h3>
            <p className="text-sm text-gray-600">Update pricing tiers</p>
          </Link>
          <Link
            href="/admin/users"
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-bold">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage users</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-primary-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders?.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium capitalize">{order.product_type}</div>
                      <div className="text-sm text-gray-500">#{order.id.slice(0, 8)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4">{order.quantity}</td>
                    <td className="px-6 py-4 font-medium">£{order.total_price}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {(!orders || orders.length === 0) && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
