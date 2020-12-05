const isValid = (password) => {
    let pair = false;
    for (let i = 1; i < password.length; i++) {
        cur = parseInt(password.charAt(i));
        last = parseInt(password.charAt(i-1));
        if (cur < last) {
            return false;
        }
        if (cur === last) {
            pair = true;
        }
    }   
    if (!pair) {
        return false;
    }
    return true;
}

let count = 0;
for (let j = 147981; j <= 691423; j++) {
    if (isValid(String(j))) {
        count++;
    }
}

console.log(count);
