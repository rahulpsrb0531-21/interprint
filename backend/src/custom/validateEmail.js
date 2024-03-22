export function validateEmail(email) {
    const emailRegex = /^[\w-\.]+@(gmail|yahoo|hotmail)\.(com|net|org)$/i;
    return emailRegex.test(email);
}