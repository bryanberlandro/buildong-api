import validator from "validator";

const validatePassword = (password) => {
    let msg = ""
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < minLength) {
        return msg = 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
        return msg = 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
        return msg = 'Password must contain at least one lowercase letter';
    }
    if (!hasNumber) {
        return msg = 'Password must contain at least one number';
    }
    return msg;
};

const sanitization = (email, pw) => {
    return {
        email: validator.escape(validator.trim(email)),
        password: validator.trim(pw)
    }
}

const regValid = (email, pw) => {
    let msg = [];
    let data = sanitization(email, pw)
    const validPw = validatePassword(pw)

    if(validator.isEmpty(data.email)){
        msg.push("Email tidak boleh kosong")
    }
    if(!validator.isEmail(data.email)){
        msg.push("Email tidak valid")
    }
    if(validator.isEmpty(data.password)){
        msg.push("Password tidak boleh kosong")
    }
    if(!validator.isStrongPassword(data.password)){
        msg.push(validPw)
    }
    return {msg, data}
}

export default regValid;