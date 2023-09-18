export default function Page() {
    const testArray = [
        "aaaa",
        "bbbb",
        "cccc",
        "dddd",
        "eeee",
        "ffff",
        "gggg",
        "hhhh",
        "iiii",
        "jjjj",
        "kkkk",
        "mmmmmm",
        "nnnnnn",
    ];
    return (
        <div className="w-screen" style={{ justifyContent: "center", display: "flex" }}>
            <div
                className="flex-wrap justify-start"
                style={{
                    backgroundColor: "gray",
                    display: "inline-flex",
                    flexWrap: "wrap",
                    width: "90%",
                    margin: "auto",
                }}>
                {testArray.map((item, index) => {
                    return (
                        <div className="text-3xl text-sub-black capitalize" key={index}>
                            {item}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
