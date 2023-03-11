
const AppVersionService = {

    async getVersion() {
        var response =  await fetch('version');
        return await response.json();
    }
}

export default AppVersionService;