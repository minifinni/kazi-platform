import Link from 'next/link';
import { Check } from 'lucide-react';

export default function DTGPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">DTG Printing</h1>
          <p className="text-xl opacity-90">Direct-to-garment printing for detailed designs</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">What is DTG?</h2>
            <p className="text-gray-600 mb-4">
              Direct-to-garment (DTG) printing uses specialized inkjet technology to print 
              directly onto fabric. Perfect for complex, multi-color designs and photographic prints.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Unlimited colors</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Photo-quality prints</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> No setup costs</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Soft hand feel</li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>DTG Printer</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-4">Best For</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>• Complex designs with many colors</div>
            <div>• Photographic prints</div>
            <div>• Small batch orders</div>
            <div>• Cotton and cotton-blend fabrics</div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/quote"
            className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
          >
            Get a DTG Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
