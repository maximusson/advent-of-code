const isValid = (password) => {
    let pairs = [0,0,0,0,0,0,0,0,0,0];
    for (let i = 1; i < password.length; i++) {
        cur = parseInt(password.charAt(i));
        last = parseInt(password.charAt(i-1));
        if (cur < last) {
            return false;
        }
        if (last === cur) {
            pairs[cur]++;
        }
    }

    if (pairs.includes(1)) {
        return true;
    } else {
        return false;
    }
}

let count = 0;
for (let j = 147981; j <= 691423; j++) {
    if (isValid(String(j))) {
        count++;
    }
}

console.log(count);
