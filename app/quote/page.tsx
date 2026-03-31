'use client';

import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Check, FolderOpen, FileText, Shirt, MoveLeft, Armchair, Tag } from 'lucide-react';

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

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    productType: 'tshirt',
    quantity: 50,
    sizes: {} as Record<string, number>,
    colors: [] as string[],
    placements: [] as string[],
    details: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const supabase = createClient();

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSizeChange = (size: string, value: string) => {
    const num = parseInt(value) || 0;
    setFormData(prev => ({
      ...prev,
      sizes: { ...prev.sizes, [size]: num }
    }));
  };

  const toggleColor = (colorName: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter(c => c !== colorName)
        : [...prev.colors, colorName]
    }));
  };

  const togglePlacement = (placementId: string) => {
    setFormData(prev => ({
      ...prev,
      placements: prev.placements.includes(placementId)
        ? prev.placements.filter(p => p !== placementId)
        : [...prev.placements, placementId]
    }));
  };

  const uploadFiles = async (quoteId: string): Promise<string[]> => {
    if (files.length === 0) return [];
    
    const uploadedPaths: string[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${quoteId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('design-files')
        .upload(fileName, file);
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }
      
      uploadedPaths.push(fileName);
    }
    
    return uploadedPaths;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Calculate total from sizes
      const totalFromSizes = Object.values(formData.sizes).reduce((a, b) => a + b, 0);
      const finalQuantity = totalFromSizes > 0 ? totalFromSizes : formData.quantity;

      // Get or create customer
      let customerId = null;
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', formData.email)
        .single();

      if (existingProfile) {
        customerId = existingProfile.id;
      } else {
        const { data: newProfile, error: profileError } = await supabase
          .from('profiles')
          .insert({
            email: formData.email,
            full_name: formData.name,
            company_name: formData.company || null,
            phone: formData.phone || null,
            role: 'customer',
          })
          .select('id')
          .single();

        if (profileError) throw profileError;
        customerId = newProfile.id;
      }

      // Create the quote with customization
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
        .select('id')
        .single();

      if (quoteError) throw quoteError;

      // Upload files if any
      if (files.length > 0) {
        const uploadedPaths = await uploadFiles(quote.id);
        
        if (uploadedPaths.length > 0) {
          // Update quote with file references
          await supabase
            .from('quotes')
            .update({ design_files: uploadedPaths })
            .eq('id', quote.id);
          
          // Create quote_files records
          const fileRecords = uploadedPaths.map((path, idx) => ({
            quote_id: quote.id,
            file_name: files[idx]?.name || 'unnamed',
            file_path: path,
            file_size: files[idx]?.size,
            file_type: files[idx]?.type,
          }));
          
          await supabase.from('quote_files').insert(fileRecords);
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
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
          <div className="mb-6 flex justify-center">
            <Check className="w-16 h-16 text-green-500" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Your custom order has been received. We'll review your designs and get back to you within 24 hours.
          </p>
          <Link href="/" className="text-red-600 font-medium hover:underline">
            Return to homepage
          </Link>
        </div>
      </main>
    );
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={e => setFormData({...formData, company: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setStep(2)}
        className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors"
      >
        Continue to Product Details →
      </button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Type *</label>
          <select
            required
            value={formData.productType}
            onChange={e => setFormData({...formData, productType: e.target.value})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="tshirt">T-Shirts</option>
            <option value="hoodie">Hoodies</option>
            <option value="sweatshirt">Sweatshirts</option>
            <option value="tank">Tank Tops</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Quantity *</label>
          <input
            type="number"
            min="50"
            required
            value={formData.quantity}
            onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum order: 50 units</p>
        </div>
      </div>

      {/* Size Breakdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Size Breakdown (optional)</label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {SIZES.map(size => (
            <div key={size} className="text-center">
              <label className="text-xs text-gray-600 block mb-1">{size}</label>
              <input
                type="number"
                min="0"
                value={formData.sizes[size] || ''}
                onChange={e => handleSizeChange(size, e.target.value)}
                className="w-full px-2 py-2 border rounded text-center text-sm"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Garment Colors *</label>
        <div className="flex flex-wrap gap-3">
          {COLORS.map(color => (
            <button
              key={color.name}
              type="button"
              onClick={() => toggleColor(color.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                formData.colors.includes(color.name)
                  ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {color.hex && (
                <span
                  className="w-5 h-5 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                />
              )}
              <span className="text-sm">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Print Placement */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Print Placement *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PRINT_PLACEMENTS.map(placement => (
            <button
              key={placement.id}
              type="button"
              onClick={() => togglePlacement(placement.id)}
              className={`flex items-center gap-3 p-4 rounded-lg border text-left transition-all ${
                formData.placements.includes(placement.id)
                  ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <placement.icon className="w-6 h-6 text-gray-600" />
              <span className="font-medium">{placement.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={() => setStep(3)}
          className="flex-1 bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-colors"
        >
          Continue to Upload →
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Upload Design Files
          <span className="text-gray-500 font-normal ml-2">(PNG, JPG, PDF, AI, PSD - Max 20MB)</span>
        </label>
        
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={handleFileDrop}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 transition-colors"
        >
          <div className="mb-4 flex justify-center">
            <FolderOpen className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-2">Drag & drop files here</p>
          <p className="text-gray-400 text-sm mb-4">or</p>
          <label className="inline-block bg-gray-100 text-gray-700 px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
            Browse Files
            <input
              type="file"
              multiple
              accept=".png,.jpg,.jpeg,.pdf,.ai,.psd"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
        <textarea
          rows={4}
          value={formData.details}
          onChange={e => setFormData({...formData, details: e.target.value})}
          placeholder="Special instructions, deadline, fabric preferences, etc."
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 disabled:opacity-50 transition-colors shadow-lg shadow-red-600/30"
        >
          {submitting ? 'Submitting...' : files.length > 0 ? 'Submit Order with Files' : 'Submit Order'}
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Custom Order</h1>
          <p className="opacity-90">Upload your designs and customize your order</p>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 h-1 ${s < step ? 'bg-red-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </form>
        </div>
      </section>

      <footer className="py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>&copy; 2026 Kazi Manufacturing. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
