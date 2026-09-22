import SimpleNavbar from "../components/SimpleNavbar";
import Footer from "../components/Footer";
import { Twitter, Linkedin, Instagram } from "lucide-react";

function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SimpleNavbar />

      {/* Grey background middle section */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center px-4">
        {/* White card with content centered */}
        <div className="bg-gray-100 p-6 max-w-3xl w-full space-y-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Contact Us</h1>
          <p className="text-gray-700">
            Have questions or feedback? We’d love to hear from you. 
            Our team is here to help with subscription management, 
            technical issues, and account inquiries.
          </p>

          {/* General Contact Info */}
          <ul className="space-y-2 text-gray-700">
            <li>
              📧 Email:{" "}
              <a
                href="mailto:support@duenest.com"
                className="text-blue-600 underline"
              >
                support@duenest.com
              </a>
            </li>
            <li>📞 Phone: +1 (555) 123-4567</li>
            <li>🏢 Address: 123 Subscriptions Ave, Suite 100, Houston, TX</li>
          </ul>

          {/* Department-specific contacts */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Department Contacts
            </h2>
            <ul className="space-y-1 text-gray-700">
              <li>🔧 Technical Support: techsupport@duenest.com</li>
              <li>💳 Billing Inquiries: billing@duenest.com</li>
              <li>🤝 Partnerships: partners@duenest.com</li>
            </ul>
          </div>

          {/* Business hours */}
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Business Hours
            </h2>
            <p className="text-gray-700">
              Monday – Friday: 9:00 AM – 6:00 PM (CST) <br />
              Saturday – Sunday: Closed
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Response times may vary during weekends and holidays.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
              Connect With Us
            </h2>
            <div className="flex gap-6 text-blue-600">
              <a
                href="https://twitter.com/duenest"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800"
              >
                <Twitter size={28} />
              </a>
              <a
                href="https://linkedin.com/company/duenest"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="https://instagram.com/duenest"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800"
              >
                <Instagram size={28} />
              </a>
            </div>
          </div>
          <p className="text-gray-600 text-sm">
            We aim to respond to all inquiries within 24–48 hours. 
            Thank you for trusting DueNest to manage your subscriptions.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
