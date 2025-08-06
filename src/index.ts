import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;
wss.on("connection", function connection(socket) {
  socket.on("error", console.error);

  socket.on("message", function message(data, isBinary) {
    console.log("received: %s", data);

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log("user connected ", ++userCount);

  socket.send("Hello! Message From Server!!");
  // this is comment

  // Docker, redis, and more incomming
});
