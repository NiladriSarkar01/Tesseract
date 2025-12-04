import React from "react";

const AboutTesseract = () => {
  // Mock content for GNIT (Section 2)
  const gnitContent = {
    heading: "ABOUT GNIT",
    paragraph:
      "Guru Nanak Institute of Technology (GNIT) was established in 2003 under the visionary guidance of the JIS Group Educational Initiatives. Located near Kolkata, GNIT is dedicated to providing high-quality technical education and fostering innovation. The institute offers a diverse range of undergraduate and postgraduate programs across various engineering and technological disciplines. GNIT aims to produce socially responsible, technically competent, and ethically sound professionals ready to meet global challenges. We emphasize practical learning, research, and a holistic approach to student development.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0", // Placeholder video URL
  };

  // Content for Tesseract (Section 1)
  const tesseractContent = {
    headingPart1: "You might be",
    headingPart2: "Thinking what is",
    headingPart3: "TESSERACT?",
    paragraph:
      '<span class="text-white font-bold">TESSERACT</span> is the annual tech fest organized by Guru Nanak Institute of Technology. It\'s an exciting event that celebrates the technical expertise and artistic talents of aspiring engineers. The event brings together participants from across the state, making it one of the most prestigious events of its kind. The <span class="text-blue-400 font-bold">two-day</span> mega event is a visual treat for attendees, transporting them to another world with a variety of captivating performances by aspiring engineers and artists. <span class="text-white font-bold">TESSERACT</span> offers a diverse range of activities that cater to everyone\'s interests.',
  };

  return (
    <div className="bg-[#02040800] font-sans text-white relative overflow-hidden">
      {/* Background Grid and Glow for the entire page */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      ></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* --- SECTION 1: WHAT IS TESSERACT? (Full Width) --- */}
      <div className="relative z-10 w-full mx-auto px-6 lg:px-12 py-20 md:py-24 border-b border-cyan-900/50">
        <div className="max-w-5xl">
          <h2 className="text-5xl md:text-8xl font-extrabold leading-tight mb-10">
            <span className="block text-white">
              {tesseractContent.headingPart1}
            </span>
            <span className="block text-white">
              {tesseractContent.headingPart2}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-7xl md:text-9xl scale-x-105">
              {tesseractContent.headingPart3}
            </span>
          </h2>

          <p
            className="text-lg md:text-xl text-gray-300 leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: tesseractContent.paragraph }}
          />
        </div>
      </div>

      {/* --- SECTION 2: ABOUT GNIT (Two Columns with Video) --- */}
      <div className="relative z-10 w-full mx-auto px-6 lg:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Heading and Text Content (About GNIT) */}
          <div className="lg:col-span-1">
            <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
              <span className="block text-white">Learn More</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
                {gnitContent.heading}
              </span>
            </h2>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light pr-4">
              {gnitContent.paragraph}
            </p>
          </div>

          {/* Right Column: Video Placeholder */}
          <div className="lg:col-span-1 min-h-[300px] md:min-h-[400px]">
            {/* Responsive Iframe container for YouTube/Vimeo/etc. */}
            <div className="relative pt-[56.25%] w-full h-0 shadow-2xl shadow-cyan-900/50 border-4 border-cyan-700/70 rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={gnitContent.videoUrl}
                title="GNIT Promotional Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-4 text-sm text-center text-gray-500 font-mono">
              // GNIT Vision Protocol Initialized
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTesseract;
