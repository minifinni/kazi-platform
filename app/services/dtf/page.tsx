import Link from 'next/link';
import { Check } from 'lucide-react';

export default function DTFPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">DTF Transfers</h1>
          <p className="text-xl opacity-90">Direct-to-film for vibrant colors on any fabric</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Direct-to-Film Printing</h2>
            <p className="text-gray-600 mb-4">
              DTF prints your design onto a special film, which is then heat-transferred to fabric. 
              Combines the detail of DTG with the versatility to work on any material.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Works on any fabric type</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Vibrant, wash-resistant prints</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> No pre-treatment needed</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Great for polyester and blends</li>
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">🔥</div>
              <p>DTF Transfer Press</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h3 className="text-xl font-bold mb-4">Best For</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>• Polyester and performance fabrics</div>
            <div>• Detailed multi-color designs</div>
            <div>• Small to medium runs</div>
            <div>• Hard-to-print materials</div>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/quote"
            className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
          >
            Get a DTF Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
