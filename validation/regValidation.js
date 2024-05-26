import validator from "validator";

const validatePassword = (password) => {
    let msg = ""
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return msg = 'Password harus terdiri dari minimal 8 karakter.';
    }
    if (!hasUpperCase) {
        return msg = 'Password harus mengandung setidaknya satu huruf besar.';
    }
    if (!hasLowerCase) {
        return msg = 'Password harus mengandung setidaknya satu huruf kecil.';
    }
    if (!hasNumber) {
        return msg = 'Password harus mengandung setidaknya satu angka.';
    }
    if (!hasSpecialChar) {
        return msg = 'Password harus mengandung setidaknya satu simbol khusus.';
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
        msg.push("Nama tidak boleh kosong")
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