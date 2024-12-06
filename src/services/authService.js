class AuthService {
    constructor(apiUrl = '') {
        this.apiUrl = apiUrl
    }

    async login(loginInfo, endpoint = '') {
        if (!this.apiUrl) {
            throw new Error('API URL is not available');
        }

        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`, {
                method: 'GET', // or 'POST' depending on your needs
                headers: {
                    'Content-Type': 'application/json',
                    // Add other headers like authorization if needed
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

}