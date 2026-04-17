import Navbar from '@/components/Navbar';
import PricingQuoteSection from '@/components/PricingQuoteSection';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Get a Quote</h1>
          <p className="text-xl opacity-90">Configure your order and request a quote in one step</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <PricingQuoteSection />
        </div>
      </section>

      {/* Volume pricing reference */}
      <section className="py-12 px-4 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Volume pricing reference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-xl overflow-hidden bg-white">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="font-bold">T-Shirts</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="px-6 py-3 text-left font-medium">Quantity</th>
                    <th className="px-6 py-3 text-right font-medium">Per unit</th>
                  </tr>
                </thead>
                <tbody>
                  {[['50–99', '£8.50'], ['100–249', '£6.50'], ['250–499', '£5.00'], ['500–999', '£4.00'], ['1000+', '£3.20']].map(([qty, price]) => (
                    <tr key={qty} className="border-b last:border-0">
                      <td className="px-6 py-3">{qty}</td>
                      <td className="px-6 py-3 text-right font-medium">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border rounded-xl overflow-hidden bg-white">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h3 className="font-bold">Hoodies</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="px-6 py-3 text-left font-medium">Quantity</th>
                    <th className="px-6 py-3 text-right font-medium">Per unit</th>
                  </tr>
                </thead>
                <tbody>
                  {[['50–99', '£18.00'], ['100–249', '£14.50'], ['250–499', '£12.00'], ['500–999', '£10.00'], ['1000+', '£8.50']].map(([qty, price]) => (
                    <tr key={qty} className="border-b last:border-0">
                      <td className="px-6 py-3">{qty}</td>
                      <td className="px-6 py-3 text-right font-medium">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[['Embroidery (small)', '+£2.50'], ['Embroidery (large)', '+£4.00'], ['Screen print /colour', '+£1.50'], ['DTG print', '+£3.50']].map(([label, price]) => (
              <div key={label} className="border rounded-lg px-4 py-3 bg-white text-sm">
                <div className="text-gray-600">{label}</div>
                <div className="font-semibold mt-0.5">{price}/unit</div>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Prices are estimates and exclude shipping, customs, and custom packaging. Final quotes may vary.
          </p>
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
