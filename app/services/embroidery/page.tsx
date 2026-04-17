import Link from 'next/link';
import { Check } from 'lucide-react';

export default function EmbroideryPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Embroidery</h1>
          <p className="text-xl opacity-90">Premium stitched designs for a professional finish</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Professional Embroidery</h2>
            <p className="text-gray-600 mb-4">
              Our multi-head Tajima embroidery machines create durable, premium stitched designs 
              that last the lifetime of the garment. Perfect for logos, monograms, and detailed artwork.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Multi-head production</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Up to 15 thread colors</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> 3D puff embroidery available</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Lasts garment lifetime</li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>Embroidery Machine</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-4">Best For</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>• Corporate logos</div>
            <div>• Premium apparel</div>
            <div>• Uniforms and workwear</div>
            <div>• Caps and accessories</div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/quote"
            className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
          >
            Get an Embroidery Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
