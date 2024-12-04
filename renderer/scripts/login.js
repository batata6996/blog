async function authenticateUser(email, password) {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Adiciona mensagens específicas com base no status HTTP
            const errorMessage = data.message || 
                (response.status === 401 ? 'Email ou senha incorretos.' :
                response.status === 404 ? 'Usuário não encontrado.' : 
                'Erro ao autenticar usuário.');
            throw new Error(errorMessage);
        }

        // Salvar token no localStorage
        localStorage.setItem('authToken', data.token);
        console.log('Autenticação bem-sucedida:', data);

        // Enviar evento para o pai, se necessário
        window.parent.postMessage({ type: 'loginSuccess' }, '*');

        return data;
    } catch (error) {
        console.error('Erro na autenticação:', error.message);
        alert(error.message); // Mostra mensagem para o usuário
        throw error; // Repassa o erro se necessário
    }
}

export default authenticateUser;
