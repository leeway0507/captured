export const CheckEmailAndNameProxy = async (email: string, name: string) => {
    const dynamicUrl = typeof window !== "undefined" ? window.location.origin : "http://127.0.0.1:3000";

    const res = await fetch(`${dynamicUrl}/api/check-email-and-name?email=${email}&name=${name}`);
    const data = await res.json();
    return data;
};
