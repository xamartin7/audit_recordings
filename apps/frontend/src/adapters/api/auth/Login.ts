export function login(email: string, password: string) {
    return fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    })
}
