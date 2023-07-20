const koa = require("koa");
const http = require("http");
const socket = require("socket.io");

const app = new koa();
const server = http.createServer(app.callback());
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("status", (status) => {
    console.log("status: ", status);
    io.emit(
      "status",
      status.map((item) => {
        return {
          ...item,
          temperature: Math.floor(Math.random() * 100),
        };
      })
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const SERVER_HOST = "localhost";
const SERVER_PORT = 8080;

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is running on ${SERVER_HOST}:${SERVER_PORT}`);
});
