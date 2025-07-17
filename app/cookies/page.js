import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>
          
          <div className="bg-slate-800 rounded-2xl p-8 text-cyan-100">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
              <p className="mb-6">
                Cookies are small text files that are placed on your device when you visit our website. 
                They help us provide you with a better experience and understand how you use our site.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
              <p className="mb-6">
                We use cookies to remember your preferences, analyze site traffic, and personalize content. 
                This helps us improve our service and provide you with relevant information.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                <p className="mb-4">These cookies are necessary for the website to function properly and cannot be disabled.</p>
                
                <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                <p className="mb-4">These cookies help us understand how visitors interact with our website.</p>
                
                <h3 className="text-lg font-semibold text-white mb-2">Preference Cookies</h3>
                <p className="mb-4">These cookies remember your choices and preferences to enhance your experience.</p>
              </div>

              <h2 className="text-2xl font-semibold text-white mb-4">4. Managing Cookies</h2>
              <p className="mb-6">
                You can control and manage cookies through your browser settings. However, disabling certain cookies 
                may affect the functionality of our website.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Cookies</h2>
              <p className="mb-6">
                Some cookies may be set by third-party services we use, such as analytics providers. 
                These services have their own privacy policies.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">6. Updates to This Policy</h2>
              <p className="mb-6">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page 
                with an updated revision date.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about our use of cookies, please contact us at privacy@kloud9.com
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