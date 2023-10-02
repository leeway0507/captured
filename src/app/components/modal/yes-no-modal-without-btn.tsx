import BaseModal from "./base-modal";

interface modalProps {
    title: string;
    content: string | JSX.Element;
    trueCallback: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function YesNoModalWithoutBtn({ title, content, trueCallback, isOpen, setIsOpen }: modalProps) {
    function closeModal() {
        setIsOpen(false);
    }

    function clickYes() {
        trueCallback();
        setIsOpen(false);
    }

    const modalButton = (
        <>
            <button type="button" className="black-bar-modal px-6 py-2" onClick={clickYes}>
                예
            </button>
            <button
                type="button"
                className="bg-light-gray px-4 py-2 active:text-deep-gray active:bg-gray-200 rounded-lg"
                onClick={closeModal}>
                아니오
            </button>
        </>
    );

    return (
        <>
            <BaseModal title={title} content={content} closeModal={closeModal} isOpen={isOpen} button={modalButton} />
        </>
    );
}
