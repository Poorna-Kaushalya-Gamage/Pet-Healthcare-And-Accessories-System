require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const userDataRouter = require("./Routes/Display Data Routes");
const otpRouter = require("./Routes/Display Otp Route");
const petRouter = require("./Routes/Display Pet Route");
const employeesRouter = require("./Routes/Display Employee Routes");
const dotenv = require("./Routes/env");
const path = require("path");
const twilio = require("twilio");

//Delivery Management
const router1 = require("./Routes/DeliveryRouters");
const router2 = require("./Routes/TrackingRouter");
const router3 = require("./Routes/DelayRouters");
const router4 = require("./Routes/OrderRouter");

//pet health tracking
const router5 = require("./Routes/PetRecordBookRoute");
const router6 = require("./Routes/UserReminderRoute");
const router7 = require("./Routes/NoteRoute");
const router8 = require("./Routes/DoWarmingRoute");
const router9 = require("./Routes/VaccinationRecRoute");
const router10 = require("./Routes/CalorieCalcRoute");

const app = express();
const cors = require("cors");
const port = process.env.port || 5000;

// Importing reminderSchema from UserReminderModel
const reminderSchema = require("./Model/UserReminderModel").schema;

const router = require("./Routes/PetProductRoutes");
const disrouter = require("./Routes/DiscountRoutes");
const rerouter = require("./Routes/ReorderRoutes");

// Connect Middleware
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
app.use("/files", express.static("files"));
app.use("/products", router);
app.use("/discounts", disrouter);
app.use("/reorders", rerouter);
app.use("/users", userDataRouter);
app.use("/otps", otpRouter);
app.use("/pets", petRouter);
app.use("/employees", employeesRouter);
app.use("/profileimage", express.static("profileimage"));

//Delivery Management Connect Middleware
app.use("/delivery", router1);
app.use("/tracking", router2);
app.use("/delay", router3);
app.use("/transaction", router4);

//pet health tracking Middleware
app.use("/PetRecordBooks", router5);
app.use("/UserReminders", router6);
app.use("/NoteBook",router7);
app.use("/DoWarmingRec",router8);
app.use("/VaccinationRec",router9);
app.use("/CalorieCalc",router10);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Set up a route for file uploads
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  return res
    .status(200)
    .json({ imageName: req.file.originalname, imageUrl: req.file.path });
});

const storagef = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    return cb(null, uniqueSuffix + file.originalname);
  },
});

//Insert model part
require("./Model/ReportModel");
const reportSchema = mongoose.model("inventoryreports");
const uploadp = multer({ storage: storagef });

app.post("/uploadpfile", uploadp.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await reportSchema.create({ title: title, pdf: fileName });
    console.log("pdf Uploaded successfully");
    res.send({ status: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

app.get("/getpfiles", async (req, res) => {
  try {
    reportSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

// Multer configuration for file upload
const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profileimage/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload3 = multer({ storage3 });

// Set up a route for file uploads
app.post("/profileimage", upload3.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  return res
    .status(200)
    .json({ imageName: req.file.originalname, imageUrl: req.file.path });
});

const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./fileds");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

//Insert Model part
require("./Model/PdfModel");
const pdfSchema = mongoose.model("PdfDetails");
const upload1 = multer({ storage1 });

app.post("/uploadfile", upload1.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const pdf = req.file.filename; // Corrected to req.file.filename

  try {
    await pdfSchema.create({ title: title, pdf: pdf });
    console.log("pdf Uploaded successfully");
    res.send({ status: 200 });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

app.get("/getFile", async (req, res) => {
  try {
    const data = await pdfSchema.find({});
    res.send({ status: 200, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "error" });
  }
});

mongoose
  .connect(
    "mongodb+srv://itp143project:PROJECT143@cluster0.pxkujdn.mongodb.net/petpulse"
  )
  .then(() => console.log("Database Connected Successfully..."))
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

  const Reminder = mongoose.model("userReminder", reminderSchema); // Create the model
  setInterval(async () => {
    try {
        const reminderList = await Reminder.find({}); // Use async/await to wait for the query to complete
        if (reminderList) {
            reminderList.forEach(async (reminder) => {
                if (!reminder.isReminded) {
                    const now = new Date();
                    if ((new Date(reminder.remindAt) - now) < 0) {
                        await Reminder.findByIdAndUpdate(reminder._id, { isReminded: true });
                        const accountSid = process.env.ACCOUNT_SID;
                        const authToken = process.env.AUTH_TOKEN;

                        // Check if required environment variables are defined
                        if (!accountSid || !authToken) {
                            console.error("Twilio account SID or auth token is missing. Please check your environment variables.");
                            process.exit(1); // Exit the process with an error code
                        }

                        const client = require('twilio')(accountSid, authToken);

                        // Now you can use the Twilio client without worrying about missing credentials
                        client.messages
                            .create({
                                body: reminder.reminderMsg,
                                from: 'whatsapp:+14155238886',
                                to: 'whatsapp:+94123456789' //add your whats app number
                            })
                            .then(message => console.log(message.sid))
                            .catch(error => console.error(error));
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}, 1000); // Check every 1 second