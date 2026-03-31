'use client';

import { useState, useMemo } from 'react';

interface PricingTier {
  minQty: number;
  maxQty: number | null;
  price: number;
}

const tshirtTiers: PricingTier[] = [
  { minQty: 50, maxQty: 99, price: 8.50 },
  { minQty: 100, maxQty: 249, price: 6.50 },
  { minQty: 250, maxQty: 499, price: 5.00 },
  { minQty: 500, maxQty: 999, price: 4.00 },
  { minQty: 1000, maxQty: null, price: 3.20 },
];

const hoodieTiers: PricingTier[] = [
  { minQty: 50, maxQty: 99, price: 18.00 },
  { minQty: 100, maxQty: 249, price: 14.50 },
  { minQty: 250, maxQty: 499, price: 12.00 },
  { minQty: 500, maxQty: 999, price: 10.00 },
  { minQty: 1000, maxQty: null, price: 8.50 },
];

export default function PricingCalculator() {
  const [productType, setProductType] = useState<'tshirt' | 'hoodie'>('tshirt');
  const [quantity, setQuantity] = useState(50);
  const [addOns, setAddOns] = useState({
    embroidery: false,
    embroiderySize: 'small',
    screenPrint: false,
    screenPrintColors: 1,
    dtgPrint: false,
  });

  const tiers = productType === 'tshirt' ? tshirtTiers : hoodieTiers;

  const basePricePerUnit = useMemo(() => {
    const tier = tiers.find(t => 
      quantity >= t.minQty && (t.maxQty === null || quantity <= t.maxQty)
    );
    return tier?.price || tiers[0].price;
  }, [quantity, tiers]);

  const addOnPrice = useMemo(() => {
    let total = 0;
    if (addOns.embroidery) {
      total += addOns.embroiderySize === 'small' ? 2.50 : 4.00;
    }
    if (addOns.screenPrint) {
      total += addOns.screenPrintColors * 1.50;
    }
    if (addOns.dtgPrint) {
      total += 3.50;
    }
    return total;
  }, [addOns]);

  const unitPrice = basePricePerUnit + addOnPrice;
  const totalPrice = unitPrice * quantity;

  const savingsVsMinQty = useMemo(() => {
    const minQtyPrice = tiers[0].price + addOnPrice;
    const savings = (minQtyPrice - unitPrice) * quantity;
    return savings;
  }, [unitPrice, quantity, tiers, addOnPrice]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Product Type */}
      <div className="p-6 border-b border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-3">Product Type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setProductType('tshirt')}
            className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
              productType === 'tshirt'
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            T-Shirts
          </button>
          <button
            onClick={() => setProductType('hoodie')}
            className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors ${
              productType === 'hoodie'
                ? 'border-primary-600 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Hoodies
          </button>
        </div>
      </div>

      {/* Quantity Slider */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <span className="text-2xl font-bold text-primary-700">{quantity} units</span>
        </div>
        <input
          type="range"
          min="50"
          max="2000"
          step="10"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>50</span>
          <span>500</span>
          <span>1000</span>
          <span>2000</span>
        </div>
        
        {/* Quantity tiers indicator */}
        <div className="flex mt-4 gap-1">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`flex-1 h-2 rounded-full ${
                quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)
                  ? 'bg-primary-600'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>50+</span>
          <span>100+</span>
          <span>250+</span>
          <span>500+</span>
          <span>1000+</span>
        </div>
      </div>

      {/* Add-ons */}
      <div className="p-6 border-b border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-3">Add-ons</label>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={addOns.embroidery}
              onChange={(e) => setAddOns({ ...addOns, embroidery: e.target.checked })}
              className="w-5 h-5 text-primary-600 rounded"
            />
            <div className="flex-1">
              <div className="font-medium">Embroidery</div>
              <div className="text-sm text-gray-500">+£{addOns.embroiderySize === 'small' ? '2.50' : '4.00'}/unit</div>
            </div>
            {addOns.embroidery && (
              <select
                value={addOns.embroiderySize}
                onChange={(e) => setAddOns({ ...addOns, embroiderySize: e.target.value })}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="small">Small</option>
                <option value="large">Large</option>
              </select>
            )}
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={addOns.screenPrint}
              onChange={(e) => setAddOns({ ...addOns, screenPrint: e.target.checked })}
              className="w-5 h-5 text-primary-600 rounded"
            />
            <div className="flex-1">
              <div className="font-medium">Screen Print</div>
              <div className="text-sm text-gray-500">+£1.50/colour/unit</div>
            </div>
            {addOns.screenPrint && (
              <input
                type="number"
                min="1"
                max="6"
                value={addOns.screenPrintColors}
                onChange={(e) => setAddOns({ ...addOns, screenPrintColors: parseInt(e.target.value) || 1 })}
                className="w-16 text-sm border rounded px-2 py-1"
              />
            )}
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={addOns.dtgPrint}
              onChange={(e) => setAddOns({ ...addOns, dtgPrint: e.target.checked })}
              className="w-5 h-5 text-primary-600 rounded"
            />
            <div className="flex-1">
              <div className="font-medium">DTG Print</div>
              <div className="text-sm text-gray-500">+£3.50/unit</div>
            </div>
          </label>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="p-6 bg-gray-50">
        <div className="flex justify-between items-end mb-2">
          <span className="text-gray-600">Unit Price</span>
          <span className="text-2xl font-bold text-gray-900">£{unitPrice.toFixed(2)}</span>
        </div>
        {savingsVsMinQty > 0 && (
          <div className="text-sm text-green-600 mb-4">
            You save £{savingsVsMinQty.toFixed(2)} vs minimum order quantity pricing
          </div>
        )}
        <div className="flex justify-between items-end pt-4 border-t border-gray-200">
          <span className="text-lg font-medium text-gray-900">Total</span>
          <span className="text-4xl font-bold text-primary-700">£{totalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
        <a
          href="/quote"
          className="block w-full mt-6 bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Request Quote
        </a>
      </div>
    </div>
  );
}
