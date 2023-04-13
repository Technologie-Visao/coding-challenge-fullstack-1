// set default values if env variables are missing
const config = {
  API_BASE_URL: import.meta.env.API_BASE_URL || 'http://localhost:3000',
};

export default config;
