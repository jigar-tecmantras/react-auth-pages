import { useState } from 'react';
import FormField from '../components/FormField';
import { isValidEmail, isStrongPassword } from '../utils/validators';

const RegisterPage = ({ onSwitch }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleChange = (field) => (event) => {
    const value = field === 'terms' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!isValidEmail(form.email)) {
      nextErrors.email = 'Please use a valid email address.';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required.';
    } else if (!isStrongPassword(form.password)) {
      nextErrors.password = 'Password needs at least 8 characters.';
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!form.terms) {
      nextErrors.terms = 'You must agree to the terms.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStatus('All set! Your account is ready to go (mock).');
    } else {
      setStatus('');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className="form-head">
        <h2>Create account</h2>
        <p>Start with an invitation-free onboarding.</p>
      </div>

      <FormField
        id="register-name"
        label="Full name"
        type="text"
        value={form.fullName}
        onChange={handleChange('fullName')}
        placeholder="Jane Doe"
        error={errors.fullName}
        required
      />

      <FormField
        id="register-email"
        label="Email"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
        placeholder="you@email.com"
        error={errors.email}
        required
      />

      <FormField
        id="register-password"
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange('password')}
        placeholder="At least 8 characters"
        error={errors.password}
        required
      />

      <FormField
        id="register-confirm"
        label="Confirm password"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange('confirmPassword')}
        placeholder="Repeat your password"
        error={errors.confirmPassword}
        required
      />

      <FormField
        id="terms"
        label="I agree to the privacy policy and terms"
        type="checkbox"
        checked={form.terms}
        onChange={handleChange('terms')}
        error={errors.terms}
      />

      <div className="form-actions">
        <button type="submit" className="primary">
          Create account
        </button>
      </div>

      {status && <p className="status success">{status}</p>}

      <p className="form-foot">
        Already have an account?{' '}
        <button type="button" className="link-button" onClick={onSwitch}>
          Sign in instead
        </button>
      </p>
    </form>
  );
};

export default RegisterPage;
