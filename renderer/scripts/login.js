document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Login bem-sucedido!');
        window.localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } else {
        alert(data.error || 'Erro no login');
    }
});
