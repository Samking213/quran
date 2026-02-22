import { motion } from 'motion/react';

interface HomeProps {
  onSelectPara: (para: number) => void;
}

export default function Home({ onSelectPara }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center p-5 text-center bg-[radial-gradient(circle,var(--color-light-green),var(--color-dark-green))] text-white font-amiri">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[clamp(30px,8vw,55px)] text-gold font-bold my-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
      >
        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
      </motion.div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/50 p-6 rounded-2xl border-2 border-gold w-[90%] max-w-[750px] shadow-[0_0_20px_rgba(0,0,0,0.5)] animate-glow-pulse mx-auto my-4"
      >
        <div className="font-lateef text-[clamp(20px,5.5vw,30px)] leading-[1.8] text-right" dir="rtl">
          اَللّٰهُمَّ صَلِّ عَلٰى <span className="text-gold font-bold drop-shadow-[0_0_10px_var(--color-gold)]">مُحَمَّدٍ</span> وَّعَلٰى اٰلِ <span className="text-gold font-bold drop-shadow-[0_0_10px_var(--color-gold)]">مُحَمَّدٍ</span> كَمَا صَلَّيْتَ عَلٰى اِبْرَاهِيْمَ وَعَلٰى اٰلِ اِبْرَاهِيْمَ اِنَّكَ حَمِيْدٌ مَّجِيْدٌ <br />
          اَللّٰهُمَّ بَارِكْ عَلٰى <span className="text-gold font-bold drop-shadow-[0_0_10px_var(--color-gold)]">مُحَمَّدٍ</span> وَّعَلٰى اٰلِ <span className="text-gold font-bold drop-shadow-[0_0_10px_var(--color-gold)]">مُحَمَّدٍ</span> كَمَا بَارَكْتَ عَلٰى اِبْرَاهِيْمَ وَعَلٰى اٰلِ اِبْرَاهِيْمَ اِنَّكَ حَمِيْدٌ مَّجِيْدٌ
        </div>
      </motion.div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(85px,1fr))] gap-2.5 w-full max-w-[900px] my-8">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
          <motion.div
            key={num}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectPara(num)}
            className="bg-[rgba(255,215,0,0.1)] border border-gold p-4 rounded-xl cursor-pointer font-bold hover:bg-gold hover:text-black transition-colors duration-300"
          >
            Para {num}
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <a 
          href="/quran_pdf/Quran_Complete.pdf" 
          download="Quran_Complete.pdf"
          className="bg-dark-green border-2 border-gold text-gold px-8 py-3 rounded-full font-bold text-xl hover:bg-gold hover:text-black transition-colors shadow-[0_0_15px_rgba(255,215,0,0.3)] flex items-center gap-2 mx-auto w-fit"
        >
          📥 Pura Quran Download Karein
        </a>
      </motion.div>

      <footer className="p-6 text-gold font-bold tracking-widest uppercase mt-auto">
        ✨ MADE BY SAM ✨
      </footer>
    </div>
  );
}
