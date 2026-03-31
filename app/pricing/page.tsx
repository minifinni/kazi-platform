import Navbar from '@/components/Navbar';
import PricingCalculator from '@/components/PricingCalculator';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Pricing</h1>
          <p className="text-xl opacity-90">Transparent pricing. Volume discounts. Get an instant estimate.</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Price Calculator</h2>
              <PricingCalculator />
            </div>

            {/* Pricing Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Volume Pricing</h2>
              
              <div className="space-y-6">
                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <h3 className="font-bold">T-Shirts</h3>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-600 border-b">
                        <th className="px-6 py-3 text-left">Quantity</th>
                        <th className="px-6 py-3 text-right">Price/Unit</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="px-6 py-3">50-99</td>
                        <td className="px-6 py-3 text-right font-medium">£8.50</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3">100-249</td>
                        <td className="px-6 py-3 text-right font-medium">£6.50</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3">250-499</td>
                        <td className="px-6 py-3 text-right font-medium">£5.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3">500-999</td>
                        <td className="px-6 py-3 text-right font-medium">£4.00</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3">1000+</td>
                        <td className="px-6 py-3 text-right font-medium">£3.20</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <h3 className="font-bold">Hoodies</h3>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-600 border-b">
                        <th className="px-6 py-3 text-left">Quantity</th>
                        <th className="px-6 py-3 text-right">Price/Unit</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="px-6 py-3">50-99</td>
                        <td className="px-6 py-3 text-right font-medium">£18.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3">100-249</td>
                        <td className="px-6 py-3 text-right font-medium">£14.50</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3">250-499</td>
                        <td className="px-6 py-3 text-right font-medium">£12.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3">500-999</td>
                        <td className="px-6 py-3 text-right font-medium">£10.00</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3">1000+</td>
                        <td className="px-6 py-3 text-right font-medium">£8.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <h3 className="font-bold">Add-ons</h3>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-600 border-b">
                        <th className="px-6 py-3 text-left">Service</th>
                        <th className="px-6 py-3 text-right">Price/Unit</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b">
                        <td className="px-6 py-3">Embroidery (small)</td>
                        <td className="px-6 py-3 text-right font-medium">+£2.50</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3">Embroidery (large)</td>
                        <td className="px-6 py-3 text-right font-medium">+£4.00</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-6 py-3">Screen print (per colour)</td>
                        <td className="px-6 py-3 text-right font-medium">+£1.50</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3">DTG print</td>
                        <td className="px-6 py-3 text-right font-medium">+£3.50</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-blue-900 mb-2">Note</h4>
                  <p className="text-sm text-blue-800">
                    Prices are estimates and exclude shipping, customs, and any custom packaging. 
                    Final quotes may vary based on specific requirements and fabric choices.
                  </p>
                </div>
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
