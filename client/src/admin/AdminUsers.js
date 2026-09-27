import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ email: '', role: '', isBlocked: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const params = {
        page,
        limit: 10,
        ...filters,
      };
      // Ne pas envoyer les filtres vides
      Object.keys(params).forEach(key => {
        if (params[key] === '') delete params[key];
      });

      const res = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setPage(1); // reset page si filtre change
  };

  return (
    <div>
      <h2>Gestion des Utilisateurs</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="email"
          placeholder="Rechercher par email"
          value={filters.email}
          onChange={handleFilterChange}
        />
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="">Tous rôles</option>
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>
        <select name="isBlocked" value={filters.isBlocked} onChange={handleFilterChange}>
          <option value="">Tous statuts</option>
          <option value="false">Non bloqué</option>
          <option value="true">Bloqué</option>
        </select>
      </div>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Rôle</th>
            <th>Bloqué</th>
            <th>Messages</th>
            <th>Sélections</th>
            <th>Recherches</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="6">Aucun utilisateur trouvé.</td>
            </tr>
          )}
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isBlocked ? 'Oui' : 'Non'}</td>
              <td>{user.messagesCount}</td>
              <td>{user.selectionsCount}</td>
              <td>{user.searchesCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Précédent</button>
        <span style={{ margin: '0 1rem' }}>Page {page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Suivant</button>
      </div>
    </div>
  );
};

export default AdminUsers;
