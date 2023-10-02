import Image from "next/image";
import "./loading.css";
const PageLoading = () => {
    return (
        <div className="h-[100vh] flex-center">
            <div className="flex-center flex-col gap-8">
                <div className="bg-white flex space-x-2 p-5 rounded-full justify-center items-center">
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
