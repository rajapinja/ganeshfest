// GaneshaExpenditure.jsx
import { motion } from "framer-motion";

export default function GaneshaExpenditure() {
  const expenditureData = [
    {
      section: "Total Expenditure Across India",
      content: [
        { title: "Idols", value: "₹500+ crore" },
        { title: "Pandal setups", value: "₹10,000+ crore" },
        { title: "Sweets & Catering", value: "₹5,000+ crore" },
        { title: "Retail & Merchandise", value: "₹3,000+ crore" },
        { title: "Event Management", value: "₹5,000+ crore" },
        { title: "Local Spending", value: "₹10,000+ crore" },
        { title: "Tourism", value: "₹2,000+ crore" },
      ],
      note: "Projections for 2025: ~₹45,000 crore ($5.4B), nearly doubling from ₹25,000 crore ($3B) in 2024."
    },
    {
      section: "Expenditure in South India",
      content: [
        { title: "Karnataka Pandals", value: "5 lakh+" },
        { title: "AP Pandals", value: "2 lakh+" },
        { title: "Telangana Pandals", value: "2 lakh+" },
        { title: "Major Cities", value: "Hyderabad & Bengaluru contribute hundreds of crores" },
      ],
      note: "Exact financial totals not published, but the festival is a key economic driver in South India."
    },
    {
      section: "Expenditure Across the Globe",
      content: [
        { title: "Imports & Exports", value: "₹500 crore annually" },
        { title: "E-commerce", value: "High sales of idols & decor during festival" },
        { title: "Local Celebrations", value: "Community events abroad add untracked spending" },
      ],
      note: "Global financial estimates aren’t tracked, but diaspora celebrations fuel export markets."
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-orange-800">
        Ganesh Chaturthi Expenditure Overview 2025
      </h1>

      {expenditureData.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-orange-700 mb-4">
            {section.section}
          </h2>

          <ul className="space-y-2">
            {section.content.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between border-b border-gray-200 pb-2"
              >
                <span className="font-medium text-gray-800">{item.title}</span>
                <span className="text-gray-600">{item.value}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm text-gray-700 italic">{section.note}</p>
        </motion.div>
      ))}
    </div>
  );
}
