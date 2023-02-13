import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginForm } from '../../types/domain/LoginForm';
import { isInvalidCredentialsError, requestBackendLogin } from '../../util/request';
import { saveAuthData } from '../../util/storage';
import HomeImage from '../../assets/imgs/home-banner.svg';

import './styles.css';
import AuthContext, { AuthContextType } from '../../contexts/AuthProvider/context';
import { getTokenData } from '../../util/auth';


const Login = () => {

  const [error, setError] = useState<string>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [wasSubmit, setWasSubmit] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const navigate = useNavigate();
  const { authContextData, setAuthContextData } = useContext<AuthContextType>(AuthContext);

  const onSubmit = (loginForm: LoginForm) => {
    console.log('loginForm', loginForm);
    setIsloading(true);
    requestBackendLogin(loginForm)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData()
        });
        toast.success('Login with success');
        navigate('movies');
      })
      .catch((e) => {
        console.log(e);
        toast.error('Error in login');
        setWasSubmit(false);
        if(isInvalidCredentialsError(e)) {
          setError('Usuário ou senha inválidos');
        }
        else {
          setError('Erro inesperado no login, por favor, tente novamente');
        }
      })
      .finally(() => setIsloading(false));

  }

  return (
    <div className="container p-2 p-sm-3" id="login-page-container">
      <div className="row h-100">
        <div className="col-12 px-5 col-lg-6 d-none d-lg-block">
          <div className="px-5">
            <h1 className="my-5 fw-bold">Avalie Filmes</h1>
            <p className="fourth-color mb-5">Diga o que você achou do seu<br />filme favorito</p>
          </div>
          <img src={ HomeImage } alt="Home Banner" className="img-fluid" />
        </div>
        <div className="col-12 col-lg-6">
          <div className="base-card px-3 px-sm-4 px-md-5">
            <h2 className="mb-5 text-center">Login</h2>
            { error && (
              <div className="alert alert-danger py-2" role="alert">
                { error }
              </div>

            )}
            <form onSubmit={handleSubmit(onSubmit)} id="login-form">
              <div className="mb-3">
                <input
                  { ...register('username', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  }) }
                  type="email"
                  id="username"
                  name="username"
                  className={`form-control ${wasSubmit ? (errors.username ? 'is-invalid' : 'is-valid') : ''}`}
                  placeholder="Email"
                />
                <div className="invalid-feedback d-block">
                  { errors.username?.message }
                </div>
              </div>
              <div className="mb-5">
                <input
                  { ...register('password', {
                    required: 'Campo obrigatório',
                    minLength: {
                      value: 6,
                      message: 'Senha deve possuir pelo menos 6 caracteres'
                    }
                  }) }
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${wasSubmit ? (errors.password ? 'is-invalid' : 'is-valid') : ''}`}
                  placeholder="Senha"
                />
                <div className="invalid-feedback d-block">
                  { errors.password?.message }
                </div>
              </div>
              <button className="btn base-btn" type="submit" onClick={() => setWasSubmit(true)}>Fazer login
              { isLoading && (
                <div className="ms-2 spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
