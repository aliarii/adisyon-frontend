import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import languages from '../../Utils/languages';
import CustomDropdown from '../Dropdown/CustomDropdown';

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const getDefaultLanguage = () => {
        const defaultLang = languages.find((lang) => lang.id === i18n.language);
        return defaultLang ? defaultLang.id : languages[0].id;
    };

    const [selectedLanguage, setSelectedLanguage] = useState(getDefaultLanguage());

    const handleLanguageChange = (id) => {
        setSelectedLanguage(id);
        i18n.changeLanguage(id);
    };

    return (
        <div>
            <CustomDropdown
                items={languages}
                selectedItemId={selectedLanguage}
                handleSelect={handleLanguageChange}
            />
        </div>
    );
};

export default LanguageSelector;
