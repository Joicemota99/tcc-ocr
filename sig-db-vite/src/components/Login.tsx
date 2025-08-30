import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('joicemota98');
  const [senha, setSenha] = useState('');
  const [lembrarMe, setLembrarMe] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    
    // Simulação de login
    setTimeout(() => {
      setCarregando(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="tela-login min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-4">
      <div className="container-login bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        
        {/* Cabeçalho */}
        <div className="cabecalho-login text-center mb-8">
          <h1 className="titulo-sistema text-3xl font-bold text-gray-800 mb-2">SIG-DB</h1>
          <h2 className="subtitulo-login text-xl font-semibold text-gray-700">
            SISTEMA DE GESTÃO - LOGIN
          </h2>
        </div>

        {/* Formulário */}
        <form className="formulario-login space-y-6" onSubmit={handleSubmit}>
          
          {/* Campo E-mail */}
          <div className="campo-email">
            <label htmlFor="email" className="rotulo-campo block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-email w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={carregando}
            />
          </div>

          {/* Campo Senha */}
          <div className="campo-senha">
            <label htmlFor="senha" className="rotulo-campo block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              required
              className="input-senha w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={carregando}
            />
          </div>

          {/* Opções de Login */}
          <div className="opcoes-login flex items-center justify-between">
            <div className="lembrar-me flex items-center">
              <input
                id="lembrar-me"
                name="lembrar-me"
                type="checkbox"
                className="checkbox-lembrar h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={lembrarMe}
                onChange={(e) => setLembrarMe(e.target.checked)}
                disabled={carregando}
              />
              <label htmlFor="lembrar-me" className="rotulo-lembrar ml-2 block text-sm text-gray-900">
                Lembrar-me
              </label>
            </div>

            <a
              href="#"
              className="esqueci-senha text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Esqueci minha senha
            </a>
          </div>

          {/* Botão de Entrar */}
          <button
            type="submit"
            disabled={carregando}
            className="botao-entrar w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {carregando ? 'ENTRANDO...' : 'ENTRAR'}
          </button>
        </form>

        {/* Rodapé */}
        <div className="rodape-login mt-8 text-center">
          <p className="texto-rodape text-sm text-gray-600">
            © 2024 SIG-DB. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}