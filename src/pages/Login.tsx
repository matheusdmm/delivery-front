import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase.config';

const imgBg =
  'https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg';

const logo =
  'https://img.freepik.com/vetores-premium/modelo-de-vetor-de-design-de-logotipo-de-entrega-expressa_441059-204.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log('Login OK:', data);
      navigate('/orders');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error, data } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log('Registro OK:', data);
      navigate('/orders');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgBg})` }}
      ></div>

      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-pink-100 via-indigo-100 to-blue-100 p-8">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          {<img src={logo} alt="Logo" className="mb-6 w-32 h-auto mx-auto" />}

          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            {isRegistering ? 'Cadastre-se' : 'Login'}
          </h2>

          <form
            onSubmit={isRegistering ? handleRegister : handleLogin}
            className="w-full"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mb-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              {isRegistering ? 'Criar Conta' : 'Entrar'}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500 text-center">
            {isRegistering ? (
              <>
                Já tem uma conta?{' '}
                <button
                  onClick={() => setIsRegistering(false)}
                  className="text-indigo-500 hover:text-indigo-600"
                >
                  Faça login
                </button>
              </>
            ) : (
              <>
                Não tem uma conta?{' '}
                <button
                  onClick={() => setIsRegistering(true)}
                  className="text-indigo-500 hover:text-indigo-600"
                >
                  Cadastre-se
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
