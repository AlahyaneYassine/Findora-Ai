import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    bio: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const [emailData, setEmailData] = useState({
    currentEmail: '',
    newEmail: ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: ''
  });

  const [deleteData, setDeleteData] = useState({
    email: ''
  });

  // Purchases state
  const [purchases, setPurchases] = useState([]);
  const [purchasesLoading, setPurchasesLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage({ text: 'Please login first', type: 'error' });
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setProfile(res.data);

        // Vérifier si l'utilisateur est bloqué (champ blockedUntil dans la réponse)
        if (res.data.blockedUntil) {
          const blockedUntilDate = new Date(res.data.blockedUntil);
          const now = new Date();

          if (blockedUntilDate > now) {
            const diffMs = blockedUntilDate - now;
            const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
            setMessage({
              text: `Votre compte est bloqué pour encore ${diffDays} jour(s).`,
              type: 'error'
            });
          }
        }

        // Initialiser les champs du formulaire avec les données reçues
        setFormData({
          firstName: res.data.firstName || '',
          lastName: res.data.lastName || '',
          address: res.data.address || '',
          phone: res.data.phone || '',
          bio: res.data.bio || ''
        });

        setEmailData({
          currentEmail: res.data.user?.email || '',
          newEmail: ''
        });
      } catch (err) {
        console.error(err);
        setMessage({ text: 'Failed to load profile', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // Fetch purchases when purchases tab is active
  useEffect(() => {
    if (activeTab === 'purchases' && token) {
      const fetchPurchases = async () => {
        setPurchasesLoading(true);
        try {
          const res = await axios.get('/api/purchases/my-purchases', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setPurchases(Array.isArray(res.data.purchases) ? res.data.purchases : []);
        } catch (err) {
          setMessage({ text: 'Failed to load purchases', type: 'error' });
        } finally {
          setPurchasesLoading(false);
        }
      };

      fetchPurchases();
    }
  }, [activeTab, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    if (avatar) data.append('avatar', avatar);

    try {
      const res = await axios.put('/api/profile/update', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile(res.data);
      setMessage({ text: 'Profile updated successfully', type: 'success' });
    } catch (err) {
      console.error(err);
      setMessage({ text: err.response?.data?.msg || 'Failed to update', type: 'error' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    if (!emailData.newEmail) {
      return setMessage({ text: 'Please enter new email', type: 'error' });
    }
    try {
      await axios.put('/api/profile/change-email', emailData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ text: 'Email updated successfully', type: 'success' });
      setEmailData(prev => ({ ...prev, newEmail: '' }));
    } catch (err) {
      setMessage({ text: err.response?.data?.msg || 'Failed to update email', type: 'error' });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!passwordData.newPassword) {
      return setMessage({ text: 'Please enter new password', type: 'error' });
    }
    try {
      await axios.put('/api/profile/change-password', passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ text: 'Password updated successfully', type: 'success' });
      setPasswordData({ newPassword: '' });
    } catch (err) {
      setMessage({ text: err.response?.data?.msg || 'Failed to update password', type: 'error' });
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (!deleteData.email) {
      return setMessage({ text: 'Please enter your email', type: 'error' });
    }
    try {
      await axios.delete('/api/profile/delete', {
        headers: { Authorization: `Bearer ${token}` },
        data: deleteData
      });
      setMessage({ text: 'Account deleted successfully', type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.msg || 'Failed to delete account', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <Link to="/profile" className={styles.logoLink}>
          <div className={styles.logo}>Findora</div>
        </Link>
        <div className={styles.navLinks}>
          <Link to="/home" className={styles.navLink}>Home</Link>
          <Link to="/how-it-works" className={styles.navLink}>How It Works</Link>
          <Link to="/features" className={styles.navLink}>Features</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </div>
      </nav>

      <div className={styles.pageContainer}>
        <h2 className={styles.sectionTitle}>My Profile</h2>

        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === 'profile' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'email' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('email')}
          >
            Email
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'password' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>

          <button
            className={`${styles.tabButton} ${activeTab === 'delete' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('delete')}
          >
            Danger Zone
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* Profile Info Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className={styles.formSection}>
              <h3>Profile Information</h3>

              <div className={styles.avatarContainer}>
                {profile?.avatar ? (
                  <img
                    src={`http://localhost:5000/uploads/${profile.avatar}?t=${Date.now()}`}
                    alt="Profile"
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
                <label className={styles.fileInputLabel}>
                  Change Avatar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                </label>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className={styles.textareaField}
                  rows={3}
                />
              </div>

              <button type="submit" disabled={submitLoading} className={styles.submitButton}>
                {submitLoading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          )}

          {/* Email Change Tab */}
          {activeTab === 'email' && (
            <form onSubmit={handleEmailChange} className={styles.formSection}>
              <h3>Change Email</h3>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Current Email</label>
                <input
                  type="email"
                  name="currentEmail"
                  value={emailData.currentEmail}
                  onChange={(e) => setEmailData({ ...emailData, currentEmail: e.target.value })}
                  disabled
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>New Email</label>
                <input
                  type="email"
                  name="newEmail"
                  value={emailData.newEmail}
                  onChange={(e) => setEmailData({ ...emailData, newEmail: e.target.value })}
                  className={styles.inputField}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Update Email
              </button>
            </form>
          )}

          {/* Password Change Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordChange} className={styles.formSection}>
              <h3>Change Password</h3>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ newPassword: e.target.value })}
                  className={styles.inputField}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Update Password
              </button>
            </form>
          )}

    
          {/* Danger Zone Tab */}
          {activeTab === 'delete' && (
            <form onSubmit={handleDeleteAccount} className={styles.formSection}>
              <h3>Delete Account</h3>
              <p>This action is irreversible. Please enter your email to confirm.</p>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={deleteData.email}
                  onChange={(e) => setDeleteData({ email: e.target.value })}
                  className={styles.inputField}
                  required
                />
              </div>

              <button type="submit" className={styles.dangerButton}>
                Delete My Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;