export const setBackendEnvAPI = () => {
    const client = process.env.NEXT_PUBLIC_API_URL;
    const server = process.env.API_URL;

    return client ? client : server;
};
