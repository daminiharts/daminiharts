'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpenCheck,
  BadgeCheck,
  CalendarClock,
  PlayCircle,
  Pencil,
} from 'lucide-react';

const courses = [
  {
    title: "10-Day Watercolor Course",
    description:
      "Unlock your creativity with this comprehensive 10-day watercolor course designed for beginners and hobbyists alike!",
    learnings: [
      "Essential Drawing & Watercolor Techniques — sketching, blending, layering, brush control.",
      "Step-by-Step Watercolor Projects — 9 guided paintings with clear demos."
    ],
    features: [
      { icon: PlayCircle, text: "Pre-recorded video lessons — learn at your own pace" },
      { icon: CalendarClock, text: "Access for 6 months from the date of purchase" },
      { icon: Pencil, text: "No prior experience needed" }
    ]
  },
  {
    title: "10-Day Acrylic Painting Course",
    description:
      "Dive into the vibrant world of acrylics with this 10-day course perfect for beginners and art enthusiasts!",
    learnings: [
      "Core Drawing & Acrylic Techniques — underpainting, layering, brushwork.",
      "Step-by-Step Acrylic Projects — 9 beautiful acrylic artworks."
    ],
    features: [
      { icon: PlayCircle, text: "Pre-recorded video lessons — watch anytime, anywhere" },
      { icon: CalendarClock, text: "Access for 6 months from the date of purchase" },
      { icon: Pencil, text: "No prior experience needed" }
    ]
  },
  {
    title: "15-Day Complete Art Course",
    description:
      "Explore various artistic styles in this engaging course for beginners and aspiring artists!",
    learnings: [
      "Day 1: Drawing — lines, shading, proportions.",
      "Day 2: Doodle Art — fun, spontaneous doodling.",
      "Day 3: Stippling Art — depth using dots.",
      "Day 4–5: Illustration Art — character sketching & inking.",
      "Day 6–10: Watercolor Techniques — washes, layering, details.",
      "Day 11–15: Acrylic Painting — texture, layering, color."
    ],
    features: [
      { icon: PlayCircle, text: "Pre-recorded video lessons — flexible pace" },
      { icon: CalendarClock, text: "6 months access from date of enrollment" },
      { icon: Pencil, text: "No prior experience required" }
    ]
  }
];

export const WorkshopDetails = ({ title }) => {
  const course = courses.find((course) => course.title === title);
  if (!course) return null;

  return (
    <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="max-h-[500px] overflow-y-auto scrollbar-hide p-6 rounded-2xl bg-gradient-to-br from-white via-[#fdf9f6] to-[#fffefc]"
>
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
        <BookOpenCheck className="text-yellow-500 w-7 h-7" />
        {course.title}
      </h2>

      <p className="text-gray-600 text-lg mb-6 leading-relaxed">{course.description}</p>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <BadgeCheck className="text-green-500 w-5 h-5" />
            What You'll Learn
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
            {course.learnings.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <BadgeCheck className="text-blue-500 w-5 h-5" />
            Course Features
          </h3>
          <ul className="space-y-3">
            {course.features.map(({ icon: Icon, text }, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-gray-700"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Icon className="text-yellow-500 w-5 h-5 mt-1" />
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>
        </section>
      </div>
    </motion.div>
  );
};
