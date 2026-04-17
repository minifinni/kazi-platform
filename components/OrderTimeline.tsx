interface OrderTimelineProps {
  currentStatus: string;
  updates?: { status: string; created_at: string; note?: string }[];
}

const stages = [
  { id: 'ordered', label: 'Ordered' },
  { id: 'cutting', label: 'Cutting' },
  { id: 'sewing', label: 'Sewing' },
  { id: 'printing', label: 'Printing' },
  { id: 'qc', label: 'Quality Check' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'delivered', label: 'Delivered' },
];

export default function OrderTimeline({ currentStatus, updates = [] }: OrderTimelineProps) {
  const currentStageIndex = stages.findIndex(s => s.id === currentStatus);

  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 rounded" />
        <div 
          className="absolute top-6 left-0 h-1 bg-primary-600 rounded transition-all duration-500"
          style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
        />
        
        {/* Stages */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const isCompleted = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;
            
            return (
              <div key={stage.id} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-300 z-10 ${
                    isCompleted
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : isCurrent
                      ? 'bg-white border-primary-600 text-primary-600'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {isCompleted && !isCurrent ? '✓' : index + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                    isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {stage.label}
                </span>
                
                {/* Update note if any */}
                {updates.find(u => u.status === stage.id)?.note && (
                  <span className="mt-1 text-[10px] text-gray-500 text-center max-w-[100px] truncate">
                    {updates.find(u => u.status === stage.id)?.note}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
