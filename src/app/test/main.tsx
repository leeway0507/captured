import React from "react";

export default function Page() {
    interface dict {
        a: string;
        b: string;
    }

    const dict = { a: "hello", b: "world" };

    interface testProps {
        dict: dict;
    }

    const Test = (props: testProps) => {
        return (
            <div>
                {Object.entries(props.dict).map(([key, value]) => {
                    return (
                        <div key={key}>
                            {key} : {value}
                        </div>
                    );
                })}
            </div>
        );
    };

    return <Test dict={dict} />;
}
