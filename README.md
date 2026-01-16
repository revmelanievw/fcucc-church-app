# FCUCC Church App (Secure PWA)

A password-protected Progressive Web App for First Congregational United Church of Christ, Cedar Rapids, Iowa.

## Security Features

- 🔒 **Password-protected directory** - Members must enter a password to view contact info
- 🔐 **Group passwords** - Each ministry team has its own private space
- ⏱️ **Session management** - Stay logged in for 1 week (configurable)
- 🚪 **Logout option** - Members can log out when using shared devices

## Default Passwords (CHANGE THESE!)

| Area | Default Password |
|------|------------------|
| **Directory** | `fcucc2025` |
| Church Council | `council2025` |
| Deacons | `deacons2025` |
| Choir & Music | `music2025` |
| Youth Leaders | `youth2025` |
| Welcome Team | `welcome2025` |

**⚠️ IMPORTANT: Change all passwords in `src/App.jsx` before going live!**

## How to Change Passwords

1. Open `src/App.jsx`
2. Find the `SECURITY` section (around line 25) for the directory password
3. Find the `GROUPS` section (around line 35) for group passwords
4. Change the passwords
5. Commit to GitHub - Vercel auto-deploys

## App Features

- 📱 **Install on any phone** - Works like a native app
- 👥 **Church Directory** - Password-protected member photos and contact info
- 💝 **Online Giving** - Quick link to Givelify
- 📅 **Events Calendar** - Stay updated
- 💬 **Ministry Groups** - Password-protected team spaces
- 📴 **Works Offline** - Basic functionality without internet

## Session Settings

By default, members stay logged into the directory for 1 week. To change this:

```javascript
// In src/App.jsx, find SECURITY section:
sessionDuration: 168, // hours (168 = 1 week)

// Set to 0 to require login every time
sessionDuration: 0,

// Set to 24 for daily login
sessionDuration: 24,
```

## Privacy Notes

- The directory password provides basic access control
- It's not bank-level security, but prevents casual public access
- Recommend changing passwords annually
- Members should log out when using shared/public devices
