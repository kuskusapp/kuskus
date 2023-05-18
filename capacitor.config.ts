import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.kuskus',
  appName: 'kuskus',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
