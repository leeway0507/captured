export const searchItems = async (keyword: string) => {
    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";
    const res = await fetch(`${dynamicUrl}/api/search?keyword=${keyword}`);
    return await res.json();
};
