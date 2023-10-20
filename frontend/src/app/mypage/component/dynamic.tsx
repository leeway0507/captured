import BaseModal from "@/app/components/modal/base-modal";

export const FailureModal = () => {
    const title = "변경 실패";
    const content = "비밀번호 변경에 실패하였습니다.";
    const checkColor = "red";
    const isOpen = true;
    const closeModal = () => {};

    const modalButton = (
        <button
            type="button"
            className={`rounded-md black-bar w-full ${
                checkColor === "red"
                    ? "bg-rose-700 text-light-gray"
                    : checkColor === "green" && "bg-green-600 text-light-gray"
            }}`}
            onClick={closeModal}>
            확인
        </button>
    );
    return <BaseModal title={title} content={content} closeModal={closeModal} isOpen={isOpen} button={modalButton} />;
};

export const SuccessModal = () => {
    const title = "변경 성공";
    const content = "비밀번호가 변경되었습니다.";
    const checkColor = "green";
    const isOpen = true;
    const closeModal = () => {};

    const modalButton = (
        <button
            type="button"
            className={`rounded-md black-bar w-full ${checkColor === "green" && "bg-green-600 text-light-gray"}}`}
            onClick={closeModal}>
            확인
        </button>
    );
    return <BaseModal title={title} content={content} closeModal={closeModal} isOpen={isOpen} button={modalButton} />;
};
