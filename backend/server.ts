import mongoose from "mongoose";
import app from "./app";
const port = process.env.PORT || 3000;
const LOCALDB = process.env.DATABASE_LOCAL as string;
mongoose.connect(LOCALDB).then(() => {
  console.log("Db successfully connected");
});
app.listen(port, () => {
  console.log("server running on", port);
});
