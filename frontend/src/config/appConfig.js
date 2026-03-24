const appConfig = {
  appName: process.env.REACT_APP_NAME || 'Smart City Issue Reporting',
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '/api',
  apiTimeoutMs: Number(process.env.REACT_APP_API_TIMEOUT_MS || 15000),
  supportEmail: process.env.REACT_APP_SUPPORT_EMAIL || 'support@smartcity.local',
};

export default appConfig;