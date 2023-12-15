export default function Carousel() {
    return (
      <div className="carousel-container w-full mt-10 rounded-lg">
        <div className="carousel w-full rounded-lg">
          <div id="slide1" className="carousel-item relative w-full h-80 opacity-70">
          <div className="gradient-overlay"></div>
            <img
              src="https://wallpapers.com/images/high/sharpshooter-in-battlefield-wygalzv1phocso8u.webp"
              className="w-full h-full object-cover"
              alt="Slide 1"
            />
             <div className="gradient-overlay absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              {/* Controls */}
            </div>
          </div>
          <div className="gradient-overlay"></div>
          <div id="slide2" className="carousel-item relative w-full h-80">
            <img
              src="https://assetsio.reedpopcdn.com/elden-ring-ranni.jpg?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp"
              className="w-full h-full object-cover opacity-60"
              alt="Slide 2"
            />
             <div className="gradient-overlay absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              {/* Controls */}
            </div>
          </div>
          <div className="gradient-overlay"></div>
          <div id="slide3" className="carousel-item relative w-full h-80">
            <img
              src="https://images3.alphacoders.com/134/1342688.jpeg"
              className="w-full h-full object-cover opacity-60"
              alt="Slide 3"
            />
             <div className="gradient-overlay absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              {/* Controls */}
            </div>
          </div>
          <div className="gradient-overlay"></div>
          <div id="slide4" className="carousel-item relative w-full h-80">
            <img
              src="https://gamingbolt.com/wp-content/uploads/2022/06/Call-of-Duty-Modern-Warfare-2-5-1536x864.jpg"
              className="w-full h-full object-cover opacity-60"
              alt="Slide 4"
            />
             <div className="gradient-overlay absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              {/* Controls */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
