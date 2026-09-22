import SimpleNavbar from "../components/SimpleNavbar";
import Footer from "../components/Footer";

function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SimpleNavbar />

      {/* Grey middle background */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-gray-100 p-6 max-w-3xl w-full space-y-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Privacy Policy</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            At DueNest, we value your privacy. This policy explains how we collect,
            use, and protect your data.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect information you provide such as name, email, and subscription
            details to deliver our services effectively.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">How We Use Your Data</h2>
          <p className="text-gray-700 mb-4">
            We use your data only for subscription management, reminders, and
            improving our services. We never sell your data to third parties.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Your Rights</h2>
          <p className="text-gray-700 mb-4">
            You can request access, updates, or deletion of your personal data by
            contacting us at{" "}
            <a
              href="mailto:privacy@duenest.com"
              className="text-blue-600 underline"
            >
              privacy@duenest.com
            </a>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Privacy;
