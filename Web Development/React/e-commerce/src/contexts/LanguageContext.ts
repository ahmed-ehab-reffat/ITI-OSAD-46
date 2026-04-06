import {createContext} from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  switchLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  switchLanguage: () => {}
});
