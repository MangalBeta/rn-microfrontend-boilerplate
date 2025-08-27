import {Platform, Dimensions, Appearance} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {storageService} from '@services/StorageService';

interface AppInitializationData {
  isFirstLaunch: boolean;
  deviceInfo: {
    platform: 'ios' | 'android';
    osVersion: string;
    appVersion: string;
    buildNumber: string;
    deviceId: string;
    isTablet: boolean;
  };
  systemTheme: 'light' | 'dark';
}

class AppInitializer {
  async initializeApp(): Promise<AppInitializationData> {
    try {
      // Check if this is the first launch
      const isFirstLaunch = await this.checkFirstLaunch();
      
      // Get device information
      const deviceInfo = await this.getDeviceInfo();
      
      // Get system theme
      const systemTheme = Appearance.getColorScheme() || 'light';
      
      // Initialize app settings if first launch
      if (isFirstLaunch) {
        await this.initializeFirstLaunchSettings();
      }
      
      // Update app version if needed
      await this.updateAppVersion(deviceInfo.appVersion, deviceInfo.buildNumber);
      
      return {
        isFirstLaunch,
        deviceInfo,
        systemTheme,
      };
    } catch (error) {
      console.error('App initialization error:', error);
      throw error;
    }
  }

  private async checkFirstLaunch(): Promise<boolean> {
    try {
      const hasLaunchedBefore = await storageService.getItem('hasLaunchedBefore');
      
      if (!hasLaunchedBefore) {
        await storageService.setItem('hasLaunchedBefore', 'true');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error checking first launch:', error);
      return false;
    }
  }

  private async getDeviceInfo(): Promise<AppInitializationData['deviceInfo']> {
    try {
      const {width, height} = Dimensions.get('window');
      const isTablet = Math.min(width, height) >= 768;
      
      const [
        appVersion,
        buildNumber,
        systemVersion,
        deviceId,
      ] = await Promise.all([
        DeviceInfo.getVersion(),
        DeviceInfo.getBuildNumber(),
        DeviceInfo.getSystemVersion(),
        DeviceInfo.getUniqueId(),
      ]);

      return {
        platform: Platform.OS as 'ios' | 'android',
        osVersion: systemVersion,
        appVersion,
        buildNumber,
        deviceId,
        isTablet,
      };
    } catch (error) {
      console.error('Error getting device info:', error);
      return {
        platform: Platform.OS as 'ios' | 'android',
        osVersion: Platform.Version.toString(),
        appVersion: '1.0.0',
        buildNumber: '1',
        deviceId: 'unknown',
        isTablet: false,
      };
    }
  }

  private async initializeFirstLaunchSettings(): Promise<void> {
    try {
      // Set default settings for first launch
      const defaultSettings = {
        theme: 'auto',
        language: 'en',
        notifications: {
          push: true,
          sound: true,
          vibration: true,
          badge: true,
        },
        privacy: {
          analytics: true,
          crashReporting: true,
        },
      };

      await storageService.setObject('appSettings', defaultSettings);
      
      // Set first launch timestamp
      await storageService.setItem('firstLaunchTimestamp', Date.now().toString());
      
      console.log('First launch settings initialized');
    } catch (error) {
      console.error('Error initializing first launch settings:', error);
    }
  }

  private async updateAppVersion(currentVersion: string, currentBuild: string): Promise<void> {
    try {
      const storedVersion = await storageService.getItem('appVersion');
      const storedBuild = await storageService.getItem('buildNumber');
      
      if (storedVersion !== currentVersion || storedBuild !== currentBuild) {
        // App has been updated
        await storageService.setItem('appVersion', currentVersion);
        await storageService.setItem('buildNumber', currentBuild);
        await storageService.setItem('lastUpdateTimestamp', Date.now().toString());
        
        // Perform any update-specific tasks here
        await this.handleAppUpdate(storedVersion, currentVersion);
        
        console.log(`App updated from ${storedVersion} to ${currentVersion}`);
      }
    } catch (error) {
      console.error('Error updating app version:', error);
    }
  }

  private async handleAppUpdate(oldVersion: string | null, newVersion: string): Promise<void> {
    try {
      // Perform any necessary migrations or cleanup
      
      if (!oldVersion) {
        // First installation
        console.log('First app installation detected');
        return;
      }
      
      // Version-specific update logic
      if (this.isVersionGreater(newVersion, oldVersion)) {
        console.log(`Updating from ${oldVersion} to ${newVersion}`);
        
        // Example: Clear cache for major updates
        if (this.isMajorUpdate(oldVersion, newVersion)) {
          await this.clearAppCache();
        }
        
        // Example: Migrate settings for specific versions
        await this.migrateSettings(oldVersion, newVersion);
      }
    } catch (error) {
      console.error('Error handling app update:', error);
    }
  }

  private isVersionGreater(version1: string, version2: string): boolean {
    const v1Parts = version1.split('.').map(Number);
    const v2Parts = version2.split('.').map(Number);
    
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = v1Parts[i] || 0;
      const v2Part = v2Parts[i] || 0;
      
      if (v1Part > v2Part) return true;
      if (v1Part < v2Part) return false;
    }
    
    return false;
  }

  private isMajorUpdate(oldVersion: string, newVersion: string): boolean {
    const oldMajor = parseInt(oldVersion.split('.')[0], 10);
    const newMajor = parseInt(newVersion.split('.')[0], 10);
    
    return newMajor > oldMajor;
  }

  private async clearAppCache(): Promise<void> {
    try {
      // Clear non-essential cached data
      const keysToKeep = [
        'hasLaunchedBefore',
        'appVersion',
        'buildNumber',
        'firstLaunchTimestamp',
        'appSettings',
        'userPreferences',
      ];
      
      const allKeys = await storageService.getAllKeys();
      const keysToRemove = allKeys.filter(key => !keysToKeep.includes(key));
      
      if (keysToRemove.length > 0) {
        await storageService.multiRemove(keysToRemove);
        console.log(`Cleared ${keysToRemove.length} cache entries`);
      }
    } catch (error) {
      console.error('Error clearing app cache:', error);
    }
  }

  private async migrateSettings(oldVersion: string, newVersion: string): Promise<void> {
    try {
      // Example migration logic
      const settings = await storageService.getObject('appSettings');
      
      if (settings) {
        let migrated = false;
        
        // Example: Add new setting in version 1.1.0
        if (this.isVersionGreater('1.1.0', oldVersion) && !settings.newFeature) {
          settings.newFeature = {
            enabled: true,
          };
          migrated = true;
        }
        
        if (migrated) {
          await storageService.setObject('appSettings', settings);
          console.log('Settings migrated successfully');
        }
      }
    } catch (error) {
      console.error('Error migrating settings:', error);
    }
  }

  async getAppInfo(): Promise<{
    version: string;
    buildNumber: string;
    firstLaunchDate: Date | null;
    lastUpdateDate: Date | null;
  }> {
    try {
      const [
        version,
        buildNumber,
        firstLaunchTimestamp,
        lastUpdateTimestamp,
      ] = await Promise.all([
        storageService.getItem('appVersion'),
        storageService.getItem('buildNumber'),
        storageService.getItem('firstLaunchTimestamp'),
        storageService.getItem('lastUpdateTimestamp'),
      ]);

      return {
        version: version || '1.0.0',
        buildNumber: buildNumber || '1',
        firstLaunchDate: firstLaunchTimestamp ? new Date(parseInt(firstLaunchTimestamp, 10)) : null,
        lastUpdateDate: lastUpdateTimestamp ? new Date(parseInt(lastUpdateTimestamp, 10)) : null,
      };
    } catch (error) {
      console.error('Error getting app info:', error);
      return {
        version: '1.0.0',
        buildNumber: '1',
        firstLaunchDate: null,
        lastUpdateDate: null,
      };
    }
  }
}

const appInitializer = new AppInitializer();

export const initializeApp = () => appInitializer.initializeApp();
export const getAppInfo = () => appInitializer.getAppInfo();

export default appInitializer;

