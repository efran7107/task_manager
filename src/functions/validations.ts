export const isEmail = (email: string) => {
    const check = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return check.test(email);
}

export const isName = (name: string) => {
    const check = /d/;
    const hasDidget = check.test(name);
    if(!hasDidget && name.trim().length > 2) return true;
    else return false;
}

export const isMatch = (password: string, confirm: string) => {
    const whiteSpaces = /\s+/;
    if(whiteSpaces.test(password) && whiteSpaces.test(confirm)) return false;
    else if(password !== confirm) return false;
    else return true;
}