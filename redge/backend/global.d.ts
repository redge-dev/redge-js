export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      BETTER_AUTH_URL: string;
      BETTER_AUTH_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}
