import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles/forms.css';
import './styles/pages.css';

function App() {
  const [activeForm, setActiveForm] = useState('login');

  return (
    <div className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Secure access</p>
          <h1>Welcome back.</h1>
          <p className="hero-copy">
            Choose the experience that matches your workflow. Everything is kept calm, modern, and
            focused on what matters—getting you signed in or onboarded quickly.
          </p>
        </div>
        <ul>
          <li>Friendly typography &amp; approachable colors</li>
          <li>Instant validation feedback</li>
          <li>Responsive layout for desktop &amp; mobile</li>
        </ul>
      </section>

      <section className="form-panel">
        <div className="form-toggle">
          <button
            className={activeForm === 'login' ? 'active' : ''}
            onClick={() => setActiveForm('login')}
            aria-label="Show login form"
          >
            Login
          </button>
          <button
            className={activeForm === 'register' ? 'active' : ''}
            onClick={() => setActiveForm('register')}
            aria-label="Show register form"
          >
            Register
          </button>
        </div>
        <div className="form-frame">
          {activeForm === 'login' ? (
            <LoginPage onSwitch={() => setActiveForm('register')} />
          ) : (
            <RegisterPage onSwitch={() => setActiveForm('login')} />
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
