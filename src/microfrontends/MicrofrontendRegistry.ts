import {MicrofrontendModule, MicrofrontendRegistry} from '@types/microfrontend';

// Auth Microfrontend
import AuthModule from './auth/AuthModule';

// Profile Microfrontend
import ProfileModule from './profile/ProfileModule';

// Settings Microfrontend
import SettingsModule from './settings/SettingsModule';

// Notifications Microfrontend
import NotificationsModule from './notifications/NotificationsModule';


// Shop Microfrontend
import ShopModule from './shop/ShopModule';

class MicrofrontendRegistryManager {
  private registry: MicrofrontendRegistry = {};

  constructor() {
    this.registerDefaultModules();
  }

  private registerDefaultModules() {
    this.register('auth', AuthModule);
    this.register('profile', ProfileModule);
    this.register('settings', SettingsModule);
    this.register('notifications', NotificationsModule);
        this.register('shop', ShopModule);

  }

  register(name: string, module: MicrofrontendModule): void {
    if (this.registry[name]) {
      console.warn(`Microfrontend module '${name}' is already registered. Overwriting...`);
    }
    
    this.registry[name] = module;
    console.log(`Microfrontend module '${name}' registered successfully`);
  }

  unregister(name: string): void {
    if (this.registry[name]) {
      delete this.registry[name];
      console.log(`Microfrontend module '${name}' unregistered successfully`);
    } else {
      console.warn(`Microfrontend module '${name}' not found in registry`);
    }
  }

  get(name: string): MicrofrontendModule | undefined {
    return this.registry[name];
  }

  getAll(): MicrofrontendRegistry {
    return this.registry;
  }

  getAllNames(): string[] {
    return Object.keys(this.registry);
  }

  hasModule(name: string): boolean {
    return !!this.registry[name];
  }

  loadModule(name: string): Promise<MicrofrontendModule> {
    return new Promise((resolve, reject) => {
      const module = this.get(name);
      
      if (!module) {
        reject(new Error(`Microfrontend module '${name}' not found`));
        return;
      }

      // Check dependencies
      if (module.dependencies && module.dependencies.length > 0) {
        const missingDependencies = module.dependencies.filter(
          dep => !this.hasModule(dep)
        );
        
        if (missingDependencies.length > 0) {
          reject(new Error(
            `Missing dependencies for module '${name}': ${missingDependencies.join(', ')}`
          ));
          return;
        }
      }

      resolve(module);
    });
  }

  async loadModules(names: string[]): Promise<MicrofrontendModule[]> {
    const promises = names.map(name => this.loadModule(name));
    return Promise.all(promises);
  }

  validateModule(module: MicrofrontendModule): boolean {
    if (!module.name || !module.version || !module.component) {
      return false;
    }
    return true;
  }

  getModulesByPermission(permission: string): MicrofrontendModule[] {
    return Object.values(this.registry).filter(module =>
      module.permissions?.includes(permission)
    );
  }
}

export const microfrontendRegistry = new MicrofrontendRegistryManager();
export default microfrontendRegistry;



// Export all screens from registered microfrontends
export const MicrofrontendScreens = Object.values(microfrontendRegistry.getAll()).reduce(
  (acc, module) => {
    for (const screenName in module.screens) {
      acc[screenName] = module.screens[screenName];
    }
    return acc;
  },
  {} as Record<string, React.ComponentType<any>>
);

// Export all components from registered microfrontends
export const MicrofrontendComponents = Object.values(microfrontendRegistry.getAll()).reduce(
  (acc, module) => {
    if (module.components) {
      for (const componentName in module.components) {
        acc[componentName] = module.components[componentName];
      }
    }
    return acc;
  },
  {} as Record<string, React.ComponentType<any>>
);

// Export all hooks from registered microfrontends
export const MicrofrontendHooks = Object.values(microfrontendRegistry.getAll()).reduce(
  (acc, module) => {
    if (module.hooks) {
      for (const hookName in module.hooks) {
        acc[hookName] = module.hooks[hookName];
      }
    }
    return acc;
  },
  {} as Record<string, (...args: any[]) => any>
);

// Export all services from registered microfrontends
export const MicrofrontendServices = Object.values(microfrontendRegistry.getAll()).reduce(
  (acc, module) => {
    if (module.services) {
      for (const serviceName in module.services) {
        acc[serviceName] = module.services[serviceName];
      }
    }
    return acc;
  },
  {} as Record<string, any>
);

