import express from "express";
import cors from "cors";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://TaskDesk:Reacttaskdesk@taskdesk.leqvb.mongodb.net/Tasks?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected");
  }
);

const TaskSchema = mongoose.Schema({
  title: String,
  description: String,
});

const TaskDesk = new mongoose.model("Task", TaskSchema);

const app = express();
app.use(express.urlencoded());
app.use(express.json());

app.use(cors());

app.get("/api/getAll", (req, res) => {
  TaskDesk.find({}, (err, TaskDeskList) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(TaskDeskList);
    }
  });
});

app.post("/api/addNew", (req, res) => {
  const { title, content } = req.body;

  const TaskDeskObj = new TaskDesk({
    title: title,
    description: content,
  });

  TaskDeskObj.save((err) => {
    if (err) {
      console.log("Error Occured");
    }
    TaskDesk.find({}, (err, TaskDeskList) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(TaskDeskList);
      }
    });
  });
});

app.post("/api/delete", (req, res) => {
  const { id } = req.body;

  TaskDesk.deleteOne({ _id: id }, () => {
    TaskDesk.find({}, (err, TaskDeskList) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(TaskDeskList);
      }
    });
  });
});

app.listen(8000, () => {
  console.log("Backend created at port 8000");
});
