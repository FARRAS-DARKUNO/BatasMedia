import Icon from '../Icon';
import { dropdownName } from '@/helpers/useBoard';
import MenusBar from '../SideBar/MenusBar';
import { LanguageType, PerentSideType } from '@/data/type';

interface HeaderBoardProps {
    handleDarkMode: () => void;
    handleToggleDropdown: (dropdownName: dropdownName) => void;
    handleLanguage: (language: LanguageType) => void;
    dropdowns: {
        isOpenAccount: boolean;
        isOpenLanguage: boolean;
        isOpenDarkMode: boolean;
    };
    languages: LanguageType
    modalRef: React.RefObject<HTMLDivElement | null>
    ParentActiveChange: (parent: PerentSideType) => void;
    parentActive: PerentSideType
}

const HeaderBoard: React.FC<HeaderBoardProps> = ({
    handleDarkMode,
    handleToggleDropdown,
    handleLanguage,
    ParentActiveChange,
    dropdowns,
    languages,
    modalRef,
    parentActive
}) => {
    return (
        <>
            <header className="flex fixed top-0 left-0 w-full bg-secondary  p-3 items-center justify-between h-[64px] z-50">
                <div className='flex items-center gap-7'>
                    <button
                        onClick={() => ParentActiveChange(parentActive == 'Menus-Mini-ON' ? 'CloseAll' : 'Menus-Mini-ON')}
                        className="p-2 text-gray-400 bg-tertiary-light rounded-lg shadow-md hover:bg-primary-light lg:hidden"
                    >
                        <Icon name='FaBarsStaggered' color='#ffffff' />
                    </button>
                    <img src="/logo.png" alt="logo mandiri" className="h-16" />
                    <h1 className='font-semibold text-background-light'>BAKTI MEDIA DASHBOARD</h1>
                </div>
                <div className="flex flex-row-reverse items-center gap-7 lg:hidden">
                    <button
                        onClick={() => ParentActiveChange(parentActive == 'Settings-Mini-ON' ? 'CloseAll' : 'Settings-Mini-ON')}
                        className="p-2  text-gray-400 bg-tertiary-light rounded-lg shadow-md hover:bg-primary-light "
                    >
                        <Icon name='FaSliders' color='#ffffff' />
                    </button>
                    <button
                        onClick={() => ParentActiveChange(parentActive == 'Notification-Mini-ON' ? 'CloseAll' : 'Notification-Mini-ON')}
                        className="p-2  text-gray-400 bg-tertiary-light rounded-lg shadow-md hover:bg-primary-light "
                    >
                        <Icon name='FaBell' color='#ffffff' />
                    </button>
                </div>
                <div className="flex flex-row-reverse items-center gap-7 max-lg:hidden" >
                    <div id='Profile' >
                        <button className="flex items-center gap-2 m-0 p-0 bg-transparent hover:bg-transparent" id="avatarButton" onClick={() => handleToggleDropdown('isOpenAccount')} typeof="button" >
                            <img className="w-10 h-10 rounded-full" src="./public/pp.jpg" alt="" />
                            <div id="Profile Info">
                                <h6 className='text-left text-text-dark' >Jese Leos</h6>
                                <p className="text-sm text-gray-500 ">Web Developer</p>
                            </div>
                        </button>
                        {dropdowns.isOpenAccount && (
                            <div ref={modalRef} id="userDropdown" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 top-14">
                                <div className="px-4 py-3 text-sm text-gray-900">
                                    <div>Bonnie Green</div>
                                    <div className="font-medium">name@flowbite.com</div>
                                </div>
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            window.location.href = "/login";
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </header>
            {parentActive != 'Menus-ON' && <MenusBar parentActive={parentActive} />}
        </>
    )
}

export default HeaderBoard