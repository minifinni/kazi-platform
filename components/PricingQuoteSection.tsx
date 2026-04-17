'use client';

import { useState, useMemo, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Check, FolderOpen, FileText } from 'lucide-react';

const TSHIRT_TIERS = [
  { minQty: 50, maxQty: 99, price: 8.50 },
  { minQty: 100, maxQty: 249, price: 6.50 },
  { minQty: 250, maxQty: 499, price: 5.00 },
  { minQty: 500, maxQty: 999, price: 4.00 },
  { minQty: 1000, maxQty: null, price: 3.20 },
];
const HOODIE_TIERS = [
  { minQty: 50, maxQty: 99, price: 18.00 },
  { minQty: 100, maxQty: 249, price: 14.50 },
  { minQty: 250, maxQty: 499, price: 12.00 },
  { minQty: 500, maxQty: 999, price: 10.00 },
  { minQty: 1000, maxQty: null, price: 8.50 },
];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy', hex: '#1a365d' },
  { name: 'Heather Grey', hex: '#9ca3af' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Forest Green', hex: '#166534' },
  { name: 'Custom', hex: null },
];

type ProductType = 'tshirt' | 'hoodie';

function getPricePerUnit(tiers: typeof TSHIRT_TIERS, qty: number) {
  return tiers.find(t => qty >= t.minQty && (t.maxQty === null || qty <= t.maxQty))?.price ?? tiers[0].price;
}

export default function PricingQuoteSection() {
  // Shared calculator state
  const [productType, setProductType] = useState<ProductType>('tshirt');
  const [quantity, setQuantity] = useState(100);
  const [addOns, setAddOns] = useState({
    embroidery: false,
    embroiderySize: 'small',
    screenPrint: false,
    screenPrintColors: 1,
    dtgPrint: false,
  });

  // Quote form state
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '',
    sizes: {} as Record<string, number>,
    colors: [] as string[],
    details: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  // Pricing calculations
  const tiers = productType === 'tshirt' ? TSHIRT_TIERS : HOODIE_TIERS;
  const basePrice = getPricePerUnit(tiers, quantity);
  const addOnPrice = useMemo(() => {
    let total = 0;
    if (addOns.embroidery) total += addOns.embroiderySize === 'small' ? 2.50 : 4.00;
    if (addOns.screenPrint) total += addOns.screenPrintColors * 1.50;
    if (addOns.dtgPrint) total += 3.50;
    return total;
  }, [addOns]);
  const unitPrice = basePrice + addOnPrice;
  const totalPrice = unitPrice * quantity;
  const savings = useMemo(() => (tiers[0].price + addOnPrice - unitPrice) * quantity, [tiers, addOnPrice, unitPrice, quantity]);

  const toggleColor = (name: string) =>
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(name) ? prev.colors.filter(c => c !== name) : [...prev.colors, name],
    }));

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const totalFromSizes = Object.values(formData.sizes).reduce((a, b) => a + b, 0);
      const finalQty = totalFromSizes > 0 ? totalFromSizes : quantity;

      let customerId = null;
      const { data: existing } = await supabase.from('profiles').select('id').eq('email', formData.email).single();
      if (existing) {
        customerId = existing.id;
      } else {
        const { data: newProfile, error: profileError } = await supabase
          .from('profiles')
          .insert({ email: formData.email, full_name: formData.name, company_name: formData.company || null, phone: formData.phone || null, role: 'customer' })
          .select('id').single();
        if (profileError) throw profileError;
        customerId = newProfile.id;
      }

      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          customer_id: customerId,
          product_type: productType,
          quantity: finalQty,
          size_breakdown: formData.sizes,
          colors: formData.colors,
          details: [
            addOns.embroidery ? `Embroidery (${addOns.embroiderySize})` : null,
            addOns.screenPrint ? `Screen print (${addOns.screenPrintColors} colour${addOns.screenPrintColors > 1 ? 's' : ''})` : null,
            addOns.dtgPrint ? 'DTG print' : null,
            formData.details,
          ].filter(Boolean).join(' · '),
          quoted_price: unitPrice,
          status: 'pending',
        })
        .select('id').single();
      if (quoteError) throw quoteError;

      for (const file of files) {
        const ext = file.name.split('.').pop();
        const path = `${quote.id}/${Date.now()}-${Math.random().toString(36).slice(7)}.${ext}`;
        await supabase.storage.from('design-files').upload(path, file);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-12 text-center">
        <Check className="w-14 h-14 text-green-500 mx-auto mb-4" strokeWidth={2.5} />
        <h3 className="text-2xl font-bold mb-2">Quote submitted!</h3>
        <p className="text-gray-600">We'll review your details and respond within 24 hours.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border rounded-xl overflow-hidden shadow-sm">

      {/* LEFT — Calculator */}
      <div className="bg-white border-r border-gray-100">
        {/* Product type */}
        <div className="p-6 border-b border-gray-100">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Product</label>
          <div className="grid grid-cols-2 gap-2">
            {(['tshirt', 'hoodie'] as ProductType[]).map(type => (
              <button key={type} onClick={() => setProductType(type)}
                className={`py-3 px-4 rounded-lg border-2 font-medium transition-colors text-sm ${
                  productType === type ? 'border-red-600 bg-red-50 text-red-700' : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}>
                {type === 'tshirt' ? 'T-Shirts' : 'Hoodies'}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-baseline mb-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Quantity</label>
            <span className="text-2xl font-bold text-gray-900">{quantity.toLocaleString()} units</span>
          </div>
          <input type="range" min="50" max="2000" step="10" value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600" />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>50</span><span>500</span><span>1000</span><span>2000</span>
          </div>
          {/* Tier indicator */}
          <div className="flex mt-3 gap-1">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`flex-1 h-1.5 rounded-full transition-colors ${
                quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty) ? 'bg-red-600' : 'bg-gray-200'
              }`} />
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="p-6 border-b border-gray-100">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Add-ons</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" checked={addOns.embroidery}
                onChange={e => setAddOns({ ...addOns, embroidery: e.target.checked })}
                className="w-4 h-4 accent-red-600" />
              <div className="flex-1 text-sm">
                <div className="font-medium">Embroidery</div>
                <div className="text-gray-400">+£{addOns.embroiderySize === 'small' ? '2.50' : '4.00'}/unit</div>
              </div>
              {addOns.embroidery && (
                <select value={addOns.embroiderySize}
                  onChange={e => setAddOns({ ...addOns, embroiderySize: e.target.value })}
                  className="text-sm border rounded px-2 py-1">
                  <option value="small">Small</option>
                  <option value="large">Large</option>
                </select>
              )}
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" checked={addOns.screenPrint}
                onChange={e => setAddOns({ ...addOns, screenPrint: e.target.checked })}
                className="w-4 h-4 accent-red-600" />
              <div className="flex-1 text-sm">
                <div className="font-medium">Screen Print</div>
                <div className="text-gray-400">+£1.50/colour/unit</div>
              </div>
              {addOns.screenPrint && (
                <input type="number" min="1" max="6" value={addOns.screenPrintColors}
                  onChange={e => setAddOns({ ...addOns, screenPrintColors: parseInt(e.target.value) || 1 })}
                  className="w-14 text-sm border rounded px-2 py-1" />
              )}
            </label>

            <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="checkbox" checked={addOns.dtgPrint}
                onChange={e => setAddOns({ ...addOns, dtgPrint: e.target.checked })}
                className="w-4 h-4 accent-red-600" />
              <div className="flex-1 text-sm">
                <div className="font-medium">DTG Print</div>
                <div className="text-gray-400">+£3.50/unit</div>
              </div>
            </label>
          </div>
        </div>

        {/* Price summary */}
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm text-gray-500">Per unit</span>
            <span className="text-xl font-bold text-gray-900">£{unitPrice.toFixed(2)}</span>
          </div>
          {savings > 0 && (
            <div className="text-xs text-green-600 mb-3">
              You save £{savings.toFixed(2)} vs minimum order pricing
            </div>
          )}
          <div className="flex justify-between items-baseline pt-3 border-t border-gray-200">
            <span className="font-medium text-gray-700">Total estimate</span>
            <span className="text-3xl font-bold text-red-600">
              £{totalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Excludes shipping, customs, and packaging</p>
        </div>
      </div>

      {/* RIGHT — Quote form */}
      <div className="bg-white">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-900">Request this quote</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {quantity.toLocaleString()} × {productType === 'tshirt' ? 'T-Shirts' : 'Hoodies'} · £{unitPrice.toFixed(2)}/unit · <span className="font-semibold text-red-600">£{totalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} est.</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" required value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
              <input type="text" value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>

          {/* Size breakdown */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Size breakdown <span className="text-gray-400 font-normal">(optional)</span></label>
            <div className="grid grid-cols-7 gap-1.5">
              {SIZES.map(size => (
                <div key={size} className="text-center">
                  <label className="text-[10px] text-gray-500 block mb-1">{size}</label>
                  <input type="number" min="0" value={formData.sizes[size] || ''}
                    onChange={e => setFormData(prev => ({ ...prev, sizes: { ...prev.sizes, [size]: parseInt(e.target.value) || 0 } }))}
                    className="w-full px-1 py-1.5 border rounded text-center text-xs" placeholder="0" />
                </div>
              ))}
            </div>
          </div>

          {/* Garment colours */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Garment colours</label>
            <div className="flex flex-wrap gap-1.5">
              {COLORS.map(color => (
                <button key={color.name} type="button" onClick={() => toggleColor(color.name)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs transition-all ${
                    formData.colors.includes(color.name) ? 'border-red-500 bg-red-50 ring-1 ring-red-300' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  {color.hex && <span className="w-3 h-3 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: color.hex }} />}
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* File upload */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Design files <span className="text-gray-400 font-normal">(PNG, JPG, PDF, AI, PSD)</span></label>
            <div onDragOver={e => e.preventDefault()} onDrop={handleFileDrop}
              className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-red-400 transition-colors cursor-pointer">
              <FolderOpen className="w-6 h-6 text-gray-400 mx-auto mb-1.5" />
              <p className="text-xs text-gray-500 mb-2">Drag & drop or</p>
              <label className="inline-block bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-200 transition-colors text-xs font-medium">
                Browse
                <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.ai,.psd" onChange={handleFileSelect} className="hidden" />
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate max-w-[160px]">{file.name}</span>
                      <span className="text-gray-400">{(file.size / 1024 / 1024).toFixed(1)}MB</span>
                    </div>
                    <button type="button" onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 font-medium">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Additional details</label>
            <textarea rows={3} value={formData.details}
              onChange={e => setFormData({ ...formData, details: e.target.value })}
              placeholder="Deadline, fabric preferences, special instructions..."
              className="w-full px-3 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none" />
          </div>

          <button type="submit" disabled={submitting}
            className="w-full bg-red-600 text-white py-3.5 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors shadow-md shadow-red-600/20">
            {submitting ? 'Submitting...' : `Submit Quote — £${totalPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </button>
        </form>
      </div>
    </div>
  );
}
