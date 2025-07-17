import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Cinzel } from "next/font/google";
import { FaArrowLeft } from 'react-icons/fa';

const cinzel = Cinzel({ subsets: ["latin"], weight: ["700"] });

export default function PaymentsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <a href="/help-center" className="inline-flex items-center text-cyan-300 hover:text-cyan-100 mb-6 font-semibold">
            <FaArrowLeft className="mr-2" />
            Back to Help Center
          </a>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-4">Payments</h1>
            <p className="text-xl text-cyan-200 mb-4 italic">How payments work on Kloud 9</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-8 border border-cyan-900 text-cyan-100 text-lg space-y-6">
            <h2 className="text-2xl font-bold text-white mb-2">Payment Basics</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-semibold text-cyan-200">For Creators:</span> Get paid for completed projects. All payments are managed securely through Kloud 9.</li>
              <li><span className="font-semibold text-cyan-200">For Businesses:</span> Pay for projects easily and securely through the platform. Our team ensures transparency and peace of mind.</li>
              <li><span className="font-semibold text-cyan-200">Payment Methods & Fees:</span> For details on supported payment methods or fees, please <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">contact support</a>.</li>
            </ul>
            <p>For payment issues or questions, <a href="/contact" className="text-cyan-400 underline hover:text-cyan-200">Contact Us</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 