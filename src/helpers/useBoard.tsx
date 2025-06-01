import { useEffect, useRef, useState } from "react";
import { LanguageType, PerentSideType } from "@/data/type";

export type dropdownName = 'isDarkMode' | 'isOpenAccount' | 'isOpenLanguage' | 'closeAll'

const useBoard = () => {

    const modalRef = useRef<HTMLDivElement>(null);

    const [languages, setLanguage] = useState<LanguageType>('Eng')
    const [parentActive, setParetntActive] = useState<PerentSideType>('CloseAll')
    const [dropdowns, setDropdowns] = useState({
        isOpenAccount: false,
        isOpenLanguage: false,
        isOpenDarkMode: false,
        isLightMode: true
    });

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            console.log('hallo')
            handleToggleDropdown('closeAll')
        }
    }
    const handleToggleDropdown = (dropdownName: dropdownName) => {
        setDropdowns(prevState => ({
            ...prevState,
            isOpenAccount: dropdownName === 'isOpenAccount' ? !prevState.isOpenAccount : false,
            isOpenLanguage: dropdownName === 'isOpenLanguage' ? !prevState.isOpenLanguage : false,
        }));
    };
    const handleLanguage = (language: LanguageType) => {
        setLanguage(language)
        handleToggleDropdown('closeAll')
    }
    const ParentActiveChange = (parent: PerentSideType) => {
        console.log(parent)
        setParetntActive(parent)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [parentActive]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setParetntActive('CloseAll')
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return {
        handleToggleDropdown,
        handleLanguage,
        ParentActiveChange,
        dropdowns,
        languages,
        parentActive,
        modalRef
    }
}

export default useBoard