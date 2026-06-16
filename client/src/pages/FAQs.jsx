import React from "react";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";

const FAQ_DATA = [
  {
    q: "Can anyone with the database access see my saved passwords?",
    a: "Absolutely not. We utilize a strict Zero-Knowledge architecture. Your data is encrypted directly on your device before it is ever sent to our database. We never receive, store, or transmit your Master Password, meaning we only ever see unreadable mathematical ciphertext.",
  },
  {
    q: "What happens if I forget my Master Password?",
    a: "If you lose your Master Password, your data is permanently lost. Because we do not store your password or your decryption keys, we have absolutely no way to reset your account or recover your vault. Your Master Password is the sole key to your data — please keep it safe.",
  },
  {
    q: "How strong is the encryption protecting my vault?",
    a: "Your vault is secured using AES (Advanced Encryption Standard) in CBC mode, which is the same cryptographic standard utilized by governments and military organizations worldwide to protect top-secret data.",
  },
  {
    q: "How do you protect against hackers trying to guess my password?",
    a: "We rely on a combination of extreme mathematical complexity (entropy) and cryptographic key derivation. First, your Master Password is required to be at least 12 characters long, containing a mix of casing, numbers, and symbols. Second, we pass that complex password through 100,000 iterations of the PBKDF2 key derivation function. Even if an attacker used massive clusters of supercomputers, the strict length and complexity of your password makes it computationally impossible to brute-force your key in any reasonable timeframe.",
  },
  {
    q: "Why do I have to re-enter my Master Password if I leave the page?",
    a: "For your security, your decryption key only lives in your browser's temporary memory (RAM). The moment your session expires, or your local memory is cleared, the key is instantly destroyed. This ensures that if you walk away from your computer, no one else can extract your passwords.",
  },
  {
    q: "Is my vault completely hack-proof?",
    a: "While our Zero-Knowledge encryption pipeline is mathematically hack-proof, there is one vulnerability no web application can control: Device Compromise. Because encryption happens directly in your browser's memory, if your physical computer is infected with a virus, a malicious browser extension, or a keylogger, that malware could steal your Master Password as you type it. Always ensure your personal devices are secure and free of malware.",
  },
];

const FAQs = () => {
  return (
    <div className="min-h-screen pt-32 px-4 md:px-8 flex flex-col items-center pb-20">
      <Navbar />
      <PageTransition>
        <div className="w-full max-w-3xl">
          <h1 className="whitespace-nowrap text-3xl w-max mx-auto md:text-4xl font-bold text-center mb-3 text-white">
            Security FAQs
          </h1>
          <p className="text-center text-gray-400 mb-10">
            Everything you need to know about how we protect your data
          </p>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors duration-300"
              >
                <h3 className="text-lg font-bold text-indigo-300 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default FAQs;
