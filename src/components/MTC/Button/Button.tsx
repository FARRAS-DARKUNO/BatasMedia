import { ButtonType, RoundSize, Sizing, TypographySize } from "@/data/type"

export interface Props {
    title?: string
    onClick?: () => void
    isLoading?: boolean
    isDisable?: boolean
    buttonType?: ButtonType
    style?: {
        textSize?: TypographySize
        roundedSize?: RoundSize
        width?: Sizing
        spaceX?: number
        spaceY?: number
    }
}

const defaultData: Props = {
    title: "title",
    onClick: () => null,
    isLoading: false,
    isDisable: false,
    buttonType: 'button',
    style: {
        textSize: 'sm',
        roundedSize: 'full',
        width: 'full',
        spaceX: 0,
        spaceY: 0
    }
}

const Normal: React.FC<Props> = ({
    title = defaultData.title,
    onClick = defaultData.onClick,
    isLoading = defaultData.isLoading,
    isDisable = defaultData.isDisable,
    buttonType = defaultData.buttonType,
    style = defaultData.style,
}) => {
    return (
        <div className={`mx-${style?.spaceX} my-${style?.spaceY}`}>
            <button
                onClick={() => isDisable ? null : onClick!()}
                type={buttonType}
                className={`text-button-on_button dark:text-button-on_button_dark ${!isDisable ? 'bg-button-primary dark:bg-button-primary_dark hover:bg-secondary' : 'bg-button-disable hover:bg-button-disable'} 
                font-semibold rounded-${style?.roundedSize} text-${style?.textSize} px-5 py-2 w-${style?.width}`}
                disabled={isDisable}
            >
                {isLoading ? (
                    <>
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                        Loading...
                    </>
                ) : (
                    title
                )}
            </button>
        </div>
    );
};

const Gradation: React.FC<Props> = ({
    title = defaultData.title,
    onClick = defaultData.onClick,
    isLoading = defaultData.isLoading,
    isDisable = defaultData.isDisable,
    buttonType = defaultData.buttonType,
    style = defaultData.style,
}) => {
    return (
        <div className={`mx-${style?.spaceX} my-${style?.spaceY}`}>
            <button
               onClick={() => isDisable ? null : onClick!()}
                type={buttonType}
                disabled={isDisable}
                className={`text-button-on_button dark:text-button-on_button_dark bg-gradient-to-r from-button-primary to-button-secondary dark:from-button-primary_dark dark:to-button-secondary_dark hover:bg-gradient-to-bl  
                px-5 py-2  ${'rounded-' + style?.roundedSize} ${'text-' + style?.textSize} px-5 py-2 ${'w-' + style?.width} font-semibold`}
            >
                {
                    isLoading && (
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                    )
                }
                {isLoading ? 'Loading...' : title}
            </button>
        </div>
    )
}

const Neon: React.FC<Props> = ({
    title = defaultData.title,
    onClick = defaultData.onClick,
    isLoading = defaultData.isLoading,
    isDisable = defaultData.isDisable,
    buttonType = defaultData.buttonType,
    style = defaultData.style,
}) => {
    return (
        <div className={`mx-${style?.spaceX} my-${style?.spaceY}`}>
            <button
                onClick={() => isDisable ? null : onClick!()}
                type={buttonType}
                disabled={isDisable}
                className={`text-button-on_button dark:text-button-on_button_dark bg-gradient-to-r from-button-primary to-button-secondary dark:from-button-primary_dark dark:to-button-secondary_dark hover:bg-gradient-to-br  shadow-lg shadow-button-primary dark:shadow-button-primary_dark
                px-5 py-2 font-semibold ${'rounded-' + style?.roundedSize} ${'text-' + style?.textSize} px-5 py-2 ${'w-' + style?.width}`}
            >
                {
                    isLoading && (
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                    )
                }
                {isLoading ? 'Loading...' : title}
            </button>
        </div>
    )
}

const GradationBorder: React.FC<Props> = ({
    title = defaultData.title,
    onClick = defaultData.onClick,
    isLoading = defaultData.isLoading,
    isDisable = defaultData.isDisable,
    buttonType = defaultData.buttonType,
    style = defaultData.style,
}) => {
    return (
        <div className={`mx-${style?.spaceX} my-${style?.spaceY}`}>
            <button
                onClick={() => isDisable ? null : onClick!()}
                disabled={isDisable}
                type={buttonType}
                className={`inline-flex items-center justify-center p-0.5 overflow-hidden ${'text-' + style?.textSize} font-semibold ${'rounded-' + style?.roundedSize} ${'w-' + style?.width} 
                text-background-dark dark:text-background-light group bg-gradient-to-r from-button-primary to-button-secondary dark:from-button-primary_dark dark:to-button-secondary_dark group-hover:from-button-primary group-hover:to-button-secondary dark:group-hover:from-button-primary dark:group-hover:to-button-secondary  `}
            >
                <span className={`px-5 py-2.5 transition-all ease-in duration-75 bg-background-light dark:bg-background-dark ${'rounded-' + style?.roundedSize} group-hover:bg-opacity-0 ${'w-' + style?.width}`}>
                    {
                        isLoading && (
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        )
                    }
                    {isLoading ? 'Loading...' : title}
                </span>
            </button>
        </div>
    )
}


const Button = {
    Normal,
    Gradation,
    GradationBorder,
    Neon
}

export default Button