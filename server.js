const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponce = require('./src/service/ai.service');

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("ai-message", async (data) =>{
    console.log("Received message:", data.prompt);
    const responce = await generateResponce(data.prompt);
    console.log("responce", responce);
    socket.emit("ai-message-response", { responce });
  })
});

httpServer.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})