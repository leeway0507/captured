export const checkPasswordPolicy = (password: string) => {
    if (password.length === 0) {
        return true;
    }
    if (password.length < 8) {
        return false;
    }
    // Check if password contains at least one digit and one letter
    const hasDigit = /[0-9]/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);

    if (!hasDigit || !hasLetter) {
        return false;
    }
    return true;
};

export const checkPasswordAgain = (password1: string, password2: string) => {
    if (password1.length === 0 || password2.length === 0) {
        return true;
    }
    if (password1 !== password2) {
        return false;
    }
    return true;
};

export const checkEmail = (email: string) => {
    if (email.length === 0) {
        return true;
    }
    // Regular expression for basic email validation
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    return regex.test(email);
};

export const checkName = (name: string) => {
    const hasHan = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(name);
    const notFullhan = /[ㄱ-ㅎ|ㅏ-ㅣ]/.test(name);

    if (name.length === 0) {
        return true;
    }

    if (notFullhan) {
        return false;
    }

    if (hasHan && name.length >= 2) {
        return true;
    }
    return false;
};
