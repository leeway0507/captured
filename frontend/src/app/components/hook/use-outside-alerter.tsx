import { useEffect, useRef } from "react";

export function useOutsideAlerter(callBack: CallableFunction) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                callBack();
            }
        }
        // Bind the event listener
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseup", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
    return ref;
}
