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
        msg.push("Please enter your email address")
    }
    if(!validator.isEmail(data.email)){
        msg.push("Please enter a valid email address")
    }
    if(validator.isEmpty(data.password)){
        msg.push("Please enter your password")
    }

    return {msg, data}
}

export default loginValid;