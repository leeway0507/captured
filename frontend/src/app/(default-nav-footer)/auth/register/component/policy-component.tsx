const PolicyComponent = ({ policy, setClosePolicy }: { policy: JSX.Element; setClosePolicy: () => void }) => {
    return (
        <div className="fixed top-0 left-0 right-0 mx-auto bg-white max-w-screen overflow-auto border rounded-lg scroll-bar h-full z-50 px-4 pt-8 pb-16">
            <div className="max-w-2xl m-auto">
                <button className="flex-left text-xl font-bold py-4" onClick={setClosePolicy}>
                    ❮
                </button>
                {policy}
            </div>
        </div>
    );
};

export default PolicyComponent;
