"use client";

import Link from "next/link";

const AboutPage = () => {
  return (
    <main className=" mx-auto  px-4 py-10 text-gray-800 font-sans">
        <div className="max-w-5xl m-auto  space-y-12 " >

      <section>
        <h1 className="text-4xl font-orangegummy text-black mb-4">ABOUT DAMINIH ARTS</h1>
        <p className="text-sm ">
What started as a hand-painted T-shirt for her sister turned into a life-changing passion. Driven by a love for color and creativity, Daminih left her full-time job to follow her dream—and Daminih Arts was born. 
          <br /><br />
        From T-shirts to bags, walls to wood, if it can be painted, she’s painted it. Inspired by nature and fueled by purpose, her journey has been one of courage, color, and endless creativity.

          <br /><br />
          Today, Daminih Arts offers: 
          <br /><br />Custom T-shirt Painting
          <br /><br />Wall Murals
          <br /><br />Painting Workshops
          <br /><br />Illustrations
        </p>

        <blockquote className="mt-4 italic font-orangegummy text-black font-medium">
          “Give your dream a chance and see what it gives you back” — Daminih
        </blockquote>
      </section>

      <section>
        <h2 className="text-3xl  font-orangegummy text-black mb-3">HANDMADE PRODUCTS</h2>
        <p className="text-sm ">
    Every handmadeproduct is special because it has emotions and love woven into it. People mostly buy our products to gift them to their loved ones or get a special design made for themselves whichis of emotional significance to them such as a pet portrait, a loving person’s portrait as a surprise gift, cutecouplesdesigns for their partner. People also buy our products for special days like mother’sday, women’s day, valentines day and many more emotions get attached with every piece of art. 
          <br /><br />
       There are many in-house designs available or you can get it customized too. You just have to get in touch with us and we are available 24/7. The handmade products reflect the dedication and perseverance of the artist unlike factory made or printed products. There is something magical about these products and if you love and appreciate art, you’ll understand what we’re talking about. 
        </p>

        <ul className="list-disc list-inside mt-4 text-sm">
          <li>Daminih Arts Designs: T-shirts, bags, paintings</li>
          <li>Customized Products: T-shirts, bags, paintings</li>
          <li>Bulk Orders</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-orangegummy text-black mb-3">WORKSHOPS</h2>
        <p className="text-sm leading-7">
          Are you a person who is looking to explore something new and creative to break the shackles of your same old daily routine life??
          <br /><br />
         We are here for you. We conduct Painting workshops on regular basis and on different mediums. It’s for people who want to learn painting, doodling and creating their own art. It’s for beginners, artists, non- artists and those who want to get stress out of their lives. It’s even more fun when you attend our workshops to have a weekend getaway with your friends, colleagues or just your partner. You will not justlearn the techniques and skills to create art but also receive tips on how to work out those intricate details and bring out the best expressions in your art. You are free to ask questions and you will get individual attention and feedback for your queries. 
         <br /><br />
         Each workshop is specially configured based on mediums, where you will learn about techniques, materials and tools related to that medium. So get ready to get inspired and kick stress out. Do participatein one of our workshops and explore yourself!
         <br /><br />
         You can also arrange your own paint party with us. We do love to host your team building events, birthday, girl’s night out or family day in. Enjoy 3 hours step by step guided workshop at your home or place of business. 
        </p>

        <ul className="list-disc list-inside mt-4 text-sm">
          <li>Upcoming Workshops</li>
          <li>Personal Paint Parties (Birthday, Office, Girls’ Night Out)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-orangegummy text-black mb-3">WALL PAINTINGS</h2>
        <p className="text-sm leading-7">
         Big wall, wooohhh!!! Big space to paint. It’s always exciting to see a big wall and more exciting when you get a chance to paint on it. Plain old painted walls are so boring and dull. Wall paintings are a forgotten art which once used to give royals and kings the feelings of benevolence, calmness, inspiration etc. Your walls can shape your ideas and your thoughts. Wall paintings also set the mood for you and you will just love it when you come back home from a tiring day and see all the beautiful walls and relax, have tea or coffee. The serenity of this experience cannot be explained in words and you should definitely try it to know what it feels like. You can call us if you want to fill your home or work place with memories. You can add a beautiful landscape in your living room or turn your kid’s room intoan animated world. We would love to do it for you.
          <br /><br />
          Experience the royal, calming effect of personalized wall art. Let your walls speak.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-orangegummy text-black mb-3">CONTACT US</h2>
        <p className="text-sm leading-7">
          We'd love to hear from you — whether it's a question, custom request, or just some love.
        </p>
        <ul className="mt-3 text-sm space-y-1">
          <li>📧 Email: <a href="mailto:daminiharts@gmail.com " className="text-blue-600 underline">daminiharts@gmail.com </a></li>
          <li>📱 Phone: <a href="tel:+918108894701" className="text-blue-600 underline">+91 8108894701</a></li>
          <li>📸 Instagram: <a href="https://www.instagram.com/da_mini_arts/" className="text-blue-600 underline" target="_blank">da_mini_arts</a></li>
          <li>📘 Facebook: <a href="https://www.facebook.com/damini.verma.9" className="text-blue-600 underline" target="_blank">da_mini_arts </a></li>
        </ul>

        
      </section>
        </div>
    </main>
  );
};

export default AboutPage;
