import React from "react";
import Navbar from "../components/Navbar";
import PageTransition from "../components/PageTransition";

// dummy faqs
const FAQ_DATA = [
  {
    q: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, temporibus.",
    a: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, porro eligendi dolor sint atque hic neque ex minus, amet quaerat quo earum eius vero? Nemo minima culpa inventore placeat dolore.",
  },
  {
    q: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, temporibus.",
    a: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, porro eligendi dolor sint atque hic neque ex minus, amet quaerat quo earum eius vero? Nemo minima culpa inventore placeat dolore.",
  },
  {
    q: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, temporibus.",
    a: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, porro eligendi dolor sint atque hic neque ex minus, amet quaerat quo earum eius vero? Nemo minima culpa inventore placeat dolore.",
  },
];

const FAQs = () => {
  return (
    <div className="min-h-screen pt-32 px-4 md:px-8 flex flex-col items-center pb-20">
      <Navbar />
      <PageTransition>
        <div className="w-full max-w-3xl">
          <h1 className="whitespace-nowrap text-3xl w-max mx-auto md:text-4xl font-bold text-center mb-3 bg-linear-to-r from-white from-30% to-indigo-500 bg-clip-text text-transparent">
            Security FAQs
          </h1>
          <p className="text-center text-gray-400 mb-10">
            Everything you need to know about how we protect your data.
          </p>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors"
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
