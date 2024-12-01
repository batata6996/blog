document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login bem-sucedido!');
            window.localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            console.log('Erro no login:', data.error || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Erro ao tentar realizar o login:', error);
    }
});
