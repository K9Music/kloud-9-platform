import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="bg-slate-800 rounded-2xl p-8 text-cyan-100">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="mb-6">
                By accessing and using Kloud 9, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p className="mb-6">
                Kloud 9 is a platform that connects creative professionals with clients seeking creative services. 
                We facilitate connections but are not responsible for the quality of work or disputes between parties.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
              <p className="mb-6">
                Users are responsible for providing accurate information, maintaining the security of their accounts, 
                and complying with all applicable laws and regulations.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">4. Privacy and Data</h2>
              <p className="mb-6">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property</h2>
              <p className="mb-6">
                The Service and its original content, features, and functionality are and will remain the exclusive property 
                of Kloud 9 and its licensors.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">6. Termination</h2>
              <p className="mb-6">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice 
                or liability, under our sole discretion, for any reason whatsoever.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
              <p className="mb-6">
                In no event shall Kloud 9, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to Terms</h2>
              <p className="mb-6">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Information</h2>
              <p className="mb-6">
                If you have any questions about these Terms of Service, please contact us at kloud9@k9music.com
              </p>

              <p className="text-sm text-cyan-300 mt-8">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 