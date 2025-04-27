import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase.config';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';

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

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        console.log(session);
        console.info('Seção confirmada, redirecionando...');
        navigate('/orders');
      }
    };

    checkSession();
  }, [navigate]);

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
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src={logo} alt="Logo" className="mb-2 w-32 h-auto mx-auto" />
            <CardTitle className="text-2xl">
              {isRegistering ? 'Cadastre-se' : 'Login'}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={isRegistering ? handleRegister : handleLogin}
              className="space-y-4"
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button className="w-full" type="submit">
                {isRegistering ? 'Criar Conta' : 'Entrar'}
              </Button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-500">
              {isRegistering ? (
                <>
                  Já tem uma conta?{' '}
                  <button
                    onClick={() => setIsRegistering(false)}
                    className="text-indigo-500 hover:underline"
                  >
                    Faça login
                  </button>
                </>
              ) : (
                <>
                  Não tem uma conta?{' '}
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="text-indigo-500 hover:underline"
                  >
                    Cadastre-se
                  </button>
                </>
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
