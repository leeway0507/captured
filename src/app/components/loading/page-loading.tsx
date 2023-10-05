import "./loading.css";
const PageLoading = () => {
    return (
        <div className="w-screen h-screen fixed top-0 right-0 z-50">
            <div className="w-full h-full bg-white flex-center">
                <div className="flex space-x-2 p-5 rounded-full justify-center items-center">
                    <div className="snippet" data-title="dot-pulse">
                        <div className="stage">
                            <div className="dot-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLoading;
