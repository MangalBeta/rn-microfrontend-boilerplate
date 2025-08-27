import AsyncStorage from '@react-native-async-storage/async-storage';
import Keychain from 'react-native-keychain';

class StorageService {
  // Regular AsyncStorage methods
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting item in AsyncStorage:', error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error getting item from AsyncStorage:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
      throw error;
    }
  }

  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys from AsyncStorage:', error);
      return [];
    }
  }

  async multiGet(keys: string[]): Promise<[string, string | null][]> {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error('Error getting multiple items from AsyncStorage:', error);
      return [];
    }
  }

  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error setting multiple items in AsyncStorage:', error);
      throw error;
    }
  }

  async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error removing multiple items from AsyncStorage:', error);
      throw error;
    }
  }

  // Object storage methods
  async setObject(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await this.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error setting object in AsyncStorage:', error);
      throw error;
    }
  }

  async getObject<T = any>(key: string): Promise<T | null> {
    try {
      const jsonValue = await this.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting object from AsyncStorage:', error);
      return null;
    }
  }

  // Secure storage methods using Keychain
  async setSecureItem(key: string, value: string): Promise<void> {
    try {
      await Keychain.setInternetCredentials(key, key, value);
    } catch (error) {
      console.error('Error setting secure item:', error);
      throw error;
    }
  }

  async getSecureItem(key: string): Promise<string | null> {
    try {
      const credentials = await Keychain.getInternetCredentials(key);
      if (credentials && credentials.password) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error getting secure item:', error);
      return null;
    }
  }

  async removeSecureItem(key: string): Promise<void> {
    try {
      await Keychain.resetInternetCredentials(key);
    } catch (error) {
      console.error('Error removing secure item:', error);
      throw error;
    }
  }

  async hasSecureItem(key: string): Promise<boolean> {
    try {
      const credentials = await Keychain.getInternetCredentials(key);
      return credentials !== false;
    } catch (error) {
      console.error('Error checking secure item:', error);
      return false;
    }
  }

  async clearSecureStorage(): Promise<void> {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.error('Error clearing secure storage:', error);
      throw error;
    }
  }

  // Secure object storage methods
  async setSecureObject(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await this.setSecureItem(key, jsonValue);
    } catch (error) {
      console.error('Error setting secure object:', error);
      throw error;
    }
  }

  async getSecureObject<T = any>(key: string): Promise<T | null> {
    try {
      const jsonValue = await this.getSecureItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting secure object:', error);
      return null;
    }
  }

  // Biometric authentication methods
  async setBiometricItem(key: string, value: string): Promise<void> {
    try {
      await Keychain.setInternetCredentials(key, key, value, {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
        authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
      });
    } catch (error) {
      console.error('Error setting biometric item:', error);
      throw error;
    }
  }

  async getBiometricItem(key: string): Promise<string | null> {
    try {
      const credentials = await Keychain.getInternetCredentials(key, {
        authenticationType: Keychain.AUTHENTICATION_TYPE.BIOMETRICS,
        showModal: true,
        kLocalizedFallbackTitle: 'Use Passcode',
      });
      
      if (credentials && credentials.password) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error getting biometric item:', error);
      return null;
    }
  }

  async isBiometricAvailable(): Promise<boolean> {
    try {
      const biometryType = await Keychain.getSupportedBiometryType();
      return biometryType !== null;
    } catch (error) {
      console.error('Error checking biometric availability:', error);
      return false;
    }
  }

  async getBiometryType(): Promise<string | null> {
    try {
      return await Keychain.getSupportedBiometryType();
    } catch (error) {
      console.error('Error getting biometry type:', error);
      return null;
    }
  }

  // Utility methods
  async getStorageSize(): Promise<number> {
    try {
      const keys = await this.getAllKeys();
      const items = await this.multiGet(keys);
      let totalSize = 0;
      
      items.forEach(([key, value]) => {
        if (value) {
          totalSize += key.length + value.length;
        }
      });
      
      return totalSize;
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return 0;
    }
  }

  async exportData(): Promise<{[key: string]: any}> {
    try {
      const keys = await this.getAllKeys();
      const items = await this.multiGet(keys);
      const data: {[key: string]: any} = {};
      
      items.forEach(([key, value]) => {
        if (value) {
          try {
            data[key] = JSON.parse(value);
          } catch {
            data[key] = value;
          }
        }
      });
      
      return data;
    } catch (error) {
      console.error('Error exporting data:', error);
      return {};
    }
  }

  async importData(data: {[key: string]: any}): Promise<void> {
    try {
      const keyValuePairs: [string, string][] = Object.entries(data).map(([key, value]) => [
        key,
        typeof value === 'string' ? value : JSON.stringify(value),
      ]);
      
      await this.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  }
}

export const storageService = new StorageService();
export default storageService;

