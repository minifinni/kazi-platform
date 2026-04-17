import Link from 'next/link';
import { Check } from 'lucide-react';

export default function ScreenPrintingPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Screen Printing</h1>
          <p className="text-xl opacity-90">The classic choice for bold, vibrant designs</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Traditional Screen Printing</h2>
            <p className="text-gray-600 mb-4">
              Screen printing pushes ink through mesh screens to create vibrant, long-lasting prints. 
              The most cost-effective method for bulk orders and bold designs with limited colors.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Most cost-effective for bulk</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Vibrant, opaque colors</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Works on all fabric types</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Soft hand feel available</li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>Screen Printing Press</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-4">Best For</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>• Bulk orders (50+ units)</div>
            <div>• Bold graphics with 1-6 colors</div>
            <div>• Event merchandise</div>
            <div>• Team uniforms</div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/quote"
            className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
          >
            Get a Screen Print Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
