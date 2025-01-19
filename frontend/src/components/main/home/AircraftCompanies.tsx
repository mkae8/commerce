// "use client";

// import Image from "next/image";

// const images = [
//   {
//     src: "/737max.JPG",
//     alt: "Boeing 737 Max",
//   },
//   {
//     src: "/an-24.jpg",
//     alt: "Boeing 787 Dreamliner",
//   },
//   {
//     src: "/an-24.jpg",
//     alt: "Antonov An-24",
//   },
//   {
//     src: "/top/767-300.jpg",
//     alt: "Boeing 787 Freighter",
//   },
//   {
//     src: "/top/737 max.jpg",
//     alt: "Boeing 737 Max Interior",
//   },
// ];

// export const AircraftCompanies = () => {
//   return (
//     <section className="py-16 px-4 max-w-7xl mx-auto">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl font-bold text-gray-900 mb-4">
//           Share your aircraft with
//         </h2>
//         <p className="text-5xl font-bold text-gray-900 tracking-tight">
//           #AircraftGallery
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px]">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`relative overflow-hidden rounded-lg group `}
//           >
//             <Image
//               src={image.src}
//               alt={image.alt}
//               layout="fill"
//               objectFit="cover"
//               className="group-hover:scale-110 transition-transform duration-300 ease-in-out"
//             />
//             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <div className="absolute bottom-4 left-4 right-4 text-center">
//                 <p className="text-white text-sm font-medium">{image.alt}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };
