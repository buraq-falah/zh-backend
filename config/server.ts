import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: (() => {
      const keys = env('APP_KEYS', '');
      if (!keys) return [];
      // If it looks like a JSON array (starts with '['), parse it
      if (keys.trim().startsWith('[')) {
        try {
          return JSON.parse(keys);
        } catch {
          return keys.split(',').map(k => k.trim());
        }
      }
      // Otherwise split by comma
      return keys.split(',').map(k => k.trim());
    })(),
  },
});

export default config;