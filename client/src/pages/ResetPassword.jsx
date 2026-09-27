import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
  margin: auto;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h2`
  color: #2d3748;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #718096;
  text-align: center;
  margin-bottom: 32px;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  outline: none;
  
  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  }
  
  &:hover {
    border-color: #c7d2fe;
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #6366f1;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s;
  
  &:hover {
    background: #4f46e5;
  }
  
  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }
`;

const Message = styled(motion.div)`
  margin-top: 20px;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SuccessMessage = styled(Message)`
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #86efac;
`;

const ErrorMessage = styled(Message)`
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fca5a5;
`;

const PasswordStrength = styled.div`
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
`;

const StrengthBar = styled(motion.div)`
  height: 100%;
  background: ${props => {
    if (props.strength === 'weak') return '#ef4444';
    if (props.strength === 'medium') return '#f59e0b';
    return '#10b981';
  }};
  width: ${props => {
    if (props.strength === 'weak') return '33%';
    if (props.strength === 'medium') return '66%';
    return '100%';
  }};
`;

const RequirementList = styled(motion.div)`
  overflow: hidden;
  margin-bottom: 16px;
  font-size: 14px;
  color: #4a5568;
`;

const RequirementItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  list-style: none;
  padding-left: 0;
`;

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Récupère le token de l'URL
  const token = new URLSearchParams(location.search).get('token');

  // Vérifie la force du mot de passe
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength('');
      return;
    }

    const hasLength = newPassword.length >= 8;
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    setRequirements({
      length: hasLength,
      uppercase: hasUppercase,
      number: hasNumber,
      specialChar: hasSpecialChar,
    });

    const metRequirements = [hasLength, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length;

    if (metRequirements === 0) {
      setPasswordStrength('');
    } else if (metRequirements < 2) {
      setPasswordStrength('weak');
    } else if (metRequirements < 4) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  }, [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Le lien de réinitialisation est invalide. Veuillez demander un nouveau lien.");
      return;
    }

    if (passwordStrength !== 'strong') {
      setError("Votre mot de passe doit être plus fort.");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        newPassword,
      });

      setMessage(res.data.msg || "Votre mot de passe a été réinitialisé avec succès !");
      
      setTimeout(() => {
        navigate('/login', { state: { fromPasswordReset: true } });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Réinitialiser votre mot de passe</Title>
        <Subtitle>Entrez votre nouveau mot de passe sécurisé</Subtitle>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Icon>
              <FiLock size={20} />
            </Icon>
            <Input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
              required
            />
            <ToggleButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </ToggleButton>
            
            {newPassword && (
              <PasswordStrength>
                <StrengthBar 
                  strength={passwordStrength}
                  initial={{ width: 0 }}
                  animate={{ width: passwordStrength === 'weak' ? '33%' : passwordStrength === 'medium' ? '66%' : '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </PasswordStrength>
            )}
          </InputGroup>

          {newPassword && (
            <RequirementList
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{ marginBottom: '8px' }}>Votre mot de passe doit contenir :</p>
              <ul style={{ margin: 0, padding: 0 }}>
                <RequirementItem>
                  {requirements.length ? <FiCheckCircle color="#10b981" /> : <FiAlertCircle color="#a0aec0" />}
                  <span style={{ color: requirements.length ? '#10b981' : '#a0aec0' }}>Minimum 8 caractères</span>
                </RequirementItem>
                <RequirementItem>
                  {requirements.uppercase ? <FiCheckCircle color="#10b981" /> : <FiAlertCircle color="#a0aec0" />}
                  <span style={{ color: requirements.uppercase ? '#10b981' : '#a0aec0' }}>Au moins une majuscule</span>
                </RequirementItem>
                <RequirementItem>
                  {requirements.number ? <FiCheckCircle color="#10b981" /> : <FiAlertCircle color="#a0aec0" />}
                  <span style={{ color: requirements.number ? '#10b981' : '#a0aec0' }}>Au moins un chiffre</span>
                </RequirementItem>
                <RequirementItem>
                  {requirements.specialChar ? <FiCheckCircle color="#10b981" /> : <FiAlertCircle color="#a0aec0" />}
                  <span style={{ color: requirements.specialChar ? '#10b981' : '#a0aec0' }}>Au moins un caractère spécial</span>
                </RequirementItem>
              </ul>
            </RequirementList>
          )}

          <Button
            type="submit"
            disabled={loading || passwordStrength !== 'strong'}
            whileTap={{ scale: 0.98 }}
            whileHover={!loading && passwordStrength === 'strong' ? { scale: 1.02 } : {}}
          >
            {loading ? (
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 38 38"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#fff"
                >
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)" strokeWidth="2">
                      <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                      <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 18 18"
                          to="360 18 18"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  </g>
                </svg>
                En cours...
              </>
            ) : (
              "Réinitialiser le mot de passe"
            )}
          </Button>
        </form>

        {message && (
          <SuccessMessage
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiCheckCircle size={20} />
            <span>{message}</span>
          </SuccessMessage>
        )}

        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiAlertCircle size={20} />
            <span>{error}</span>
          </ErrorMessage>
        )}
      </Card>
    </Container>
  );
};

export default ResetPassword;