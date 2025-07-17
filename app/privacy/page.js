import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="bg-slate-800 rounded-2xl p-8 text-cyan-100">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-6">
                We collect information you provide directly to us, such as when you create an account, 
                submit a profile, or contact us. This may include your name, email address, and other contact information.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-6">
                We use the information we collect to provide, maintain, and improve our services, 
                communicate with you, and ensure the security of our platform.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
              <p className="mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="mb-6">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies and Tracking</h2>
              <p className="mb-6">
                We use cookies and similar technologies to enhance your experience on our platform. 
                You can control cookie settings through your browser preferences.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="mb-6">
                You have the right to access, update, or delete your personal information. 
                You may also opt out of certain communications from us.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">7. Children's Privacy</h2>
              <p className="mb-6">
                Our service is not intended for children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to This Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy, please contact us at privacy@kloud9.com
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