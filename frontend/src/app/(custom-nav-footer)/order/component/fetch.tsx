export const checkAvailableSize = async (form: { form: string[]; sku: number[] }) => {
    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const req = await fetch(`${dynamicUrl}/api/check-size`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    });
    return await req.json();
};
