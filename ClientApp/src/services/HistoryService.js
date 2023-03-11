const HistoryService = {
  async getHistoryForUser(token, filter) {
    let url = "image/history/";

    if (filter !== undefined && filter !== null) {
      url = url + filter;
    }

    var response = await fetch(url, {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    return await response.json();
  },
};

export default HistoryService;
