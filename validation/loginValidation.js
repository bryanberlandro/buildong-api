import validator from "validator";

const sanitization = (email, pw) => {
    return {
        email: validator.escape(validator.trim(email)),
        password: validator.trim(pw)
    }
}

const loginValid = (email, pw) => {
    let msg = [];
    let data = sanitization(email, pw)

    if(validator.isEmpty(data.email)){
        msg.push("Nama tidak boleh kosong")
    }
    if(!validator.isEmail(data.email)){
        msg.push("Email tidak valid")
    }
    if(validator.isEmpty(data.password)){
        msg.push("Password tidak boleh kosong")
    }

    return {msg, data}
}

export default loginValid;