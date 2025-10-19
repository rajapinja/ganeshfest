import React from "react";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-primary dark:text-pink-300">
        Contact Us
      </h1>

      {/* Info Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          LARAID SOFTWARE SOLUTIONS
        </h2>

        {/* Emails */}
        <div className="space-y-1">
          <p >
            <strong>Email:</strong>
          </p>
          <ul className="list-disc list-inside text-blue-600 dark:text-blue-400">
            <li>
              <a href="mailto:rajapinja@laraidsolutions.org">
                rajapinja@laraidsolutions.org
              </a>
            </li>
            <li>
              <a href="mailto:info@laraidsolutions.org">
                info@laraidsolutions.org
              </a>
            </li>
            <li>
              <a href="mailto:support@laraidsolutions.org">
                support@laraidsolutions.org
              </a>
            </li>
          </ul>
        </div>

        {/* Phone Numbers */}
        <div >
          <p>
            <strong>Phone:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-300">
            <li>
              <a href="tel:+919347160365">+91 9347160365</a>
            </li>
            <li>
              <a href="tel:+919347839890">+91 9347839890</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
        Copyright ©2022 Laraid Software Solutions. All rights reserved.
      </footer>
    </div>
  );
}
