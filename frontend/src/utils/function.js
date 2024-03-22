import moment from "moment"


function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function formatDateWithMonthAndYear(appliedDate) {
    let date = moment(appliedDate)
    return moment(date).format('MMM D,YYYY');
    // return moment(date).format('MMMM D, YYYY');
}


export { generatePassword, formatDateWithMonthAndYear }