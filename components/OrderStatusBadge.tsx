interface OrderStatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  ordered: { label: 'Ordered', className: 'bg-blue-100 text-blue-800' },
  cutting: { label: 'Cutting', className: 'bg-yellow-100 text-yellow-800' },
  sewing: { label: 'Sewing', className: 'bg-red-100 text-red-800' },
  printing: { label: 'Printing', className: 'bg-purple-100 text-purple-800' },
  qc: { label: 'Quality Check', className: 'bg-pink-100 text-pink-800' },
  shipping: { label: 'Shipping', className: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Delivered', className: 'bg-green-100 text-green-800' },
  pending: { label: 'Pending', className: 'bg-gray-100 text-gray-800' },
  quoted: { label: 'Quoted', className: 'bg-blue-100 text-blue-800' },
  accepted: { label: 'Accepted', className: 'bg-green-100 text-green-800' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
  
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
