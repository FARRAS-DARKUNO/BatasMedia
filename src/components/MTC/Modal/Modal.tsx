import React from "react";
import { PropsMessage, PropsParent } from "./Interface";

const Parent: React.FC<PropsParent> = ({
    isModalOpen,
    setIsModalOpen,
    title = '',
    buttonClose = true,
    styles = {
        width: undefined,
        roundSize: 'lg'
    },
    buttonPrimary = {
        isShow: true,
        title: 'Primary',
        action: undefined
    },
    buttonSecondary = {
        isShow: true,
        title: 'Secondary',
        action: undefined
    },
    children
}) => {

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const onClickPrimary = () => {
        if (buttonPrimary.action) {
            buttonPrimary.action()
        }
    }

    const onClickSecondary = () => {
        if (buttonSecondary.action) {
            buttonSecondary.action()
        }
    }

    return (
        <>
            {isModalOpen && (
                <div
                    id="default-modal"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-full max-h-full overflow-y-auto overflow-x-hidden"
                >
                    {/* Background Blur */}
                    <div className="absolute inset-0 bg-black bg-opacity-5 backdrop-blur-sm"></div>

                    <div className={`relative p-4 w-full ${styles.width ? 'max-w-' + styles.width : 'max-w-2xl'} max-h-full z-10`}>

                        <div className="relative bg-background-light rounded-lg shadow dark:bg-background-dark">

                            {(title || buttonClose) && (
                                <div className="flex items-center justify-between p-2 rounded-t">
                                    {title && (
                                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {title}
                                        </h4>
                                    )}
                                    {buttonClose && (
                                        <button
                                            type="button"
                                            onClick={toggleModal}
                                            className={`text-text-light dark:text-text-dark hover:bg-gray-200 hover:text-gray-900 
                                    bg-transparent rounded-${styles.roundSize} text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white`}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto">
                                {children}
                            </div>

                            {/* Modal footer */}
                            {(buttonPrimary.isShow || buttonSecondary.isShow) && (
                                <div className="flex items-center p-4 md:p-5 jus">
                                    {buttonPrimary.isShow && (
                                        <button
                                            onClick={onClickPrimary}
                                            type="button"
                                            className={`text-button-on_button dark:text-button-on_button_dark bg-button-primary dark:bg-button-primary_dark font-medium rounded-${styles.roundSize} text-sm px-5 py-2.5 text-center`}
                                        >
                                            {buttonPrimary.title}
                                        </button>
                                    )}
                                    {buttonSecondary.isShow && (
                                        <button
                                            onClick={onClickSecondary}
                                            type="button"
                                            className={`py-2.5 px-5 ms-3 text-sm font-medium text-text-light dark:text-text-dark bg-transparent rounded-${styles.roundSize} border  hover:bg-gray-100`}
                                        >
                                            {buttonSecondary.title}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const Message: React.FC<PropsMessage> = ({
    meesage
}) => {
    return (
        <p className="text-base leading-relaxed text-text-light dark:text-text-dark">
            {meesage}
        </p>
    )
}

const Modal = {
    Parent,
    Message
}

export default Modal;
