import SimpleNavbar from "../components/SimpleNavbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SimpleNavbar />

      {/* Grey middle background */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-gray-100 p-6 max-w-3xl w-full space-y-4">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">About DueNest</h1>

          <p className="text-gray-700 leading-relaxed">
            DueNest is your personal and family subscription tracker designed to
            simplify the way you manage recurring payments. From streaming
            services to productivity tools, DueNest keeps everything in one place
            so you never miss a due date again.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We believe subscription management should be effortless. Our mission
            is to eliminate the stress of forgotten bills by providing timely
            reminders, clear insights, and easy sharing with your family members.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>📅 Smart reminders before payments are due</li>
            <li>👨‍👩‍👧 Family account sharing for collective management</li>
            <li>📊 Clear dashboards to track all active subscriptions</li>
            <li>🎨 Custom categories and notes for better organization</li>
            <li>🔔 In-app notifications for payment due soon & overdue alerts</li>
          </ul>

          <h2 className="text-xl font-semibold text-blue-600">Why Choose DueNest?</h2>
          <p className="text-gray-700 leading-relaxed">
            Unlike manual tracking methods or scattered reminders, DueNest
            centralizes your subscriptions in a secure, easy-to-use platform. We
            built this tool with students, families, and busy professionals in
            mind—anyone who wants peace of mind knowing their finances are under
            control.
          </p>

          <h2 className="text-xl font-semibold text-blue-600">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            Looking ahead, DueNest aims to integrate with popular payment
            platforms and banks, so you can automatically import subscription
            data and receive personalized financial insights. Our goal is to
            become the go-to platform for managing digital life expenses.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
