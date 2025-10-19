import {
  Flower2,
  Sparkles,
  Lamp,
  Utensils,
  Tent,
  Waves,
  Calendar,
} from "lucide-react";
import ganeshaIcon from "../images/ganesha.avif";

export default function ServicesLine() {
  return (
    <div className="text-center my-10">
      {/* 🎉 Festive Gradient Heading */}
      <h2 className="text-xl sm:text-2xl font-extrabold mb-1 tracking-wide font-[cursive] bg-gradient-to-r from-blue-700 via-indigo-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text">
        {"Ganesh Chaturthi "}
        <img src={ganeshaIcon} alt="Ganesha" className="inline-block w-14 h-13 rounded-full object-contain" />
        {" One-Stop Services"}
      </h2>

      {/* 🌸 Services Line */}
      <div className="flex flex-wrap justify-center gap-5 text-gray-700 text-md font-medium font-[cursive]">
        <span className="flex items-center gap-2">
          <Flower2 className="w-5 h-5 text-pink-500" /> Idols
        </span>
        <span className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" /> Decorations
        </span>
        <span className="flex items-center gap-2">
          <Lamp className="w-5 h-5 text-orange-500" /> Pooja
        </span>
        <span className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-green-500" /> Catering
        </span>
        <span className="flex items-center gap-2">
          <Tent className="w-5 h-5 text-blue-500" /> Tent-House
        </span>
        <span className="flex items-center gap-2">
          <Waves className="w-5 h-5 text-cyan-500" /> Immersion
        </span>
        <span className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-500" /> Event Management
        </span>
      </div>
    </div>
  );
}