async function authenticateUser(email, password) {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.message || 
                (response.status === 401 ? 'Email ou senha incorretos.' :
                response.status === 404 ? 'Usuário não encontrado.' : 
                'Erro ao autenticar usuário.');
            throw new Error(errorMessage);
        }

        localStorage.setItem('authToken', data.token);
        console.log('Autenticação bem-sucedida:', data);

        window.parent.postMessage({ type: 'loginSuccess' }, '*');

        return data;
    } catch (error) {
        console.error('Erro na autenticação:', error.message);
        alert(error.message); 
        throw error; 
    }
}

export default authenticateUser;
