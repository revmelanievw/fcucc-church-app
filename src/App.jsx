import React, { useState, useEffect, useMemo } from 'react';

const CONFIG = {
  churchName: "First Congregational",
  churchSubtitle: "United Church of Christ",
  location: "Cedar Rapids, Iowa",
  address: "361 17th Street SE, Cedar Rapids, IA 52403",
  phone: "319-362-1926",
  email: "office@firstchurchcr.org",
  worshipTime: "Sundays at 10:00AM",
  givingUrl: "https://www.givelify.com/donate/first-congregational-united-church-of-christ-fcucc-cedar-rapids-ia-2j7wy5MjA3MzI=/donation/amount",
  calendarUrl: "https://fcccr.org/events",
  welcomeMessage: "No matter who you are or where you are on life's journey, you are welcome here.",
  // GOOGLE SHEETS CONFIG
  googleSheetId: "1ADH4dlI7_h0sEU-6m-idtNraUe2VVi1oBNzbpvLXcRw",
  sheetName: "Directory",
};

const SECURITY = {
  directoryPassword: "fcucc2026",
  sessionDuration: 0,
};

// ============================================================
// GOOGLE SHEETS INTEGRATION
// ============================================================
// Your team edits a Google Sheet → the app reads it automatically.
// No code changes needed for directory updates!
//
// The Google Sheet should have these column headers (Row 1):
//   name | email | cellPhone | homePhone | address | photo | category
//
// "category" should be one of: Staff, Leadership, Community
// "photo" should be the Google Drive direct link like:
//   https://lh3.googleusercontent.com/d/FILE_ID_HERE
//
// To get the photo URL from Google Drive:
//   1. Upload photo to Google Drive
//   2. Right-click → Share → "Anyone with the link" → Viewer
//   3. Copy the file ID from the share link
//   4. Paste into the photo column as: https://lh3.googleusercontent.com/d/FILE_ID
// ============================================================

function parseCSV(csvText) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  let row = [];

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const next = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(current.trim());
        current = '';
      } else if (char === '\n' || (char === '\r' && next === '\n')) {
        row.push(current.trim());
        if (row.some(cell => cell !== '')) {
          rows.push(row);
        }
        row = [];
        current = '';
        if (char === '\r') i++;
      } else {
        current += char;
      }
    }
  }
  // Last row
  row.push(current.trim());
  if (row.some(cell => cell !== '')) {
    rows.push(row);
  }

  return rows;
}

async function fetchDirectoryFromSheet(sheetId, sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${1ADH4dlI7_h0sEU-6m-idtNraUe2VVi1oBNzbpvLXcRw}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet: ${response.status}`);
  }

  const csvText = await response.text();
  const rows = parseCSV(csvText);

  if (rows.length < 2) return [];

  const headers = rows[0].map(h => h.toLowerCase().trim());
  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const entry = {};
    headers.forEach((header, idx) => {
      entry[header] = row[idx] || '';
    });

    // Skip rows with no name
    if (!entry.name || entry.name.trim() === '') continue;

    data.push({
      id: i,
      name: entry.name || '',
      email: entry.email || '',
      cellPhone: entry.cellphone || entry['cell phone'] || entry['cell'] || '',
      homePhone: entry.homephone || entry['home phone'] || entry['home'] || '',
      address: entry.address || '',
      photo: entry.photo || '',
      category: entry.category || 'Community',
    });
  }

  return data;
}

// ============================================================
// STYLES
// ============================================================
const styles = {
  appContainer: { minHeight: '100vh', backgroundColor: '#FAF8F5', fontFamily: '"Crimson Pro", Georgia, serif', position: 'relative', maxWidth: '430px', margin: '0 auto', boxShadow: '0 0 60px rgba(0,0,0,0.1)' },
  mainContent: { paddingBottom: '80px', position: 'relative', zIndex: 1 },
  heroSection: { height: '280px', background: 'linear-gradient(135deg, #4C7273 0%, #2D4A4B 50%, #1a3234 100%)', position: 'relative', overflow: 'hidden' },
  heroOverlay: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)', padding: '20px' },
  logoContainer: { marginBottom: '12px' },
  heroLogo: { width: '80px', height: '80px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' },
  churchName: { fontSize: '32px', fontWeight: '600', color: '#FFFFFF', margin: '0', textAlign: 'center', letterSpacing: '1px', textShadow: '0 2px 15px rgba(0,0,0,0.3)' },
  churchSubtitle: { fontSize: '18px', fontWeight: '400', color: '#E8DFD0', margin: '4px 0 0 0', textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase' },
  tagline: { fontSize: '14px', color: '#B8C9CA', margin: '12px 0 0 0', letterSpacing: '1px' },
  welcomeCard: { margin: '-30px 20px 20px 20px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', position: 'relative', zIndex: 2 },
  welcomeText: { fontSize: '17px', color: '#5A5A5A', textAlign: 'center', margin: 0, lineHeight: '1.6' },
  quickActions: { display: 'flex', justifyContent: 'center', gap: '16px', padding: '0 20px 24px 20px' },
  actionButton: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '20px 24px', backgroundColor: '#FFFFFF', border: '2px solid #E8E4DE', borderRadius: '16px', cursor: 'pointer', textDecoration: 'none', flex: 1, maxWidth: '110px' },
  actionIcon: { fontSize: '28px' },
  actionLabel: { fontSize: '14px', fontWeight: '600', color: '#4C7273', fontFamily: '"Crimson Pro", Georgia, serif' },
  infoSection: { padding: '0 20px 24px 20px', display: 'flex', flexDirection: 'column', gap: '12px' },
  infoCard: { padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '12px', borderLeft: '4px solid #8B5A2B' },
  infoTitle: { fontSize: '14px', fontWeight: '600', color: '#8B5A2B', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px' },
  infoText: { fontSize: '16px', color: '#3A3A3A', margin: '0', lineHeight: '1.5' },
  infoTextSmall: { fontSize: '14px', color: '#777', margin: '4px 0 0 0' },
  emailLink: { fontSize: '15px', color: '#4C7273', textDecoration: 'none' },
  valuesSection: { padding: '24px 20px 32px 20px', backgroundColor: '#F0EBE3' },
  valuesSectionTitle: { fontSize: '14px', fontWeight: '600', color: '#8B5A2B', textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center', margin: '0 0 16px 0' },
  valuesGrid: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' },
  valueChip: { padding: '10px 18px', backgroundColor: '#4C7273', color: '#FFFFFF', borderRadius: '24px', fontSize: '14px', fontWeight: '500' },
  loginContainer: { padding: '0' },
  loginHeader: { padding: '40px 20px 32px 20px', background: 'linear-gradient(135deg, #4C7273 0%, #2D4A4B 100%)', textAlign: 'center' },
  loginTitle: { fontSize: '28px', fontWeight: '600', color: '#FFFFFF', margin: '0' },
  loginSubtitle: { fontSize: '15px', color: '#B8C9CA', margin: '8px 0 0 0' },
  loginCard: { margin: '-20px 20px 20px 20px', padding: '32px 24px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', position: 'relative', zIndex: 2, textAlign: 'center' },
  lockIcon: { fontSize: '48px', marginBottom: '16px' },
  loginCardTitle: { fontSize: '22px', fontWeight: '600', color: '#2D2D2D', margin: '0 0 8px 0' },
  loginCardText: { fontSize: '15px', color: '#666', margin: '0 0 24px 0', lineHeight: '1.5' },
  passwordInputField: { width: '100%', padding: '16px', fontSize: '18px', border: '2px solid #E8E4DE', borderRadius: '10px', boxSizing: 'border-box', fontFamily: '"Crimson Pro", Georgia, serif', textAlign: 'center', outline: 'none' },
  loginError: { color: '#D32F2F', fontSize: '14px', margin: '12px 0 0 0' },
  loginButton: { width: '100%', padding: '16px', backgroundColor: '#4C7273', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '16px', fontFamily: '"Crimson Pro", Georgia, serif' },
  loginHelp: { fontSize: '13px', color: '#999', margin: '20px 0 0 0' },
  directoryHeader: { padding: '32px 20px 24px 20px', background: 'linear-gradient(135deg, #4C7273 0%, #2D4A4B 100%)', textAlign: 'center', position: 'relative' },
  directoryTitle: { fontSize: '28px', fontWeight: '600', color: '#FFFFFF', margin: '0' },
  directorySubtitle: { fontSize: '15px', color: '#B8C9CA', margin: '8px 0 0 0' },
  logoutButton: { position: 'absolute', top: '16px', right: '16px', padding: '8px 12px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontFamily: '"Crimson Pro", Georgia, serif' },
  searchContainer: { margin: '-20px 20px 20px 20px', position: 'relative', zIndex: 2 },
  searchInput: { width: '100%', padding: '16px 48px 16px 20px', fontSize: '16px', border: 'none', borderRadius: '12px', backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', boxSizing: 'border-box', fontFamily: '"Crimson Pro", Georgia, serif', outline: 'none' },
  clearSearch: { position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', fontSize: '18px', color: '#999', cursor: 'pointer', padding: '4px' },
  directoryList: { padding: '0 20px 20px 20px' },
  categorySection: { marginBottom: '24px' },
  categoryTitle: { fontSize: '13px', fontWeight: '700', color: '#8B5A2B', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 12px 0', paddingBottom: '8px', borderBottom: '2px solid #E8E4DE' },
  peopleGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  personCard: { display: 'flex', alignItems: 'center', gap: '16px', padding: '14px', backgroundColor: '#FFFFFF', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  personPhoto: { width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #E8DFD0' },
  personInitials: { width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#4C7273', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '18px', fontWeight: '600', flexShrink: 0 },
  personInfo: { flex: 1 },
  personName: { fontSize: '17px', fontWeight: '600', color: '#2D2D2D', margin: '0' },
  noResults: { textAlign: 'center', padding: '40px 20px', color: '#666' },
  clearSearchButton: { marginTop: '16px', padding: '12px 24px', backgroundColor: '#4C7273', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontFamily: '"Crimson Pro", Georgia, serif' },
  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '340px', textAlign: 'center', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxHeight: '80vh', overflowY: 'auto' },
  modalClose: { position: 'absolute', top: '16px', right: '16px', background: '#F5F5F5', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', color: '#666' },
  modalPhoto: { width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #E8DFD0', marginBottom: '16px' },
  modalInitials: { width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#4C7273', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '48px', fontWeight: '600', margin: '0 auto 16px auto' },
  modalName: { fontSize: '24px', fontWeight: '600', color: '#2D2D2D', margin: '0' },
  modalCategory: { fontSize: '14px', color: '#4C7273', margin: '8px 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' },
  modalContactInfo: { textAlign: 'left', marginBottom: '20px', padding: '16px', backgroundColor: '#F9F9F9', borderRadius: '12px' },
  contactRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '8px 0', borderBottom: '1px solid #EEE' },
  contactLabel: { fontSize: '13px', color: '#888', fontWeight: '600', textTransform: 'uppercase', flexShrink: 0 },
  contactValue: { fontSize: '15px', color: '#4C7273', textDecoration: 'none', textAlign: 'right', marginLeft: '12px', wordBreak: 'break-word' },
  modalActions: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
  modalButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px', backgroundColor: '#4C7273', color: '#FFFFFF', borderRadius: '10px', textDecoration: 'none', fontSize: '15px', fontWeight: '500', fontFamily: '"Crimson Pro", Georgia, serif' },
  giveHeader: { padding: '40px 20px 32px 20px', background: 'linear-gradient(135deg, #8B5A2B 0%, #6B4423 100%)', textAlign: 'center' },
  giveIconLarge: { fontSize: '48px', marginBottom: '12px' },
  giveTitle: { fontSize: '28px', fontWeight: '600', color: '#FFFFFF', margin: '0' },
  giveSubtitle: { fontSize: '16px', color: '#E8DFD0', margin: '12px 0 0 0', lineHeight: '1.5' },
  giveCard: { margin: '-20px 20px 24px 20px', padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', position: 'relative', zIndex: 2 },
  giveQuote: { fontSize: '17px', color: '#5A5A5A', fontStyle: 'italic', lineHeight: '1.7', margin: '0', textAlign: 'center' },
  giveReference: { fontSize: '14px', color: '#8B5A2B', textAlign: 'center', margin: '16px 0 0 0', fontWeight: '600' },
  giveButton: { display: 'block', margin: '0 20px 32px 20px', padding: '20px', backgroundColor: '#4C7273', color: '#FFFFFF', textAlign: 'center', borderRadius: '14px', textDecoration: 'none', fontSize: '18px', fontWeight: '600', fontFamily: '"Crimson Pro", Georgia, serif', boxShadow: '0 4px 16px rgba(76,114,115,0.3)' },
  giveOptions: { padding: '0 20px 32px 20px' },
  giveOptionsTitle: { fontSize: '13px', fontWeight: '700', color: '#8B5A2B', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 16px 0' },
  giveOption: { display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '12px', marginBottom: '12px' },
  giveOptionIcon: { fontSize: '24px' },
  giveOptionLabel: { fontSize: '16px', fontWeight: '600', color: '#2D2D2D', margin: '0' },
  giveOptionText: { fontSize: '14px', color: '#777', margin: '4px 0 0 0' },
  bottomNav: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '430px', display: 'flex', backgroundColor: '#FFFFFF', borderTop: '1px solid #E8E4DE', padding: '8px 0 12px 0', zIndex: 50, boxShadow: '0 -4px 20px rgba(0,0,0,0.05)' },
  navButton: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' },
  navIcon: { fontSize: '24px' },
  navLabel: { fontSize: '11px', fontWeight: '600', color: '#777', fontFamily: '"Crimson Pro", Georgia, serif' },
  // Loading & error states
  loadingContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' },
  loadingSpinner: { width: '40px', height: '40px', border: '4px solid #E8E4DE', borderTop: '4px solid #4C7273', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px' },
  loadingText: { fontSize: '16px', color: '#666' },
  errorContainer: { padding: '40px 20px', textAlign: 'center' },
  errorText: { fontSize: '16px', color: '#D32F2F', marginBottom: '16px' },
  retryButton: { padding: '12px 24px', backgroundColor: '#4C7273', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontFamily: '"Crimson Pro", Georgia, serif' },
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================
const ChurchApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDirectoryAuthenticated, setIsDirectoryAuthenticated] = useState(false);
  const [directoryPassword, setDirectoryPassword] = useState('');
  const [directoryPasswordError, setDirectoryPasswordError] = useState('');
  const [failedPhotos, setFailedPhotos] = useState({});

  // Google Sheets data state
  const [directoryData, setDirectoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Check for existing directory session
  useEffect(() => {
    const sessionData = localStorage.getItem('fcucc_directory_session');
    if (sessionData) {
      try {
        const { authenticated, expiry } = JSON.parse(sessionData);
        if (authenticated && (expiry === 0 || new Date().getTime() < expiry)) {
          setIsDirectoryAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem('fcucc_directory_session');
      }
    }
  }, []);

  // Fetch directory data from Google Sheets when authenticated
  useEffect(() => {
    if (isDirectoryAuthenticated && !dataLoaded) {
      loadDirectory();
    }
  }, [isDirectoryAuthenticated, dataLoaded]);

  const loadDirectory = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchDirectoryFromSheet(CONFIG.googleSheetId, CONFIG.sheetName);
      setDirectoryData(data);
      setDataLoaded(true);
    } catch (err) {
      console.error('Failed to load directory:', err);
      setLoadError('Unable to load directory. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectoryLogin = () => {
    if (directoryPassword === SECURITY.directoryPassword) {
      setIsDirectoryAuthenticated(true);
      setDirectoryPasswordError('');
      setDirectoryPassword('');
      localStorage.setItem('fcucc_directory_session', JSON.stringify({ authenticated: true, expiry: 0 }));
    } else {
      setDirectoryPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleDirectoryLogout = () => {
    setIsDirectoryAuthenticated(false);
    setDataLoaded(false);
    setDirectoryData([]);
    localStorage.removeItem('fcucc_directory_session');
    setActiveTab('home');
  };

  const handlePhotoError = (personId) => {
    setFailedPhotos(prev => ({ ...prev, [personId]: true }));
  };

  const filteredDirectory = useMemo(() => {
    return directoryData.filter(person =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (person.email && person.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, directoryData]);

  const groupedDirectory = useMemo(() => {
    return filteredDirectory.reduce((acc, person) => {
      if (!acc[person.category]) acc[person.category] = [];
      acc[person.category].push(person);
      return acc;
    }, {});
  }, [filteredDirectory]);

  const categoryOrder = ['Staff', 'Leadership', 'Community'];
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const PersonPhoto = ({ person, size = 56, fontSize = 18 }) => {
    const showInitials = !person.photo || failedPhotos[person.id];

    if (showInitials) {
      return (
        <div style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: '#4C7273',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: fontSize,
          fontWeight: '600',
          flexShrink: 0,
          border: size > 60 ? '4px solid #E8DFD0' : '3px solid #E8DFD0',
        }}>
          {getInitials(person.name)}
        </div>
      );
    }

    return (
      <img
        src={person.photo}
        alt={person.name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: size > 60 ? '4px solid #E8DFD0' : '3px solid #E8DFD0',
          flexShrink: 0,
        }}
        onError={() => handlePhotoError(person.id)}
        referrerPolicy="no-referrer"
      />
    );
  };

  let content;

  if (activeTab === 'home') {
    content = (
      <div>
        <div style={styles.heroSection}>
          <div style={styles.heroOverlay}>
            <div style={styles.logoContainer}>
              <img src="/icons/icon-192.png" alt="FCUCC" style={styles.heroLogo} />
            </div>
            <h1 style={styles.churchName}>{CONFIG.churchName}</h1>
            <h2 style={styles.churchSubtitle}>{CONFIG.churchSubtitle}</h2>
            <p style={styles.tagline}>{CONFIG.location}</p>
          </div>
        </div>
        <div style={styles.welcomeCard}>
          <p style={styles.welcomeText}><em>"{CONFIG.welcomeMessage}"</em></p>
        </div>
        <div style={styles.quickActions}>
          <button style={styles.actionButton} onClick={() => setActiveTab('directory')}>
            <div style={styles.actionIcon}>👥</div>
            <span style={styles.actionLabel}>Directory</span>
          </button>
          <a href={CONFIG.givingUrl} target="_blank" rel="noopener noreferrer" style={styles.actionButton}>
            <div style={styles.actionIcon}>💝</div>
            <span style={styles.actionLabel}>Give</span>
          </a>
          <a href={CONFIG.calendarUrl} target="_blank" rel="noopener noreferrer" style={styles.actionButton}>
            <div style={styles.actionIcon}>📅</div>
            <span style={styles.actionLabel}>Calendar</span>
          </a>
        </div>
        <div style={styles.infoSection}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>📍 Visit Us</h3>
            <p style={styles.infoText}>{CONFIG.address}</p>
          </div>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>📞 Contact</h3>
            <p style={styles.infoText}>{CONFIG.phone}</p>
            <a href={`mailto:${CONFIG.email}`} style={styles.emailLink}>{CONFIG.email}</a>
          </div>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>⛪ Worship</h3>
            <p style={styles.infoText}>{CONFIG.worshipTime}</p>
            <p style={styles.infoTextSmall}>In-Person & Online</p>
          </div>
        </div>
        <div style={styles.valuesSection}>
          <h3 style={styles.valuesSectionTitle}>Our Values</h3>
          <div style={styles.valuesGrid}>
            <div style={styles.valueChip}>Open & Affirming</div>
            <div style={styles.valueChip}>Inclusive Worship</div>
            <div style={styles.valueChip}>Community</div>
            <div style={styles.valueChip}>Service</div>
          </div>
        </div>
      </div>
    );
  } else if (activeTab === 'directory' && !isDirectoryAuthenticated) {
    content = (
      <div style={styles.loginContainer}>
        <div style={styles.loginHeader}>
          <h2 style={styles.loginTitle}>Church Directory</h2>
          <p style={styles.loginSubtitle}>Members Only Access</p>
        </div>
        <div style={styles.loginCard}>
          <div style={styles.lockIcon}>🔒</div>
          <h3 style={styles.loginCardTitle}>Enter Directory Password</h3>
          <p style={styles.loginCardText}>The directory contains private contact information and is protected for member privacy.</p>
          <input
            type="password"
            placeholder="Enter password..."
            value={directoryPassword}
            onChange={(e) => setDirectoryPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDirectoryLogin()}
            style={styles.passwordInputField}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {directoryPasswordError && <p style={styles.loginError}>{directoryPasswordError}</p>}
          <button style={styles.loginButton} onClick={handleDirectoryLogin}>Access Directory</button>
          <p style={styles.loginHelp}>Don't have the password? Contact the church office.</p>
        </div>
      </div>
    );
  } else if (activeTab === 'directory' && isDirectoryAuthenticated) {
    content = (
      <div>
        <div style={styles.directoryHeader}>
          <h2 style={styles.directoryTitle}>Church Directory</h2>
          <p style={styles.directorySubtitle}>
            {isLoading ? 'Loading...' : `${filteredDirectory.length} members`}
          </p>
          <button style={styles.logoutButton} onClick={handleDirectoryLogout}>🔓 Log Out</button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div style={styles.loadingContainer}>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading directory...</p>
          </div>
        )}

        {/* Error state */}
        {loadError && !isLoading && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{loadError}</p>
            <button style={styles.retryButton} onClick={loadDirectory}>Try Again</button>
          </div>
        )}

        {/* Directory content */}
        {!isLoading && !loadError && (
          <>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {searchTerm && <button onClick={() => setSearchTerm('')} style={styles.clearSearch}>✕</button>}
            </div>
            <div style={styles.directoryList}>
              {categoryOrder.map(category => {
                const people = groupedDirectory[category];
                if (!people || people.length === 0) return null;
                return (
                  <div key={category} style={styles.categorySection}>
                    <h3 style={styles.categoryTitle}>{category}</h3>
                    <div style={styles.peopleGrid}>
                      {people.map(person => (
                        <div key={person.id} style={styles.personCard} onClick={() => setSelectedPerson(person)}>
                          <PersonPhoto person={person} size={56} fontSize={18} />
                          <div style={styles.personInfo}>
                            <h4 style={styles.personName}>{person.name}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              {filteredDirectory.length === 0 && directoryData.length > 0 && (
                <div style={styles.noResults}>
                  <p>No results found for "{searchTerm}"</p>
                  <button style={styles.clearSearchButton} onClick={() => setSearchTerm('')}>Clear Search</button>
                </div>
              )}
            </div>
          </>
        )}

        {selectedPerson && (
          <div style={styles.modalOverlay} onClick={() => setSelectedPerson(null)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button style={styles.modalClose} onClick={() => setSelectedPerson(null)}>✕</button>
              <PersonPhoto person={selectedPerson} size={120} fontSize={48} />
              <h3 style={styles.modalName}>{selectedPerson.name}</h3>
              <p style={styles.modalCategory}>{selectedPerson.category}</p>
              <div style={styles.modalContactInfo}>
                {selectedPerson.email && <div style={styles.contactRow}><span style={styles.contactLabel}>Email</span><a href={`mailto:${selectedPerson.email}`} style={styles.contactValue}>{selectedPerson.email}</a></div>}
                {selectedPerson.cellPhone && <div style={styles.contactRow}><span style={styles.contactLabel}>Cell</span><a href={`tel:${selectedPerson.cellPhone}`} style={styles.contactValue}>{selectedPerson.cellPhone}</a></div>}
                {selectedPerson.homePhone && <div style={styles.contactRow}><span style={styles.contactLabel}>Home</span><a href={`tel:${selectedPerson.homePhone}`} style={styles.contactValue}>{selectedPerson.homePhone}</a></div>}
                {selectedPerson.address && <div style={styles.contactRow}><span style={styles.contactLabel}>Address</span><span style={styles.contactValue}>{selectedPerson.address}</span></div>}
              </div>
              <div style={styles.modalActions}>
                {selectedPerson.email && <a href={`mailto:${selectedPerson.email}`} style={styles.modalButton}><span>✉️</span> Email</a>}
                {(selectedPerson.cellPhone || selectedPerson.homePhone) && <a href={`tel:${selectedPerson.cellPhone || selectedPerson.homePhone}`} style={styles.modalButton}><span>📞</span> Call</a>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (activeTab === 'give') {
    content = (
      <div>
        <div style={styles.giveHeader}>
          <div style={styles.giveIconLarge}>💝</div>
          <h2 style={styles.giveTitle}>Support Our Ministry</h2>
          <p style={styles.giveSubtitle}>Your generosity makes a difference in our community and beyond.</p>
        </div>
        <div style={styles.giveCard}>
          <p style={styles.giveQuote}>"But who am I, and who are my people, that we should be able to give as generously as this? Everything comes from you, and we have given you only what comes from your hand."</p>
          <p style={styles.giveReference}>— 1 Chronicles 29:14</p>
        </div>
        <a href={CONFIG.givingUrl} target="_blank" rel="noopener noreferrer" style={styles.giveButton}>Give Online with Givelify</a>
        <div style={styles.giveOptions}>
          <h3 style={styles.giveOptionsTitle}>Other Ways to Give</h3>
          <div style={styles.giveOption}>
            <span style={styles.giveOptionIcon}>🏛️</span>
            <div><h4 style={styles.giveOptionLabel}>In Person</h4><p style={styles.giveOptionText}>During Sunday worship</p></div>
          </div>
          <div style={styles.giveOption}>
            <span style={styles.giveOptionIcon}>✉️</span>
            <div><h4 style={styles.giveOptionLabel}>By Mail</h4><p style={styles.giveOptionText}>{CONFIG.address}</p></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.appContainer}>
      <div style={styles.mainContent}>{content}</div>
      <nav style={styles.bottomNav}>
        <button style={styles.navButton} onClick={() => setActiveTab('home')}>
          <span style={styles.navIcon}>🏠</span>
          <span style={{...styles.navLabel, color: activeTab === 'home' ? '#4C7273' : '#777'}}>Home</span>
        </button>
        <button style={styles.navButton} onClick={() => setActiveTab('directory')}>
          <span style={styles.navIcon}>👥</span>
          <span style={{...styles.navLabel, color: activeTab === 'directory' ? '#4C7273' : '#777'}}>Directory</span>
        </button>
        <button style={styles.navButton} onClick={() => setActiveTab('give')}>
          <span style={styles.navIcon}>💝</span>
          <span style={{...styles.navLabel, color: activeTab === 'give' ? '#4C7273' : '#777'}}>Give</span>
        </button>
      </nav>
    </div>
  );
};

export default ChurchApp;
