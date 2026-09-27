import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import LogoutIcon from '@mui/icons-material/Logout';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
  Divider,
  InputAdornment,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';

import {
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  Mail as MailIcon,
  Refresh as RefreshIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  DateRange as DateRangeIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  AccountBox as AccountBoxIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Info as InfoIcon
} from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Filler
} from 'chart.js';

import { Pie, Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  ArcElement,
  ChartTooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Filler
);

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 200,
  borderRadius: 16,
  boxShadow: theme.shadows[4],
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8]
  }
}));

const StatusBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyMessage, setReplyMessage] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAction, setUserAction] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState({ start: null, end: null });
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStatsPeriod, setSelectedStatsPeriod] = useState('week');
  const [isExporting, setIsExporting] = useState(false);
  const [openDialog, setOpenDialog] = useState({
    userAction: false,
    message: false,
    profile: false
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, messagesRes] = await Promise.all([
        axios.get(`/api/admin/dashboard?period=${selectedStatsPeriod}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        }),
        axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/admin/messages', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data.filter(user => user.role === 'user'));
      setMessages(messagesRes.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Une erreur est survenue');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [token, navigate, selectedStatsPeriod]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(`/api/profile/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (err) {
      console.error('Erreur lors de la récupération du profil:', err);
      return null;
    }
  };

  const handleLogout = () => { 
    localStorage.removeItem('token'); 
    sessionStorage.removeItem('token'); 
    navigate('/login'); 
  };

  const exportData = async (type) => {
  setIsExporting(true);
  try {
    let dataToExport = [];

    if (type === 'users') {
      dataToExport = users.map(user => {
        const { selectionsCount, searchesCount, avatar, ...rest } = user;
        return rest;
      });
    } else if (type === 'messages') {
      dataToExport = messages;
    }

    if (dataToExport.length === 0) {
      alert("Aucune donnée à exporter.");
      return;
    }

    const headers = Object.keys(dataToExport[0]);
    const csvRows = [
      headers.join(','),
      ...dataToExport.map(row =>
        headers.map(fieldName => {
          const escaped = ('' + row[fieldName]).replace(/"/g, '""');
          return `"${escaped}"`;
        }).join(',')
      )
    ];

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${type}_export_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Erreur lors de l'export : ", error);
  } finally {
    setIsExporting(false);
  }
};

  const downloadProfile = async (userId) => {
    try {
      const profileData = await fetchUserProfile(userId);
      if (!profileData) {
        throw new Error('Profil non trouvé');
      }

      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profileData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `profile_${userId}.json`);
      document.body.appendChild(downloadAnchorNode); 
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } catch (error) {
      console.error('Erreur téléchargement:', error);
      setError('Erreur lors du téléchargement du profil');
    }
  };

  const downloadProfileAsPdf = async (userId) => {
    try {
      const profileData = await fetchUserProfile(userId);
      if (!profileData) {
        throw new Error('Profil non trouvé');
      }

      const doc = new jsPDF();
      
      // Titre du document
      doc.setFontSize(18);
      doc.setTextColor(40, 53, 147);
      doc.text('PROFIL UTILISATEUR', 105, 20, { align: 'center' });
      
      // Ligne de séparation
      doc.setDrawColor(40, 53, 147);
      doc.setLineWidth(0.5);
      doc.line(20, 25, 190, 25);
      
      // Informations de base
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      let yPosition = 40;
      
      doc.setFont(undefined, 'bold');
      doc.text('Informations personnelles:', 20, yPosition);
      doc.setFont(undefined, 'normal');
      
      yPosition += 10;
      doc.text(`Nom complet: ${profileData.firstName || ''} ${profileData.lastName || ''}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Email: ${selectedUser?.email || 'Non renseigné'}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Téléphone: ${profileData.phone || 'Non renseigné'}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Adresse: ${profileData.address || 'Non renseigné'}`, 20, yPosition);
      
      // Bio
      yPosition += 15;
      doc.setFont(undefined, 'bold');
      doc.text('Bio:', 20, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 7;
      doc.setFontSize(10);
      const splitBio = doc.splitTextToSize(profileData.bio || 'Non renseigné', 170);
      doc.text(splitBio, 20, yPosition);
      
      // Date de création
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Document généré le: ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, 20, 285);
      
      // Enregistrer le PDF
      doc.save(`profil_${userId}_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      setError('Erreur lors de la génération du PDF');
    }
  };

  const viewUserProfile = async (user) => {
    setSelectedUser(user);
    
    if (!profiles[user._id]) {
      const profileData = await fetchUserProfile(user._id);
      if (profileData) {
        setProfiles(prev => ({ ...prev, [user._id]: profileData }));
      }
    }
    
    setOpenDialog(prev => ({ ...prev, profile: true }));
  };

  const handleUserAction = (user, action) => {
    setSelectedUser(user);
    setUserAction(action);
    setOpenDialog(prev => ({ ...prev, userAction: true }));
  };

  const confirmUserAction = async () => {
    try {
      if (userAction === 'block') {
        await axios.patch(
          `/api/admin/users/${selectedUser._id}/block`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(users.map(u => u._id === selectedUser._id ? { ...u, isBlocked: !u.isBlocked } : u));
      } else if (userAction === 'delete') {
        await axios.delete(
          `/api/admin/users/${selectedUser._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(users.filter(u => u._id !== selectedUser._id));
      }
      setOpenDialog(prev => ({ ...prev, userAction: false }));
    } catch (err) {
      setError(`Échec de l'action: ${userAction === 'block' ? 'blocage' : 'suppression'}`);
    }
  };

  const toggleReadMessage = async (messageId) => {
    try {
      await axios.patch(
        `/api/admin/messages/${messageId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(messages.map(m => m._id === messageId ? { ...m, isRead: !m.isRead } : m));
    } catch (err) {
      setError('Échec de la mise à jour du statut de lecture');
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(
        `/api/admin/messages/${messageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(messages.filter(m => m._id !== messageId));
    } catch (err) {
      setError('Échec de la suppression du message');
    }
  };

  const replyToMessage = async (messageId) => {
    const reply = replyMessage[messageId];
    if (!reply?.trim()) {
      setError('Veuillez saisir une réponse');
      return;
    }

    try {
      await axios.post(
        `/api/admin/messages/${messageId}/reply`,
        { reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyMessage({ ...replyMessage, [messageId]: '' });
      fetchAllData();
    } catch (err) {
      setError('Échec de l\'envoi de la réponse');
    }
  };

  const viewFullMessage = (message) => {
    setSelectedMessage(message);
    setOpenDialog(prev => ({ ...prev, message: true }));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = messages
    .filter(msg => 
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(msg => statusFilter === 'all' || 
      (statusFilter === 'read' && msg.isRead) || 
      (statusFilter === 'unread' && !msg.isRead)
    );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const userStatsData = {
    labels: ['Admins', 'Utilisateurs', 'Bloqués'],
    datasets: [
      {
        label: 'Utilisateurs',
        data: [stats?.admins || 0, stats?.users || 0, stats?.blockedUsers || 0],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.error.main
        ],
        borderWidth: 1,
      },
    ],
  };

  const messageStatsData = {
    labels: ['Messages', 'Non lus', 'Répondu'],
    datasets: [
      {
        label: 'Messages',
        data: [stats?.contacts || 0, stats?.unreadMessages || 0, stats?.repliedMessages || 0],
        backgroundColor: [
          theme.palette.info.main,
          theme.palette.warning.main,
          theme.palette.success.main
        ],
        borderWidth: 1,
      },
    ],
  };

  const activityData = {
    labels: stats?.activity?.labels || [],
    datasets: [
      {
        label: 'Activité',
        data: stats?.activity?.data || [],
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        tension: 0.4,
        fill: true
      },
    ],
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  if (loading || !stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 3 }}>
        {error}
        <Button onClick={fetchAllData} color="inherit" size="small" sx={{ ml: 2 }}>
          Réessayer
        </Button>
      </Alert>
    );
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap">
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Tableau de bord administratif
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {format(new Date(), 'PPPP', { locale: frLocale })}
          </Typography>
        </Box>
        <Box display="flex" gap={1} mt={isMobile ? 2 : 0}>
          <Button
            onClick={fetchAllData}
            variant="outlined"
            startIcon={<RefreshIcon />}
            size="small"
          >
            Actualiser
          </Button>
          <Button
            onClick={() => exportData(activeTab === 0 ? 'users' : 'messages')}
            variant="contained"
            startIcon={<DownloadIcon />}
            size="small"
            disabled={isExporting}
          >
            Exporter
          </Button>
          <Button onClick={handleLogout} variant="contained" color="error" startIcon={<LogoutIcon />} size="small">
            Déconnexion
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6} lg={3}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Administrateurs
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats?.admins || 0}
                  </Typography>
                  <Typography variant="caption" color={stats?.adminChange >= 0 ? 'success.main' : 'error.main'}>
                    {stats?.adminChange >= 0 ? '+' : ''}{stats?.adminChange || 0}% depuis hier
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48 }}>
                  <AdminPanelSettingsIcon color="primary" />
                </Avatar>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Utilisateurs
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats?.users || 0}
                  </Typography>
                  <Typography variant="caption" color={stats?.userChange >= 0 ? 'success.main' : 'error.main'}>
                    {stats?.userChange >= 0 ? '+' : ''}{stats?.userChange || 0}% depuis hier
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'secondary.light', width: 48, height: 48 }}>
                  <PersonIcon color="secondary" />
                </Avatar>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Messages
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats?.contacts || 0}
                  </Typography>
                  <Typography variant="caption" color={stats?.messageChange >= 0 ? 'success.main' : 'error.main'}>
                    {stats?.messageChange >= 0 ? '+' : ''}{stats?.messageChange || 0}% depuis hier
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'info.light', width: 48, height: 48 }}>
                  <MailIcon color="info" />
                </Avatar>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Recherches
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats?.searches || 0}
                  </Typography>
                  <Typography variant="caption" color={stats?.searchChange >= 0 ? 'success.main' : 'error.main'}>
                    {stats?.searchChange >= 0 ? '+' : ''}{stats?.searchChange || 0}% depuis hier
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'warning.light', width: 48, height: 48 }}>
                  <SearchIcon color="warning" />
                </Avatar>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">Statistiques des utilisateurs</Typography>
              <Select
                value={selectedStatsPeriod}
                onChange={(e) => setSelectedStatsPeriod(e.target.value)}
                size="small"
                sx={{ minWidth: 120 }}
              >
                <MenuItem value="week">Cette semaine</MenuItem>
                <MenuItem value="month">Ce mois</MenuItem>
                <MenuItem value="year">Cette année</MenuItem>
              </Select>
            </Box>
            <Box height={300}>
              <Pie data={userStatsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" fontWeight="bold">Statistiques des messages</Typography>
              <Box>
                <IconButton size="small">
                  <PieChartIcon />
                </IconButton>
                <IconButton size="small">
                  <BarChartIcon />
                </IconButton>
              </Box>
            </Box>
            <Box height={300}>
              <Bar 
                data={activityData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }} 
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)} 
          variant="fullWidth"
          sx={{ 
            backgroundColor: 'primary.main',
            '& .MuiTabs-indicator': {
              backgroundColor: 'common.white',
              height: 3
            }
          }}
        >
          <Tab 
            label={
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ mr: 1 }} />
                <span>Utilisateurs ({users.length})</span>
              </Box>
            } 
            sx={{ color: 'common.white' }} 
          />
          <Tab 
            label={
              <Box display="flex" alignItems="center">
                <MailIcon sx={{ mr: 1 }} />
                <span>Messages ({messages.length})</span>
              </Box>
            } 
            sx={{ color: 'common.white' }} 
          />
        </Tabs>

        <Box p={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap">
            <TextField
              placeholder={`Rechercher ${activeTab === 0 ? 'utilisateurs' : 'messages'}...`}
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                minWidth: 300,
                mb: isMobile ? 2 : 0
              }}
            />
            <Box display="flex" gap={1}>
              {activeTab === 1 && (
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  size="small"
                  sx={{ minWidth: 120 }}
                >
                  <MenuItem value="all">Tous les statuts</MenuItem>
                  <MenuItem value="read">Lus</MenuItem>
                  <MenuItem value="unread">Non lus</MenuItem>
                </Select>
              )}
              <Button 
                variant="outlined" 
                startIcon={<FilterListIcon />}
                onClick={() => setFilterOpen(!filterOpen)}
                size="small"
              >
                Filtres
              </Button>
              <Button
                onClick={handlePrint}
                variant="outlined"
                startIcon={<PrintIcon />}
                size="small"
                className="no-print"
              >
                Imprimer
              </Button>
            </Box>
          </Box>

          {filterOpen && (
            <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Filtres avancés</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date de début"
                    type="date"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date de fin"
                    type="date"
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          )}

          {activeTab === 0 ? (
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={sortedUsers}
                columns={[
                  {
                    field: 'email',
                    headerName: 'Email',
                    width: 250,
                    renderCell: (params) => (
                      <Box display="flex" alignItems="center">
                        <EmailIcon color="action" sx={{ mr: 1 }} />
                        {params.value}
                      </Box>
                    )
                  },
                  {
                    field: 'role',
                    headerName: 'Rôle',
                    width: 150,
                    renderCell: (params) => (
                      <Chip 
                        label={params.value === 'admin' ? 'Administrateur' : 'Utilisateur'} 
                        color={params.value === 'admin' ? 'primary' : 'default'} 
                        size="small"
                        variant="outlined"
                      />
                    )
                  },
                  {
                    field: 'isBlocked',
                    headerName: 'Statut',
                    width: 120,
                    renderCell: (params) =>
                      params.value ? (
                        <Chip label="Bloqué" color="error" size="small" />
                      ) : (
                        <Chip label="Actif" color="success" size="small" />
                      )
                  },
                  {
                    field: 'createdAt',
                    headerName: 'Inscrit le',
                    width: 180,
                    renderCell: (params) => {
                      const parseAndFormatDate = (dateString) => {
                        if (!dateString) return { text: 'Non disponible', isError: true };
                        
                        try {
                          const date = new Date(dateString);
                          const now = new Date();
                          
                          if (isNaN(date.getTime())) {
                            return { text: 'Format invalide', isError: true };
                          }
                          
                          if (date > now) {
                            return { text: 'Date future', isError: true };
                          }
                          
                          return {
                            text: format(date, 'dd MMM yyyy', { locale: frLocale }),
                            fullDate: format(date, 'PPPPp', { locale: frLocale }),
                            isError: false
                          };
                        } catch {
                          return { text: 'Erreur de date', isError: true };
                        }
                      };

                      const { text, fullDate, isError } = parseAndFormatDate(params.value);

                      return (
                        <Tooltip title={fullDate || text}>
                          <Box display="flex" alignItems="center" color={isError ? 'error.main' : 'text.primary'}>
                            <DateRangeIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">{text}</Typography>
                          </Box>
                        </Tooltip>
                      );
                    }
                  },
                  {
                    field: 'actions',
                    headerName: 'Actions',
                    width: 200,
                    sortable: false,
                    renderCell: (params) => (
                      <Box display="flex" gap={1}>
                        <Tooltip title="Voir profil">
                          <IconButton
                            onClick={() => viewUserProfile(params.row)}
                            color="primary"
                            size="small"
                          >
                            <AccountBoxIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={params.row.isBlocked ? "Débloquer" : "Bloquer"}>
                          <IconButton
                            onClick={() => handleUserAction(params.row, 'block')}
                            color={params.row.isBlocked ? 'success' : 'error'}
                            size="small"
                          >
                            {params.row.isBlocked ? <CheckCircleIcon /> : <BlockIcon />}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer">
                          <IconButton
                            onClick={() => handleUserAction(params.row, 'delete')}
                            color="error"
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )
                  }
                ]}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row._id}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'primary.main',
                    color: 'black',
                    fontWeight: 'bold',
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                    p: 1,
                  },
                }}
              />
            </Box>
          ) : (
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={sortedMessages}
                columns={[
                  {
                    field: 'name',
                    headerName: 'Expéditeur',
                    width: 180
                  },
                  {
                    field: 'email',
                    headerName: 'Email',
                    width: 200
                  },
                  {
                    field: 'message',
                    headerName: 'Message',
                    width: 300,
                    renderCell: (params) => (
                      <Box display="flex" flexDirection="column" sx={{ maxWidth: 250 }}>
                        <Typography noWrap>
                          {params.value.substring(0, 50)}...
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => viewFullMessage(params.row)}
                          sx={{ mt: 0.5, alignSelf: 'flex-start' }}
                        >
                          Voir plus
                        </Button>
                      </Box>
                    )
                  },
                  {
                    field: 'createdAt',
                    headerName: 'Date',
                    width: 180,
                    renderCell: (params) => {
                      const parseAndFormatDate = (dateString) => {
                        if (!dateString) return { text: 'Non disponible', isError: true };
                        
                        try {
                          const date = new Date(dateString);
                          const now = new Date();
                          
                          if (isNaN(date.getTime())) {
                            return { text: 'Format invalide', isError: true };
                          }
                          
                          if (date > now) {
                            return { text: 'Date future', isError: true };
                          }
                          
                          return {
                            text: format(date, 'dd MMM yyyy', { locale: frLocale }),
                            fullDate: format(date, 'PPPPp', { locale: frLocale }),
                            isError: false
                          };
                        } catch {
                          return { text: 'Erreur de date', isError: true };
                        }
                      };

                      const { text, fullDate, isError } = parseAndFormatDate(params.value);

                      return (
                        <Tooltip title={fullDate || text}>
                          <Box display="flex" alignItems="center" color={isError ? 'error.main' : 'text.primary'}>
                            <DateRangeIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2">{text}</Typography>
                          </Box>
                        </Tooltip>
                      );
                    }
                  },
                  {
                    field: 'isRead',
                    headerName: 'Statut',
                    width: 120,
                    renderCell: (params) =>
                      params.value ? (
                        <Chip label="Lu" color="success" size="small" />
                      ) : (
                        <Chip label="Non lu" color="warning" size="small" />
                      )
                  },
                  {
                    field: 'actions',
                    headerName: 'Actions',
                    width: 200,
                    sortable: false,
                    renderCell: (params) => (
                      <Box display="flex" flexDirection="column" gap={1} width="100%">
                        <Box>
                          <Tooltip title={params.row.isRead ? "Marquer comme non lu" : "Marquer comme lu"}>
                            <IconButton
                              onClick={() => toggleReadMessage(params.row._id)}
                              color={params.row.isRead ? "default" : "primary"}
                              size="small"
                            >
                              {params.row.isRead ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <IconButton
                              onClick={() => deleteMessage(params.row._id)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <TextField
                          multiline
                          rows={2}
                          placeholder="Répondre..."
                          value={replyMessage[params.row._id] || ''}
                          onChange={(e) =>
                            setReplyMessage({ ...replyMessage, [params.row._id]: e.target.value })
                          }
                          size="small"
                          fullWidth
                        />
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => replyToMessage(params.row._id)}
                          startIcon={<EmailIcon />}
                          fullWidth
                        >
                          Répondre
                        </Button>
                      </Box>
                    )
                  }
                ]}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row._id}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'primary.main',
                    color: 'black',
                    fontWeight: 'bold',
                  },
                  '& .MuiDataGrid-toolbarContainer': {
                    p: 1,
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </Paper>

      <Dialog 
        open={openDialog.userAction} 
        onClose={() => setOpenDialog(prev => ({ ...prev, userAction: false }))}
        maxWidth="sm"
        fullWidth
        disableEnforceFocus
      >
        <DialogTitle>
          {userAction === 'block'
            ? selectedUser?.isBlocked
              ? 'Débloquer l\'utilisateur'
              : 'Bloquer l\'utilisateur'
            : 'Supprimer l\'utilisateur'}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {userAction === 'block'
              ? `Êtes-vous sûr de vouloir ${selectedUser?.isBlocked ? 'débloquer' : 'bloquer'} l'utilisateur ${selectedUser?.email} ?`
              : `Êtes-vous sûr de vouloir supprimer définitivement l'utilisateur ${selectedUser?.email} ?`}
          </Typography>
          {userAction === 'delete' && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Cette action est irréversible. Toutes les données associées à cet utilisateur seront également supprimées.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(prev => ({ ...prev, userAction: false }))} variant="outlined">
            Annuler
          </Button>
          <Button
            onClick={confirmUserAction}
            color={userAction === 'delete' ? 'error' : 'primary'}
            variant="contained"
            autoFocus
          >
            {userAction === 'block' 
              ? selectedUser?.isBlocked ? 'Débloquer' : 'Bloquer' 
              : 'Supprimer'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog.message}
        onClose={() => setOpenDialog(prev => ({ ...prev, message: false }))}
        maxWidth="md"
        fullWidth
        disableEnforceFocus
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <span>Message de {selectedMessage?.name}</span>
            <Box>
              <IconButton
                onClick={() => toggleReadMessage(selectedMessage._id)}
                color={selectedMessage?.isRead ? "default" : "primary"}
                size="small"
              >
                {selectedMessage?.isRead ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
              <IconButton
                onClick={() => deleteMessage(selectedMessage._id)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
  <Box mb={3}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" color="text.secondary">
          <strong>De:</strong> {selectedMessage?.email}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" color="text.secondary">
          <strong>Date:</strong>{" "}
          {selectedMessage?.createdAt &&
            format(new Date(selectedMessage.createdAt), "PPpp", {
              locale: frLocale,
            })}
        </Typography>
      </Grid>
    </Grid>
  </Box>

  <Paper
    variant="outlined"
    sx={{ p: 3, backgroundColor: "grey.50", mb: 3 }}
  >
    <Typography whiteSpace="pre-wrap">
      {selectedMessage?.message}
    </Typography>
  </Paper>

  {selectedMessage?.reply ? (
    <Box>
      <Typography variant="h6" gutterBottom>
        Votre réponse:
      </Typography>
      <Paper
        variant="outlined"
        sx={{ p: 3, backgroundColor: "primary.light" }}
      >
        <Typography whiteSpace="pre-wrap">
          {selectedMessage.reply}
        </Typography>
      </Paper>
    </Box>
  ) : (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Répondre:
      </Typography>
      <TextField
        multiline
        rows={4}
        fullWidth
        placeholder="Écrire votre réponse ici..."
        value={replyMessage[selectedMessage?._id] || ""}
        onChange={(e) =>
          setReplyMessage({
            ...replyMessage,
            [selectedMessage?._id]: e.target.value,
          })
        }
      />
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          startIcon={<EmailIcon />}
          onClick={async () => {
            const messageToSend = replyMessage[selectedMessage?._id];
            if (!selectedMessage || !messageToSend?.trim()) return;

            try {
              const res = await fetch("http://localhost:5000/api/reply", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: selectedMessage?.email, // 📩 email du user
                  message: messageToSend, // 📝 contenu saisi
                }),
              });

              const data = await res.json();
              if (data.success) {
                alert("Réponse envoyée avec succès !");
                setReplyMessage({
                  ...replyMessage,
                  [selectedMessage?._id]: "",
                });
              } else {
                alert("Erreur : " + data.message);
              }
            } catch (err) {
              console.error(err);
              alert("Impossible d’envoyer l’email.");
            }
          }}
        >
          Envoyer la réponse
        </Button>
      </Box>
    </Box>
  )}
</DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(prev => ({ ...prev, message: false }))}>Fermer</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDialog.profile}
        onClose={() => setOpenDialog(prev => ({ ...prev, profile: false }))}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <AccountBoxIcon sx={{ mr: 1 }} />
            <span>Profil de {selectedUser?.email}</span>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {profiles[selectedUser?._id] ? (
            <Box>
              <Box display="flex" justifyContent="center" mb={3}>
                <Avatar
                  src={profiles[selectedUser._id].avatar ? `/uploads/${profiles[selectedUser._id].avatar}` : undefined}
                  sx={{ width: 120, height: 120 }}
                >
                  {!profiles[selectedUser._id].avatar && (
                    <PersonIcon sx={{ fontSize: 60 }} />
                  )}
                </Avatar>
              </Box>

              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nom complet"
                    secondary={`${profiles[selectedUser._id].firstName || 'Non renseigné'} ${profiles[selectedUser._id].lastName || ''}`}
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Email"
                    secondary={selectedUser?.email || 'Non renseigné'}
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PhoneIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Téléphone"
                    secondary={profiles[selectedUser._id].phone || 'Non renseigné'}
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <HomeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Adresse"
                    secondary={profiles[selectedUser._id].address || 'Non renseigné'}
                  />
                </ListItem>

                <Divider variant="inset" component="li" />

                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <InfoIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Bio"
                    secondary={profiles[selectedUser._id].bio || 'Non renseigné'}
                  />
                </ListItem>
              </List>

              <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => downloadProfile(selectedUser._id)}
                >
                  Télécharger (JSON)
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={() => downloadProfileAsPdf(selectedUser._id)}
                  color="error"
                >
                  Télécharger (PDF)
                </Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(prev => ({ ...prev, profile: false }))}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;