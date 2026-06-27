"use client";

import { useLanguage } from "./context/LanguageContext";
import TermsPageBurmese from "./TermsPageBurmese";
import TermsPageEnglish from "./TermsPageEnglish";

export default function TermsOfUseParent() {
  const { language } = useLanguage();

  if (language === "my") {
    return <TermsPageBurmese />;
  }

  return <TermsPageEnglish />;
}
