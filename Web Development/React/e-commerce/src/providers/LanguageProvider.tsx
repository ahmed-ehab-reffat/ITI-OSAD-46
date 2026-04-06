import {useState, useEffect} from 'react';
import {LanguageContext, type Language} from '../contexts/LanguageContext';

interface Props {
  children: React.ReactNode;
}

export default function LanguageProvider({children}: Props) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  function switchLanguage() {
    setLanguage((prev) => {
      if (prev === 'en') return 'ar';
      return 'en';
    });
  }

  const ctxValue = {language, switchLanguage};

  return <LanguageContext value={ctxValue}>{children}</LanguageContext>;
}
