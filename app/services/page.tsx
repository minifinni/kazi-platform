import Navbar from '@/components/Navbar';
import { Check } from 'lucide-react';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90">Full-service garment manufacturing from Kathmandu, Nepal</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* T-Shirts */}
            <div className="border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">T-Shirts & Basics</h2>
              <p className="text-gray-600 mb-4">
                We manufacture high-quality t-shirts in various weights (140gsm to 220gsm) and fabric 
                blends including 100% cotton, cotton-polyester mixes, and organic options.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Custom cuts and fits</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Multiple fabric options</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Tags and labels</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Custom packaging</li>
              </ul>
            </div>

            {/* Hoodies */}
            <div className="border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Hoodies & Outerwear</h2>
              <p className="text-gray-600 mb-4">
                Premium hoodies, crewnecks, and zip-ups in various weights. Fully customisable 
                with kangaroo pockets, drawstrings, ribbed cuffs and more.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Pullover and zip styles</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Fleece-lined options</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Custom drawstrings</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Embroidery ready</li>
              </ul>
            </div>

            {/* Embroidery */}
            <div className="border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Embroidery</h2>
              <p className="text-gray-600 mb-4">
                Professional embroidery for logos, badges, and decorative elements. We can 
                embroider on almost any garment including caps, beanies, and outerwear.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> 3D puff embroidery</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Flat embroidery</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Appliqué</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Small and large designs</li>
              </ul>
            </div>

            {/* Printing */}
            <div className="border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Screen & DTG Printing</h2>
              <p className="text-gray-600 mb-4">
                Both screen printing (best for bulk orders) and Direct-to-Garment printing 
                (best for complex designs and smaller runs).
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Up to 6 colour screen print</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Full colour DTG</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Discharge printing</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-red-600" /> Water-based inks</li>
              </ul>
            </div>
          </div>

          {/* Private Label */}
          <div className="mt-12 border rounded-xl p-8 bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Private Label Service</h2>
            <p className="text-gray-600 mb-6">
              We offer complete private label solutions. Your brand, our manufacturing expertise.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold mb-2">Custom Tags</h3>
                <p className="text-sm text-gray-600">Woven labels, printed tags, size labels</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Packaging</h3>
                <p className="text-sm text-gray-600">Poly bags, boxes, tissue paper, stickers</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">HANG TAGS</h3>
                <p className="text-sm text-gray-600">Custom designed and printed hang tags</p>
              </div>
            </div>
          </div>
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
