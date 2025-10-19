import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

const menu = [
  { label: "Home", to: "/" },
  {
    label: "Ganesh Idols",
    to: "/category/idols",
    children: [
      { label: "Clay", to: "/category/idols/clay" },
      { label: "Asbestos", to: "/category/idols/asbestos" },
    ],
  },
  {
    label: "Food Services",
    to: "/category/food",
    children: [
      { label: "Tiffins", to: "/category/food/tiffins" },
      { label: "Main Course", to: "/category/food/main_course" },
    ],
  },
  {
    label: "Pooja Items",
    to: "/category/pooja",
    children: [
      { label: "PoojaKit", to: "/category/pooja/poojakit" },
      { label: "Kalasham", to: "/category/pooja/kalasham" },
      { label: "Camphor", to: "/category/pooja/camphor" },
      { label: "Oil", to: "/category/pooja/oil" },
    ],
  },
  {
    label: "Flower Garlands",
    to: "/category/flowers",
    children: [
      { label: "Garland", to: "/category/flowers/garland" },
      { label: "Loose", to: "/category/flowers/loose" },
      { label: "Small", to: "/category/flowers/small" },
      { label: "Medium", to: "/category/flowers/medium" },
      { label: "Large", to: "/category/flowers/large" },
      { label: "Gaza", to: "/category/flowers/gaza" },
    ],
  },
  {
    label: "Tent-House",
    to: "/category/tent_house",
    children: [
      { label: "Tent", to: "/category/tent_house/tent" },
      { label: "Chairs", to: "/category/tent_house/chairs" },
      { label: "Tables", to: "/category/tent_house/tables" },
      { label: "Carpet", to: "/category/tent_house/carpet" },
      { label: "Utensils", to: "/category/tent_house/utensils" },
      { label: "Side_tent", to: "/category/tent_house/side_tent" },
    ],
  },
  {
    label: "Immersion",
    to: "/category/immersion",
    children: [
      { label: "Drums", to: "/category/immersion/drums" },
      { label: "DJ", to: "/category/immersion/dj" },
      { label: "Dappu", to: "/category/immersion/dappulu" },
      { label: "Truck", to: "/category/immersion/truck" },
    ],
  },
  { label: "Registration", to: "/registration" },
  { label: "AI Services", to: "/aiservices" },
  { label: "Ganesha Expenditure", to: "/ganeshaexpenditure" },
  { label: "Debug Roles", to: "/debugroles" },
  { label: "Deployment Steps", to: "/deploymentsteps" },
  { label: "Contact Us", to: "/contact" },
];

export default function SideNav() {
  const [open, setOpen] = useState(null);

  const toggle = (label) => {
    setOpen(open === label ? null : label);
  };

  return (
    <aside className="w-full h-full bg-teal-900 text-white w-56 border-r hidden md:flex flex-col dark:bg-gray-700 dark:text-gray-300">
      <div className="p-4 font-bold text-lg text-orange-600 dark:text-pink-300">
        Vinayaka
      </div>
      <nav className="px-2 pb-6 overflow-y-auto">
        <ul className="space-y-1">
          {menu.map((m) => (
            <li key={m.to}>
              {m.children ? (
                <>
                  <button
                    onClick={() => toggle(m.label)}
                    className="flex justify-between items-center w-full px-3 py-2 rounded hover:bg-gray-300 hover:text-red-900"
                  >
                    <span>{m.label}</span>
                    {open === m.label ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {open === m.label && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {m.children.map((c) => (
                        <li key={c.to}>
                          <Link
                            className="block px-3 py-1 rounded hover:bg-gray-300 hover:text-pink-800"
                            to={c.to}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  className="block px-3 py-2 rounded hover:bg-gray-300 hover:text-red-900"
                  to={m.to}
                >
                  {m.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
