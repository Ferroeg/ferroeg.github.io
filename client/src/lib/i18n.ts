import { create } from 'zustand';

type Language = 'en' | 'ar';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (lang) => {
    set({ language: lang });
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  },
}));

export const translations = {
  en: {
    title: "Systematic Reading Initiative",
    heroTitle: "Systematic Reading Initiative",
    heroSubtitle: "Join our systematic reading initiation program. Two levels of engagement, curated literary masterpieces, and meaningful community debates.",
    exploreLibrary: "Explore Library",
    viewSchedule: "View Debate Schedule",
    currentReadings: "Current Readings",
    library: "Library",
    debates: "Debates",
    news: "News",
    about: "About",
    home: "Home",
  },
  ar: {
    title: "مبادرة القراءة المنهجية",
    heroTitle: "مبادرة القراءة المنهجية",
    heroSubtitle: "انضم إلى برنامجنا المنهجي لبداية القراءة. مستويان من المشاركة، روائع أدبية مختارة، ونقاشات مجتمعية هادفة.",
    exploreLibrary: "استكشف المكتبة",
    viewSchedule: "عرض جدول المناقشات",
    currentReadings: "القراءات الحالية",
    library: "المكتبة",
    debates: "المناقشات",
    news: "الأخبار",
    about: "حول",
    home: "الرئيسية",
  }
};
