import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import tr from './locales/tr.json';
import de from './locales/de.json';
import jp from './locales/jp.json';
// Dil kaynaklarını tanımla
export const languageResources = {
  en: { translation: en }, // İngilizce çevirileri
  tr: { translation: tr }, // Türkçe çevirileri
  de: { translation: de }, // Almanca çevirileri
  jp: { translation: jp }, // Japonca çevirileri
};

// i18next'i başlat ve yapılandır
i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3', // JSON uyumluluğu ayarı
  lng: 'en', // Varsayılan dil (İngilizce)
  fallbackLng: 'en', // Dilde bir hata olursa kullanılacak varsayılan dil
  resources: languageResources, // Dil kaynaklarını ekle
});

export default i18next;
