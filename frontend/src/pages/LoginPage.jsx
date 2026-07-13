import { useState } from 'react';
import FormField from '../components/FormField';
import { isValidEmail, isStrongPassword } from '../utils/validators';

const LoginPage = ({ onSwitch }) => {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (field) => (event) => {
    const value = field === 'remember' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = 'Please use a valid email address.';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.';
    } else if (!isStrongPassword(form.password)) {
      nextErrors.password = 'Use at least 8 characters for your password.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStatus('Welcome back! You are signed in (mock).');
    } else {
      setStatus('');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-head">
        <h2>Login</h2>
        <p>Enter your credentials to continue.</p>
      </div>

      <FormField
        id="login-email"
        label="Email address"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
        placeholder="you@email.com"
        error={errors.email}
        required
      />

      <FormField
        id="login-password"
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange('password')}
        placeholder="••••••••"
        error={errors.password}
        required
      />

      <FormField
        id="remember"
        label="Remember me"
        type="checkbox"
        checked={form.remember}
        onChange={handleChange('remember')}
      />

      <div className="form-actions">
        <button type="submit" className="primary">
          Sign in
        </button>
      </div>

      {status && <p className="status success">{status}</p>}

      <p className="form-foot">
        New here?{' '}
        <button type="button" className="link-button" onClick={onSwitch}>
          Create an account
        </button>
      </p>
    </form>
  );
};

export default LoginPage;
