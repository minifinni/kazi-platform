'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Check, FolderOpen, FileText, Shirt, MoveLeft, Armchair, Tag, ChevronDown } from 'lucide-react';

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
const PRINT_PLACEMENTS = [
  { id: 'front_chest', label: 'Front Chest', icon: Shirt },
  { id: 'front_large', label: 'Front Large', icon: Shirt },
  { id: 'back', label: 'Back', icon: MoveLeft },
  { id: 'left_sleeve', label: 'Left Sleeve', icon: Armchair },
  { id: 'right_sleeve', label: 'Right Sleeve', icon: Armchair },
  { id: 'neck_label', label: 'Neck Label', icon: Tag },
];

export default function QuoteFormAdvanced() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '',
    productType: 'tshirt', quantity: 50,
    sizes: {} as Record<string, number>,
    colors: [] as string[],
    placements: [] as string[],
    details: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const supabase = createClient();

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
  };

  const toggleColor = (name: string) =>
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(name) ? prev.colors.filter(c => c !== name) : [...prev.colors, name],
    }));

  const togglePlacement = (id: string) =>
    setFormData(prev => ({
      ...prev,
      placements: prev.placements.includes(id) ? prev.placements.filter(p => p !== id) : [...prev.placements, id],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const totalFromSizes = Object.values(formData.sizes).reduce((a, b) => a + b, 0);
      const finalQuantity = totalFromSizes > 0 ? totalFromSizes : formData.quantity;

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
          product_type: formData.productType,
          quantity: finalQuantity,
          size_breakdown: formData.sizes,
          colors: formData.colors,
          print_placement: formData.placements,
          details: formData.details,
          status: 'pending',
        })
        .select('id').single();
      if (quoteError) throw quoteError;

      if (files.length > 0) {
        for (const file of files) {
          const ext = file.name.split('.').pop();
          const path = `${quote.id}/${Date.now()}-${Math.random().toString(36).slice(7)}.${ext}`;
          await supabase.storage.from('design-files').upload(path, file);
        }
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
      <div className="border rounded-xl p-8 text-center bg-green-50 border-green-200">
        <Check className="w-12 h-12 text-green-500 mx-auto mb-4" strokeWidth={3} />
        <h3 className="text-xl font-bold mb-2">Quote submitted!</h3>
        <p className="text-gray-600">We'll review your details and get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <div id="quote" className="border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div>
          <h3 className="text-lg font-bold text-gray-900">Get a Detailed Quote</h3>
          <p className="text-sm text-gray-500 mt-0.5">Specify product details and upload your design files</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="p-6 space-y-6 border-t">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
          )}

          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>

          {/* Product */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type *</label>
              <select required value={formData.productType} onChange={e => setFormData({ ...formData, productType: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                <option value="tshirt">T-Shirts</option>
                <option value="hoodie">Hoodies</option>
                <option value="sweatshirt">Sweatshirts</option>
                <option value="tank">Tank Tops</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity *</label>
              <input type="number" min="50" required value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              <p className="text-xs text-gray-500 mt-1">Minimum order: 50 units</p>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size Breakdown (optional)</label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
              {SIZES.map(size => (
                <div key={size} className="text-center">
                  <label className="text-xs text-gray-600 block mb-1">{size}</label>
                  <input type="number" min="0" value={formData.sizes[size] || ''}
                    onChange={e => setFormData(prev => ({ ...prev, sizes: { ...prev.sizes, [size]: parseInt(e.target.value) || 0 } }))}
                    className="w-full px-2 py-2 border rounded text-center text-sm" placeholder="0" />
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Garment Colors</label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map(color => (
                <button key={color.name} type="button" onClick={() => toggleColor(color.name)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                    formData.colors.includes(color.name) ? 'border-red-500 bg-red-50 ring-2 ring-red-200' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  {color.hex && <span className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: color.hex }} />}
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Print placement */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Print Placement</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PRINT_PLACEMENTS.map(p => (
                <button key={p.id} type="button" onClick={() => togglePlacement(p.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                    formData.placements.includes(p.id) ? 'border-red-500 bg-red-50 ring-2 ring-red-200' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                  <p.icon className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* File upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Design Files <span className="text-gray-400 font-normal">(PNG, JPG, PDF, AI, PSD)</span>
            </label>
            <div onDragOver={e => e.preventDefault()} onDrop={handleFileDrop}
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-400 transition-colors">
              <FolderOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm mb-3">Drag & drop or</p>
              <label className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors text-sm">
                Browse Files
                <input type="file" multiple accept=".png,.jpg,.jpeg,.pdf,.ai,.psd" onChange={handleFileSelect} className="hidden" />
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span>{file.name}</span>
                      <span className="text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <button type="button" onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))} className="text-red-500 hover:text-red-700">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
            <textarea rows={4} value={formData.details} onChange={e => setFormData({ ...formData, details: e.target.value })}
              placeholder="Special instructions, deadline, fabric preferences, etc."
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none" />
          </div>

          <button type="submit" disabled={submitting}
            className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 disabled:opacity-50 transition-colors shadow-lg shadow-red-600/30">
            {submitting ? 'Submitting...' : 'Submit Quote Request'}
          </button>
        </form>
      )}
    </div>
  );
}
