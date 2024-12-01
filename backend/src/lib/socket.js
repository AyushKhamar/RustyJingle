import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
  const io = new Server(server, {
    //todo from where the request will be coming from the frontend
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  //todo data we want to store in between the chat of users
  const userSockets = new Map(); // { userId: socketId}
  const userActivities = new Map(); // {userId: activity}
  //todo these are triggers, on connection of new user do thsi, on his listening to a song update acitvity like this
  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      // broadcast to all connected sockets that this user just logged in
      //todo io is used to broadcast the data in the channel, and socket.emit is used to communicate with the connected user. To show him data or who else is connected or other info.
      io.emit("user_connected", userId);

      socket.emit("users_online", Array.from(userSockets.keys()));

      io.emit("activities", Array.from(userActivities.entries()));
    });
    //todo these activities will be given from the frontend using these tag names.
    socket.on("update_activity", ({ userId, activity }) => {
      console.log("activity updated", userId, activity);
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data) => {
      try {
        const { senderId, receiverId, content } = data;

        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });

        // send to receiver in realtime, if they're online
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          //todo directed send, i.e broadcast this message to this socketId and emit this message to the user who is on that socket
          io.to(receiverSocketId).emit("receive_message", message);
        }
        //todo broadcast to the current active user an acknowledgement
        socket.emit("message_sent", message);
      } catch (error) {
        console.error("Message error:", error);
        socket.emit("message_error", error.message);
      }
    });

    socket.on("disconnect", () => {
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        // find disconnected user
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
