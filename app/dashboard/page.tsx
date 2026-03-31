import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/Navbar';
import OrderStatusBadge from '@/components/OrderStatusBadge';

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login?redirect=/dashboard');
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || (profile.role !== 'customer' && profile.role !== 'admin')) {
    redirect('/factory');
  }

  // Get user's orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false });

  // Get user's quotes
  const { data: quotes } = await supabase
    .from('quotes')
    .select('*')
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {profile.full_name}</h1>
            <p className="text-gray-600">Manage your orders and quotes</p>
          </div>
          <Link
            href="/quote"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700"
          >
            New Quote
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-primary-600">
              {orders?.filter(o => o.status !== 'delivered').length || 0}
            </div>
            <div className="text-gray-600">Active Orders</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-primary-600">
              {orders?.filter(o => o.status === 'delivered').length || 0}
            </div>
            <div className="text-gray-600">Completed Orders</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-primary-600">
              {quotes?.filter(q => q.status === 'pending').length || 0}
            </div>
            <div className="text-gray-600">Pending Quotes</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Orders */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Orders</h2>
            {orders && orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/dashboard/orders/${order.id}`}
                    className="block bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium capitalize">{order.product_type}</div>
                        <div className="text-sm text-gray-500">
                          {order.quantity} units · £{order.total_price}
                        </div>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <div className="text-xs text-gray-400">
                      Ordered {new Date(order.created_at).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
                <p className="text-gray-500 mb-4">No orders yet</p>
                <Link
                  href="/quote"
                  className="text-primary-600 font-medium hover:underline"
                >
                  Request your first quote
                </Link>
              </div>
            )}
          </div>

          {/* Quotes */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Quotes</h2>
            {quotes && quotes.length > 0 ? (
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="bg-white p-4 rounded-xl shadow-sm border"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium capitalize">{quote.product_type}</div>
                        <div className="text-sm text-gray-500">
                          {quote.quantity} units
                        </div>
                      </div>
                      <OrderStatusBadge status={quote.status} />
                    </div>
                    {quote.quoted_price && (
                      <div className="text-sm font-medium text-primary-600 mb-2">
                        Quote: £{quote.quoted_price}
                      </div>
                    )}
                    <div className="text-xs text-gray-400">
                      Submitted {new Date(quote.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
                <p className="text-gray-500">No quotes yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
