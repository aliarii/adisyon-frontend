import React, { useState, useEffect, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';

const CustomDropdown = ({ items, selectedItemId, handleSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [maxWidth, setMaxWidth] = useState('auto');
    const dropdownRef = useRef(null);
    const selectedItemRef = useRef(null);
    const { t } = useTranslation();

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const findNameFromId = (id) => {
        const selectedItem = items.find((item) => item.id === id.toString());
        return selectedItem ? selectedItem.name : '';
    };

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    // Calculate the width of the dropdown based on the longest item name
    useEffect(() => {
        const maxNameLength = items.reduce((max, item) => {
            const nameLength = t(item.name).length;
            return nameLength > max ? nameLength : max;
        }, 0);

        const calculatedWidth = `${maxNameLength * 10 + 30}px`; // Approximate width + padding
        setMaxWidth(calculatedWidth);
    }, [items, t]);

    // Scroll to the selected item when the dropdown opens
    useEffect(() => {
        if (isOpen && selectedItemRef.current) {
            selectedItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [isOpen]);

    return (
        <div
            ref={dropdownRef}
            className="relative px-1 py-1 rounded-md bg-light-4 dark:bg-dark-3 cursor-pointer text-dark-9 dark:text-light-5 "
            style={{ width: maxWidth }}
        >
            <div className="flex justify-between items-center" onClick={toggleDropdown}>
                <h2>{t(findNameFromId(selectedItemId))}</h2>
                <KeyboardArrowDownIcon />
            </div>
            {isOpen && (
                <div className={`absolute max-h-28 md:max-h-48 -mx-1 mt-2 z-50 w-full rounded-md bg-light-4 dark:bg-dark-3 overflow-x-hidden overflow-y-auto`}>
                    {items.map((item, idx) => (
                        <h2 key={idx} className={`block px-1 py-2 text-sm hover:bg-light-7 hover:dark:bg-dark-4 w-full text-left whitespace-nowrap ${selectedItemId === item.id && 'bg-light-7 dark:bg-dark-4'}`} onClick={() => { handleSelect(item.id); setIsOpen(false); }} ref={selectedItemId === item.id ? selectedItemRef : null}>
                            {t(item.name)}
                        </h2>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;