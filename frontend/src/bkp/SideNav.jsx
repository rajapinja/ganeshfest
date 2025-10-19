import React from 'react'
import { Link } from 'react-router-dom'

const menu = [
  { label: 'Home', to: '/' },
  { label: 'Ganesh Idols', to: '/category/idols', children: [
    { label: 'Clay', to: '/category/idols/clay' },
    { label: 'Asbestos', to: '/category/idols/asbestos' },
  ]},
  { label: 'Food Services', to: '/category/food', children: [
    { label: 'Tiffins', to: '/category/food/tiffins' },
    { label: 'Main Course', to: '/category/food/main_course' },
  ]},
  { label: 'Puja Items', to: '/category/pooja',  children: [
    { label: 'PoojaKit', to: '/category/pooja/poojakit' },
    { label: 'Kalasham', to: '/category/pooja/kalasham' },
    { label: 'Camphor', to: '/category/pooja/camphor' },
    { label: 'Oil', to: '/category/pooja/oil' },
  ]},
  { label: 'Flower Garlands', to: '/categorypooja/flowers',  children: [
    { label: 'Garland', to: '/category/flowers/garland' },
    { label: 'Loose', to: '/category/flowers/loose' },
    { label: 'Small', to: '/category/flowers/small' },
    { label: 'Medium', to: '/category/flowers/medium' },
    { label: 'Large', to: '/category/flowers/large' },
    { label: 'Gaza', to: '/category/flowers/gaza' },
  ]},
  { label: 'Tent-House', to: '/category/tent_house',  children: [
    { label: 'Tent', to: '/category/tent_house/tent' },
    { label: 'Chairs', to: '/category/tent_house/chairs' },
    { label: 'Tables', to: '/category/tent_house/tables' },
    { label: 'Carpet', to: '/category/tent_house/carpet' },
    { label: 'Utensils', to: '/category/tent_house/utensils' },
    { label: 'Side_tent', to: '/category/tent_house/side_tent' },
  ]},
  { label: 'Immersion', to: '/category/Immersion',  children: [
    { label: 'Drums', to: '/category/Immersion/drums' },
    { label: 'DJ', to: '/category/Immersion/dj' },
    { label: 'Dappulu', to: '/category/Immersion/dappulu' },
    { label: 'Truck', to: '/category/Immersion/truck' },
  ]},
  { label: 'Registration', to: '/registration' },
  { label: 'AI Services', to: '/aiservices' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Debug Roles', to: '/debugroles' },
]

export default function SideNav() {
  return (
    <aside className="w-full h-full bg-teal-900 text-white w-56 border-r hidden md:flex flex-col dark:bg-gray-700 dark:text-gray-300">
      <div className="p-4 font-bold text-lg text-orange-600 dark:text-pink-300">Vinayaka</div>
      <nav className="px-2 pb-6 overflow-y-auto">
        <ul className="space-y-1">
          {menu.map((m) => (
            <li key={m.to}>
              <Link className="block px-3 py-2 rounded hover:bg-gray-300  hover:text-red-900 " to={m.to}>{m.label}</Link>
              {m.children && (
                <ul className="ml-4 mt-1 space-y-1">
                  {m.children.map((c) => (
                    <li key={c.to}>
                      <Link className="block px-3 py-1 rounded hover:bg-gray-300 hover:text-pink-800" to={c.to}>{c.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
