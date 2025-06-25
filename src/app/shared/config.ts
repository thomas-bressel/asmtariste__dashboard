const userApiEnv = {
    local: 'http://localhost:5002',
    production: 'http://85.31.238.192:5002',
}
const contentApiEnv = {
    local: 'http://localhost:5001',
    production: 'http://85.31.238.192:5001'
}

export const USER_API_URI: string = userApiEnv.local;
export const CONTENT_API_URI: string = contentApiEnv.local;

