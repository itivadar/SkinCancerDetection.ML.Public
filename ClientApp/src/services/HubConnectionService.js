import { HubConnectionBuilder } from "@microsoft/signalr";

const HubConnectionService = {
  async connect(hubUrl, channelId, onMessageReceived) {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:44336/hubs/" + hubUrl)
      .withAutomaticReconnect()
      .build();

    if (connection._connectionState !== "Connected") {
      await connection
        .start()
        .then((result) => {
          console.log("Connected at " + hubUrl);
          connection.on("ReceiveMessage", (message) => {
            onMessageReceived(message);
          });

          connection.invoke("JoinChannel", channelId);
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  },
};

export default HubConnectionService;
