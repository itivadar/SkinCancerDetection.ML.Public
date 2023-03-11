const AppStatsService = {
    async getStats() {
        var response = await fetch('stats');
        
        return await response.json();
    }
}

export default AppStatsService;