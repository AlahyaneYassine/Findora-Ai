import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editedRoles, setEditedRoles] = useState({});
  const [loadingIds, setLoadingIds] = useState([]);
  const [message, setMessage] = useState('');

  // Récupérer la liste utilisateurs
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Erreur lors du chargement des utilisateurs.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Changer rôle en local
  const handleRoleChange = (userId, newRole) => {
    setEditedRoles(prev => ({ ...prev, [userId]: newRole }));
  };

  // Enregistrer rôle modifié (PATCH)
  const saveRoleChange = async (userId, role) => {
    setLoadingIds(ids => [...ids, userId]);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/admin/users/${userId}/role`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users =>
        users.map(u => (u._id === userId ? { ...u, role } : u))
      );
      setEditedRoles(edited => {
        const copy = { ...edited };
        delete copy[userId];
        return copy;
      });
      setMessage('Rôle mis à jour.');
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la mise à jour du rôle.');
    } finally {
      setLoadingIds(ids => ids.filter(id => id !== userId));
    }
  };

  // Bloquer/Débloquer utilisateur
  const toggleBlockUser = async (userId) => {
    setLoadingIds(ids => [...ids, userId]);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/admin/users/${userId}/block`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users =>
        users.map(u =>
          u._id === userId ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );
      setMessage('Statut de blocage modifié.');
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors du changement de blocage.');
    } finally {
      setLoadingIds(ids => ids.filter(id => id !== userId));
    }
  };

  // Supprimer utilisateur
  const deleteUser = async (userId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    setLoadingIds(ids => [...ids, userId]);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users => users.filter(u => u._id !== userId));
      setMessage('Utilisateur supprimé.');
    } catch (error) {
      console.error(error);
      setMessage('Erreur lors de la suppression.');
    } finally {
      setLoadingIds(ids => ids.filter(id => id !== userId));
    }
  };

  return (
    <div className="user-management">
      <h2>Gestion des utilisateurs</h2>

      {message && <div className="message">{message}</div>}

      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Rôle actuel</th>
            <th>Changer rôle</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const editedRole = editedRoles[user._id] || user.role;
            const isLoading = loadingIds.includes(user._id);

            return (
              <tr key={user._id} style={{ backgroundColor: user.isBlocked ? '#ffd6d6' : 'transparent' }}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={editedRole}
                    onChange={e => handleRoleChange(user._id, e.target.value)}
                    disabled={isLoading}
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                  {editedRoles[user._id] && editedRole !== user.role && (
                    <button
                      onClick={() => saveRoleChange(user._id, editedRole)}
                      disabled={isLoading}
                      style={{ marginLeft: '8px' }}
                    >
                      {isLoading ? 'Enregistrement...' : 'Sauvegarder'}
                    </button>
                  )}
                </td>
                <td>{user.isBlocked ? 'Bloqué' : 'Actif'}</td>
                <td>
                  <button
                    onClick={() => toggleBlockUser(user._id)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Chargement...' : user.isBlocked ? 'Débloquer' : 'Bloquer'}
                  </button>{' '}
                  <button
                    onClick={() => deleteUser(user._id)}
                    disabled={isLoading}
                    style={{ color: 'red' }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
