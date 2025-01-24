// app.js

const passwordManager = {};

function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    });
}

function createAccount() {
    const username = document.getElementById('create-username').value;
    const password = document.getElementById('create-password').value;

    hashPassword(password).then(hashedPassword => {
        passwordManager[username] = hashedPassword;
        document.getElementById('message').textContent = 'Account created successfully!';
        document.getElementById('create-username').value = '';
        document.getElementById('create-password').value = '';
    });
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    hashPassword(password).then(hashedPassword => {
        if (passwordManager[username] === hashedPassword) {
            document.getElementById('message').textContent = 'Login successful!';
        } else {
            document.getElementById('message').textContent = 'Invalid username or password';
        }
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
    });
}

function toggleForm() {
    const createForm = document.getElementById('create-account-form');
    const loginForm = document.getElementById('login-form');

    if (createForm.style.display === 'none') {
        createForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        createForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}
