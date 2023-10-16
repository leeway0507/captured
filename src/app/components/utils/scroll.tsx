export const scrollToTop = (behavior: "auto" | "smooth" = "smooth") => {
    document.querySelector("#main-body")!.scrollTo({
        top: 0,
        behavior: behavior,
    });
};
