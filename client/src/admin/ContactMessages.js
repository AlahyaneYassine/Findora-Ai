import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ContactMessages() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error('Erreur récupération messages:', err);
    }
  };

  const toggleReadStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `/api/admin/messages/${id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMessages();
    } catch (err) {
      console.error('Erreur toggle lecture:', err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMessages();
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Messages de contact</h1>
      {messages.length === 0 ? (
        <p>Aucun message pour le moment.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Sujet</th>
              <th>Message</th>
              <th>Date</th>
              <th>Lu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id} style={{ backgroundColor: msg.isRead ? '#f5f5f5' : '#fffbe6' }}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td>{msg.isRead ? '✅' : '❌'}</td>
                <td>
                  <button onClick={() => toggleReadStatus(msg._id)}>Marquer</button>{' '}
                  <a href={`mailto:${msg.email}?subject=RE: ${msg.subject}`} style={{ marginRight: '10px' }}>
                    Répondre
                  </a>
                  <button onClick={() => deleteMessage(msg._id)} style={{ color: 'red' }}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ContactMessages;
