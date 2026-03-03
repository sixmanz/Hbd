import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, Wand2, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
];



const BirthdayCard = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(nextImage, 5000);
        return () => clearInterval(timer);
    }, []);



    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
            className="max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-xl w-full mx-auto bg-white/85 backdrop-blur-2xl border-4 border-white/50 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(255,182,193,0.4)] p-5 sm:p-8 md:p-10 text-center relative overflow-visible my-8"
        >


            {/* Floating Cute Icons - Adjusted sizes for mobile */}
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -top-4 -left-3 sm:-top-8 sm:-left-6 text-pink-300 z-20">
                <Heart size={32} className="sm:w-12 sm:h-12 md:w-16 md:h-16" fill="#FFB6C1" stroke="none" />
            </motion.div>
            <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-3 -right-3 sm:-top-7 sm:-right-5 text-yellow-300 z-20">
                <Star size={40} className="sm:w-14 sm:h-14 md:w-20 md:h-20" fill="#FFE4B5" stroke="none" />
            </motion.div>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute bottom-4 -left-4 sm:bottom-10 sm:-left-12 text-purple-300 z-20">
                <Sparkles size={32} className="sm:w-12 sm:h-12 md:w-14 md:h-14" />
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 space-y-4 sm:space-y-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="inline-block bg-pink-100/80 text-pink-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wider uppercase mb-2 shadow-sm"
                >
                    ✨ Teacher to be ✨
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-800 tracking-tight leading-tight"
                    style={{ textShadow: "2px 2px 0px #FFF0F5" }}
                >
                    <span className="text-pink-500">Happy</span> <span className="text-purple-400">Birthday</span>
                    <br />
                    <span className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-bold block mt-3 px-2">สุขสันต์วันเกิดนะครับปอ! 🎉</span>
                </motion.h1>

                {/* Photo Area with Carousel - Improved size responsiveness */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto group perspective-1000"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/40 to-purple-300/40 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-500 scale-110"></div>
                    <div className="w-full h-full bg-white rounded-3xl border-4 sm:border-8 border-white/80 overflow-hidden relative shadow-2xl flex items-center justify-center translate-z-10 group-hover:scale-[1.02] transition-transform duration-500">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImage}
                                src={import.meta.env.BASE_URL + images[currentImage]}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, ease: "anticipate" }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Carousel Controls - Better visibility and touch target */}
                        <button
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full text-pink-500 shadow-lg hover:bg-pink-50 transition-colors z-30 sm:opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2.5 rounded-full text-pink-500 shadow-lg hover:bg-pink-50 transition-colors z-30 sm:opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Indicators - Cleaner look */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentImage(i)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentImage ? 'bg-pink-500 w-4 shadow-sm' : 'bg-white/70 hover:bg-white'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Tiny badge - Refined positioning */}
                    <div className="absolute -bottom-4 -right-2 sm:-bottom-5 sm:-right-4 bg-white p-3 sm:p-4 rounded-full shadow-xl z-30 animate-bounce">
                        <Heart size={24} className="text-red-400 sm:w-8 sm:h-8" fill="currentColor" />
                    </div>
                </motion.div>

                {/* Message - Better readability and font scaling */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white/50 backdrop-blur-sm rounded-3xl p-5 sm:p-8 space-y-3 sm:space-y-4 shadow-inner border border-pink-50/50"
                >
                    <div className="text-base sm:text-lg md:text-xl text-gray-700 font-medium leading-relaxed space-y-3">
                        <p className="flex items-center justify-center gap-2">
                            <span className="hidden sm:inline">🍎</span>
                            <span>สุขสันต์วันเกิดนะ ว่าที่ "คุณครูปอ" คนเก่ง!</span>
                        </p>
                        <p className="text-gray-600">ขอให้สมหวังในทุกเรื่องที่ตั้งใจไว้ 🌟</p>
                        <p className="text-gray-600">มีชีวิตที่สดใสและรอยยิ้มในทุกวันนะ ✌️</p>
                        <p className="text-gray-500 italic mt-2 text-sm sm:text-base">"เหนื่อยแค่ไหนก็ขอให้รู้ว่าเธอเก่งและทำได้ดีเสมอ สู้ๆ นะคนสวย" 💖</p>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent my-2 sm:my-4"></div>
                    <p className="text-pink-500 text-lg sm:text-xl md:text-2xl font-black py-1">
                        โตขึ้นอย่างงดงาม และมีความสุขที่สุดนะ! 💙
                    </p>
                </motion.div>

                {/* Button - More premium look */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gray-900 text-white font-black py-4 px-10 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(255,105,180,0.4)] transition-all duration-300 flex items-center gap-3 mx-auto overflow-hidden active:translate-y-1"
                    onClick={() => window.location.reload()}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    <Wand2 size={20} className="group-hover:rotate-12 transition-transform" />
                    <span className="text-sm sm:text-base tracking-widest uppercase">Make a Wish Again!</span>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default BirthdayCard;
