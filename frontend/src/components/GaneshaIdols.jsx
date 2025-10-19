// GaneshaIdols.jsx
import { motion } from "framer-motion";

// Replace this with your actual ganesha.avif or .svg image if needed
const GaneshaIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-10 h-10 text-orange-700"
    fill="currentColor"
  >
    <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M32 20c-6 0-10 4-10 9s4 9 10 9 10-4 10-9-4-9-10-9z" />
    <path d="M22 40c0 5 4 9 10 9s10-4 10-9" />
  </svg>
);

export default function GaneshaIdols() {
  const ideas = [
    {
      title: "AI-Generated Designs",
      desc: "Use generative AI (Stable Diffusion, MidJourney) to create new Vinayaka idol styles."
    },
    {
      title: "3D Modeling & Customization",
      desc: "AI-driven CAD tools let customers personalize idol size, ornaments, posture, and eco-materials."
    },
    {
      title: "Style Transfer",
      desc: "Blend traditional art (Chola bronze) with modern styles using neural style transfer."
    },
    {
      title: "Eco-Friendly Focus",
      desc: "AI simulations recommend eco-materials like clay, paper, or natural colors for idol making."
    },
    {
      title: "AR/VR Previews",
      desc: "Customers preview idols in AR before ordering, tailored for homes or pandals."
    },
    {
      title: "Trend Analysis",
      desc: "AI analyzes social media and sales data to predict popular idol styles for Ganesh Chaturthi."
    },
  ];

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2">
      {ideas.map((idea, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-5 flex items-start gap-4 hover:shadow-xl transition"
        >
          <GaneshaIcon />
          <div>
            <h2 className="text-lg font-bold text-orange-800 mb-1">{idea.title}</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{idea.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
