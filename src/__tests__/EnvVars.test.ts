import { test, expect } from 'vitest';
import { mockEnvVars, restoreEnvVars } from '../utils/mockEnv';

// Current expected environment variables and their values
const expectedEnvVars = {
  VITE_BACKEND_URL: 'https://blog-site-backend.netlify.app/.netlify/functions',
  VITE_FETCH_REMOTE_DATA: 'true',
};

test('checks environment variables in .env', () => {
  Object.entries(expectedEnvVars).forEach(([key, value]) => {
    expect(import.meta.env[key]).toBe(value);
  });
});

test('mocks environment variables and uses the mocked values', () => {
  // Mocking a new value for the environment variable
  mockEnvVars({
    VITE_FETCH_REMOTE_DATA: 'nonesence', // Overriding the value
    VITE_CUSTOM_ENV_VAR: 'mockedValueNonsence', // Adding a new custom variable
  });

  try {
    // Check that mocked values are being used
    expect(import.meta.env.VITE_FETCH_REMOTE_DATA).toBe('nonesence');
    expect(import.meta.env.VITE_CUSTOM_ENV_VAR).toBe('mockedValueNonsence');
  } finally {
    // Restore the original environment
    restoreEnvVars();
  }
});
