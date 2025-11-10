import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 items-center">
          <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/background_image.jpg" // Replace with a picture of your aunt or the bakery
              alt="Our Bakery"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="mt-12 md:mt-0">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Our Story
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Flavour Bites started from a simple passion for baking in a small home kitchen. My aunt, a lifelong baker, poured her heart into creating delicious treats for family and friends. Her cookies were legendary, her cakes the centerpiece of every celebration.
            </p>
            <p className="mt-4 text-xl text-gray-600">
              What began as a hobby, fueled by love and the finest local ingredients, soon blossomed into a beloved local business. We believe that every bite should be a moment of joy, and we are dedicated to bringing that experience to you.
            </p>
            <p className="mt-4 text-xl text-gray-600">
              Thank you for being a part of our story.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
