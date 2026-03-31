import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Navbar from '@/components/Navbar';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import OrderTimeline from '@/components/OrderTimeline';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login?redirect=/dashboard/orders/' + id);
  }

  // Get order
  const { data: order } = await supabase
    .from('orders')
    .select('*, quotes(*)')
    .eq('id', id)
    .eq('customer_id', user.id)
    .single();

  if (!order) {
    redirect('/dashboard');
  }

  // Get order updates
  const { data: updates } = await supabase
    .from('order_updates')
    .select('*, profiles(full_name)')
    .eq('order_id', id)
    .order('created_at', { ascending: true });

  // Get messages
  const { data: messages } = await supabase
    .from('messages')
    .select('*, sender:profiles(full_name)')
    .eq('order_id', id)
    .order('created_at', { ascending: true });

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold capitalize">{order.product_type}</h1>
              <p className="text-gray-600">Order #{order.id.slice(0, 8)}</p>
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

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-bold mb-6">Production Progress</h2>
          <OrderTimeline currentStatus={order.status} updates={updates || []} />
        </div>

        {/* Updates History */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Updates</h2>
          {updates && updates.length > 0 ? (
            <div className="space-y-4">
              {updates.map((update) => (
                <div key={update.id} className="flex gap-4">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium capitalize">{update.status}</span>
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

        {/* Messages */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-bold mb-4">Messages</h2>
          {messages && messages.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`p-4 rounded-lg ${msg.sender_id === user.id ? 'bg-primary-50 ml-8' : 'bg-gray-50 mr-8'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {msg.sender?.full_name || 'Unknown'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{msg.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mb-4">No messages yet</p>
          )}
          
          {/* Message form - would need client component for interactivity */}
          <form className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
