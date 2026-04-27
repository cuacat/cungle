/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Zap, 
  Moon, 
  Sun, 
  ArrowLeft, 
  Clock, 
  Info,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  ScrollText,
  Sparkles,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RITUALS, MANTRAS } from './constants';
import { Ritual, Mantra } from './types';

export default function App() {
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const [selectedMantra, setSelectedMantra] = useState<Mantra | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isLargeFont, setIsLargeFont] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredRituals = useMemo(() => {
    return RITUALS.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || r.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const filteredMantras = useMemo(() => {
    if (categoryFilter !== 'all' && categoryFilter !== 'mantra') return [];
    return MANTRAS.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, categoryFilter]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const categories = [
    { id: 'all', label: 'Tất cả', icon: BookOpen },
    { id: 'recurring', label: 'Hằng tháng', icon: CalendarIcon },
    { id: 'lunar-year', label: 'Hằng năm', icon: Moon },
    { id: 'death-anniversary', label: 'Cúng Giỗ', icon: Heart },
    { id: 'mantra', label: 'Bài Chú', icon: Zap },
  ];

  const handleBack = () => {
    setSelectedRitual(null);
    setSelectedMantra(null);
  };

  return (
    <div className="min-h-screen bg-beige-50 flex flex-col items-center py-4 md:py-12 px-4 selection:bg-crimson-800 selection:text-white">
      {/* Scrollable Frame Container */}
      <div className="w-full max-w-5xl border-[8px] md:border-[16px] border-crimson-800 bg-white/50 relative shadow-2xl flex flex-col">
        {/* Inner thin border decor */}
        <div className="absolute inset-1 border border-amber-800 opacity-20 pointer-events-none"></div>

        {/* Header */}
        <header className="pt-12 px-6 md:px-16 mb-12 flex flex-col items-center border-b-2 border-crimson-800/10 pb-10 relative z-50">
          <div className="text-crimson-800 text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-sans font-bold text-center px-4">
            Sổ tay cúng lễ truyền thống hằng năm
          </div>
          <div 
            className="flex flex-col items-center cursor-pointer group text-center px-4" 
            onClick={handleBack}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-crimson-800 italic tracking-tight transition-all group-hover:scale-102 break-words">
              Cúng Lễ Việt
            </h1>
            <p className="text-sm md:text-base text-brown-700 mt-3 font-medium italic opacity-80 max-w-lg break-words whitespace-pre-line">
              {`Hướng dẫn chi tiết về nghi thức thờ cúng truyền thống tại gia\nDuy trì nét đẹp văn hóa tâm linh gắn liền với lối sống đạo đức và lòng biết ơn sâu sắc`}
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center space-y-4 px-4 text-center">
            <div className="text-crimson-900 font-serif font-bold text-sm md:text-base tracking-[0.2em] border-y border-crimson-800/20 py-2">
              TÂM THÀNH - MIỆNG KHẤN - TAI NGHE - Ý HIỂU
            </div>
          </div>
          
          <button 
            onClick={() => setIsLargeFont(!isLargeFont)}
            className="mt-8 px-5 py-1.5 rounded-none border border-crimson-800/30 hover:bg-crimson-800 hover:text-white transition-all text-brown-700 font-bold text-xs uppercase tracking-widest bg-white/40"
          >
            {isLargeFont ? 'Cỡ chữ Gốc' : 'Cỡ chữ Lớn'}
          </button>
        </header>

        <main className="flex-1 px-4 md:px-16 relative z-10 pb-12 overflow-hidden">
          <AnimatePresence mode="wait">
            {!selectedRitual && !selectedMantra ? (
              <motion.div 
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                {/* Search */}
                <div className="max-w-md mx-auto">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-crimson-800 opacity-40 group-focus-within:opacity-100 transition-opacity" size={20} />
                    <input 
                      type="text" 
                      placeholder="Tìm bài cúng, bài chú..." 
                      className="w-full pl-12 pr-4 py-4 bg-white/40 border border-beige-100 focus:bg-white focus:border-crimson-800 outline-none shadow-sm transition-all text-lg rounded-none font-serif placeholder:italic"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all border ${
                        categoryFilter === cat.id 
                          ? 'bg-crimson-800 text-white border-crimson-800' 
                          : 'bg-white/40 text-brown-700 border-beige-100 hover:border-crimson-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Listings */}
                <div className="space-y-16">
                  {filteredMantras.length > 0 && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-crimson-800/20"></div>
                        <h3 className="text-xl font-bold tracking-tight text-brown-900 flex items-center gap-2">
                          <Zap className="text-crimson-800" size={20} /> BÀI CHÚ
                        </h3>
                        <div className="h-px flex-1 bg-crimson-800/20"></div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {filteredMantras.map((m) => (
                          <div 
                            key={m.id}
                            onClick={() => setSelectedMantra(m)}
                            className="bg-white/40 p-6 border border-beige-100 hover:bg-white hover:border-crimson-800 transition-all cursor-pointer group"
                          >
                            <h4 className="font-bold text-lg mb-2 text-brown-900 group-hover:text-crimson-800 transition-colors uppercase tracking-tight">{m.title}</h4>
                            <p className="text-xs text-brown-700 leading-relaxed italic line-clamp-2">{m.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {filteredRituals.length > 0 && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-crimson-800/20"></div>
                        <h3 className="text-xl font-bold tracking-tight text-brown-900 flex items-center gap-2">
                          <BookOpen className="text-crimson-800" size={20} /> CÚNG LỄ
                        </h3>
                        <div className="h-px flex-1 bg-crimson-800/20"></div>
                      </div>
                      <div className="grid gap-4">
                        {filteredRituals.map((r) => (
                          <div 
                            key={r.id}
                            onClick={() => setSelectedRitual(r)}
                            className="bg-white/40 p-8 border border-brown-900/5 hover:bg-white hover:border-crimson-800 transition-all cursor-pointer flex items-center justify-between group"
                          >
                            <div className="space-y-3">
                              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-800 opacity-60">
                                {r.category === 'lunar-year' ? 'Cúng Lễ Hằng Năm' : 
                                 r.category === 'death-anniversary' ? 'Cúng Giỗ Truyền Thống' :
                                 'Cúng Lễ Hằng Tháng'}
                              </span>
                              <h4 className="text-2xl font-bold text-brown-900 group-hover:text-crimson-800 group-hover:italic transition-all">{r.title}</h4>
                              <p className="text-sm text-brown-700 italic opacity-80 max-w-xl">{r.description}</p>
                            </div>
                            <ChevronRight className="text-crimson-800 opacity-10 group-hover:opacity-100 transition-all" size={32} />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {filteredRituals.length === 0 && filteredMantras.length === 0 && (
                    <div className="text-center py-24 text-brown-700 italic border border-beige-100 bg-white/20">
                      Nội dung đang được cập nhật thêm...
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                <div className="flex justify-between items-center bg-white/20 p-4 border border-beige-100">
                  <button 
                    onClick={handleBack}
                    className="flex items-center gap-2 text-crimson-800 hover:italic transition-all font-bold text-xs uppercase tracking-widest"
                  >
                    <ArrowLeft size={16} /> Quay lại mục lục
                  </button>
                </div>

                <div className="bg-white border border-beige-100 shadow-2xl relative p-6 md:p-14">
                  {/* Detailed Title */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6 border-b border-beige-100 pb-10">
                    <div className="flex-1 space-y-6">
                      <h2 className="text-3xl md:text-5xl font-bold text-brown-900 tracking-tight">{(selectedRitual || selectedMantra)?.title}</h2>
                      
                      {/* Guidance Box from Document */}
                      {(selectedRitual?.description || selectedMantra?.description) && (
                        <div className="bg-amber-50/50 border-l-4 border-amber-800/30 p-6 md:p-8 italic text-brown-800 shadow-sm">
                           <h4 className="text-xs font-bold uppercase tracking-widest text-amber-900/60 not-italic mb-4 flex items-center gap-2">
                             <BookOpen size={14} /> Hướng dẫn chi tiết
                           </h4>
                           <div className="whitespace-pre-line text-base md:text-lg leading-relaxed font-serif">
                            {selectedRitual?.description || selectedMantra?.description}
                           </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-14">
                      {/* Prayer Content */}
                      <section className="space-y-8">
                        <div className="flex items-center justify-between border-b border-crimson-800/10 pb-4">
                          <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-amber-800 flex items-center gap-3">
                            <ScrollText size={16} /> Văn Khấn / Chân Ngôn
                          </h3>
                          <button 
                            onClick={() => handleCopy(selectedRitual?.prayer || selectedMantra?.content || '')}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-crimson-800 hover:bg-crimson-800 hover:text-white px-4 py-1.5 border border-crimson-800 transition-all font-sans"
                          >
                            {copied ? <><Check size={12} /> Đã chép</> : <><Copy size={12} /> Sao chép</>}
                          </button>
                        </div>
                        
                        <div className={`p-8 md:p-12 bg-beige-50 border-l-[8px] border-crimson-800 italic shadow-inner ${isLargeFont ? 'text-3xl leading-snug' : 'text-xl md:text-2xl leading-relaxed'} text-brown-900 whitespace-pre-line break-words font-serif`}>
                          {selectedRitual?.prayer || selectedMantra?.content}
                        </div>

                        <div className="flex justify-center items-center gap-6 pt-10">
                          <div className="h-px flex-1 bg-crimson-800/20"></div>
                          <div className="w-4 h-4 border border-crimson-800 rotate-45 shrink-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-crimson-800"></div>
                          </div>
                          <div className="h-px flex-1 bg-crimson-800/20"></div>
                        </div>
                      </section>
                    </div>

                    <div className="lg:col-span-4 space-y-10">
                      {/* Preparation / Info Sidebar */}
                      {selectedRitual?.preparation && (
                        <div className="border border-beige-100 p-8 bg-beige-50/70 shadow-sm">
                          <h3 className="text-center text-xs font-bold uppercase tracking-[0.3em] text-crimson-800 border-b border-beige-100 pb-4 mb-8 flex items-center justify-center gap-3">
                            <Sparkles size={16} /> Sắm Lễ Vật
                          </h3>
                          <ul className="text-sm md:text-base space-y-5">
                            {selectedRitual.preparation.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-4">
                                <span className="w-2 h-2 rounded-full bg-amber-800 mt-2 shrink-0"></span>
                                <span className="text-brown-700 leading-relaxed font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="bg-crimson-800 p-8 text-white text-xs md:text-sm leading-relaxed shadow-lg">
                        <h4 className="font-bold uppercase tracking-widest mb-4 text-[#FFD700] flex items-center gap-2">
                          <Info size={16} /> Lưu ý quan trọng
                        </h4>
                        <p className="opacity-90 italic">
                          {selectedRitual?.notes || "Trang phục trang trọng, thành tâm hướng linh. Không cần mâm cao cỗ đầy, cốt ở tấm lòng thành kính."}
                        </p>
                      </div>

                      <div className="flex justify-center pt-6 opacity-30">
                        <div className="w-14 h-14 border-2 border-crimson-800 rotate-45 flex items-center justify-center">
                          <div className="w-8 h-8 border border-crimson-800"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="px-6 md:px-16 flex flex-col items-center py-12 border-t border-crimson-800/10 mt-12 bg-white/30 text-center gap-6">
          <div className="text-crimson-800 font-sans font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase max-w-2xl">
            VĂN MINH MÀ KHÔNG VÔ TÂM - TÍN TÂM MÀ KHÔNG MÊ TÍN
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center w-full text-[10px] text-brown-700 font-sans font-bold uppercase tracking-[0.3em] opacity-80 pt-4">
            <div className="mb-6 md:mb-0">@2026 Bác Phương già</div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <span className="hover:text-crimson-800 cursor-pointer transition-colors">Văn Hóa Việt</span>
              <span className="hover:text-crimson-800 cursor-pointer transition-colors">Tâm Thành</span>
            </div>
          </div>
        </footer>
      </div>
    </div>


  );
}
