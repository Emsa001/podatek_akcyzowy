import { useState } from "preact/hooks";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleEmailChange = (e) => {
    console.log("asd");
    setEmail(e.target.value);
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send email using server-side implementation
    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Email sent successfully
        alert("Email sent!");
        setEmail("");
        setTermsAccepted(false);
      } else {
        // Handle error if email sending fails
        alert("Failed to send email. Please try again later.");
      }
    } catch (error) {
      // Handle network or other errors
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md mt-16">
      <h2 className="text-2xl font-bold mb-4">Send Me an Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email Address
          </label>
          <input type="email" id="email" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500" placeholder="Enter your email address" value={email} onChange={handleEmailChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="terms" className="inline-flex items-center">
            <input type="checkbox" id="terms" className="form-checkbox mr-2" checked={termsAccepted} onChange={handleTermsChange} required />
            <span className="text-gray-700">
              I accept the{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                terms and conditions
              </a>
            </span>
          </label>
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300" disabled={!termsAccepted}>
          Send Email
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
