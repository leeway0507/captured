export const CheckEmailAndName = async (email: string, name: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-email-and-name?email=${email}&name=${name}`
    );
    const data = await res.json();
    return data;
};
