const User = require("../Model/Display Data model");
const twilio = require("twilio");
const OTP = require("../Model/Otp Data Model");
const nodemailer = require("nodemailer");
const Preview = require("twilio/lib/rest/Preview");
const { Email, PASSWORD } = require("../Routes/env");
const Mailgen = require("mailgen");
const Pet = require("../Model/Pet Model");
const Employees = require("../Model/Admin Model");

//......Display data......
const getAllUsers = async (req, res, next) => {
  let Users;

  try {
    Users = await User.find();
  } catch (err) {
    console.log(err);
  }

  // Can't found users
  if (!Users) {
    return res.status(404).json({ message: "User not found" });
  }

  //Display all users
  return res.status(200).json({ Users });
};

//......Display users data in user dashboard......
const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error retrieving user:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//......Insert data......
const addusers = async (req, res, next) => {
  const {
    userimage,
    userRegNo,
    firstName,
    lastName,
    nic,
    password,
    username,
    email,
    phoneNo,
    usertAddress,
  } = req.body;

  let users;

  try {
    users = new User({
      userimage,
      userRegNo,
      firstName,
      lastName,
      nic,
      password,
      username,
      email,
      phoneNo,
      usertAddress,
    });
    await users.save();
  } catch (err) {
    console.log(err);
  }

  //Can't insert data
  if (!users) {
    return res.status(404).send({ message: "Can't Add users" });
  }
  return res.status(200).send({ users });
};

//......Get by Id......
const getById = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    console.log(err);
  }

  // Not in user
  if (!user) {
    return res.status(404).send({ message: "Unable to find users" });
  }
  return res.status(200).send({ user });
};

//......Update user data......
const updateuser = async (req, res, next) => {
  const id = req.params.id;
  const {
    userimage,
    userRegNo,
    firstName,
    lastName,
    nic,
    password,
    username,
    email,
    phoneNo,
    usertAddress,
  } = req.body;

  let user;

  try {
    user = await User.findByIdAndUpdate(id, {
      userimage: userimage,
      userRegNo: userRegNo,
      firstName: firstName,
      lastName: lastName,
      nic: nic,
      password: password,
      username: username,
      email: email,
      phoneNo: phoneNo,
      usertAddress: usertAddress,
    });
  } catch (err) {
    console.log(err);
  }

  // User not found
  if (!user) {
    return res.status(404).send({ message: "Unable to update user details" });
  }

  return res.status(200).send({ user });
};

//......Delete user data......
const deleteuser = async (req, res, next) => {
  const id = req.params.id;

  let user;

  try {
    user = await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  // User to delete
  if (!user) {
    return res.status(404).json({ message: "Unable to delete user details" });
  }

  return res.status(200).json({ user });
};

//....... User Login using email and password .......
const loginuser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      // If user found then these 2 cases
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    } else {
      // If user not found
      res.json("No records found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//.......User Login using email and otp .......
const loginotp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (otpRecord) {
      res.json("Success"); // OTP verification successful
    } else {
      res.json("Incorrect OTP"); // Incorrect OTP
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//......Insert OTP data......
const addotp = async (req, res, next) => {
  const { email, otp } = req.body;

  //..........................

  let configes = {
    service: "gmail",
    auth: {
      user: Email,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(configes);

  let MailGenarator = new Mailgen({
    theme: "default",
    product: {
      name: "Petpulse",
      link: "https://petpulse.js/",
    },
  });

  let response = {
    body: {
      name: email,
      intro: "Your OTP for account verification is:" + otp + ".",
      outro:
        "Please enter this OTP on the verification page within 1 minute to complete the login process.",
    },
  };

  let mail = MailGenarator.generate(response);

  let message = {
    from: Email,
    to: email,
    subject: "Account OTP Verification",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({});
    })
    .catch((error) => {});

  //..........................

  let otps;

  try {
    otps = new OTP({
      email,
      otp,
    });
    await otps.save();
  } catch (err) {
    console.log(err);
  }

  //Can't insert data
  if (!otps) {
    return res.status(404).send({ message: "Can't Add OTP" });
  }
  return res.status(200).send({ otps });
};

//......Insert pet data......
const addPet = async (req, res, next) => {
  const {
    name,
    type,
    breed,
    birthday,
    sex,
    weight,
    microchipId,
    color,
    owner,
    petImage,
  } = req.body;

  let pets;

  try {
    pets = new Pet({
      name,
      type,
      breed,
      birthday,
      sex,
      weight,
      microchipId,
      color,
      owner,
      petImage,
    });
    await pets.save();
  } catch (err) {
    console.log(err);
  }

  //Can't insert data
  if (!pets) {
    return res.status(404).send({ message: "Can't Add Pets" });
  }
  return res.status(200).send({ pets });
};

//......Display pet data......
const getAllPets = async (req, res, next) => {
  let Pets;

  try {
    Pets = await Pet.find();
  } catch (err) {
    console.log(err);
  }

  // Can't found users
  if (!Pets) {
    return res.status(404).json({ message: "Pet not found" });
  }

  //Display all users
  return res.status(200).json({ Pets });
};

//......Update pet data......
const updatepet = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    type,
    breed,
    birthday,
    sex,
    weight,
    microchipId,
    color,
    owner,
    petImage,
  } = req.body;

  let pets;

  try {
    pets = await Pet.findByIdAndUpdate(id, {
      name: name,
      type: type,
      breed: breed,
      birthday: birthday,
      sex: sex,
      weight: weight,
      microchipId: microchipId,
      color: color,
      owner: owner,
      petImage: petImage,
    });
  } catch (err) {
    console.log(err);
  }

  // User not found
  if (!pets) {
    return res.status(404).send({ message: "Unable to update pet details" });
  }

  return res.status(200).send({ pets });
};

//......Get by  pet Id......
const getBypetId = async (req, res, next) => {
  const id = req.params.id;

  let pets;

  try {
    pets = await Pet.findById(id);
  } catch (err) {
    console.log(err);
  }

  // Not in user
  if (!pets) {
    return res.status(404).send({ message: "Unable to find pets" });
  }
  return res.status(200).send({ pets });
};

//.....Get by  pet microchip Id......./
const getPetsBymicrochipId = async (req, res) => {
  const { microchipId } = req.params;

  try {
    const pets = await Pet.find({ microchipId: microchipId });

    if (!pets) {
      return res.status(404).json({ message: "Pet not found" });
    }

    return res.status(200).json({ pets });
  } catch (err) {
    console.error("Error retrieving user:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//......Delete pet data......
const deletepet = async (req, res, next) => {
  const id = req.params.id;

  let pets;

  try {
    pets = await Pet.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  // User to delete
  if (!pets) {
    return res.status(404).json({ message: "Unable to delete pets details" });
  }

  return res.status(200).json({ pets });
};

//.....Display pets data in user dashboard......./
const getPetsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const pets = await Pet.find({ owner: email });

    if (!pets) {
      return res.status(404).json({ message: "Pet not found" });
    }

    return res.status(200).json({ pets });
  } catch (err) {
    console.error("Error retrieving user:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//......Insert Employee data......
const addemployee = async (req, res, next) => {
  const {
    userimage,
    fullName,
    gender,
    dateOfBirth,
    address,
    phoneNumber,
    email,
    jobTitle,
    employeeID,
    department,
    startDate,
    employmentStatus,
    password,
  } = req.body;

  let employees;

  try {
    employees = new Employees({
      userimage,
      fullName,
      gender,
      dateOfBirth,
      address,
      phoneNumber,
      email,
      jobTitle,
      employeeID,
      department,
      startDate,
      employmentStatus,
      password,
    });
    await employees.save();
  } catch (err) {
    console.log(err);
  }

  //Can't insert data
  if (!employees) {
    return res.status(404).send({ message: "Can't Add Employees" });
  }
  return res.status(200).send({ employees });
};

//....... Admin Login using email and password .......
const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const employees = await Employees.findOne({ email: email });

    if (employees) {
      // If user found then these 2 cases
      if (employees.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    } else {
      // If user not found
      res.json("No records found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//......Display Employee data......
const getAllEmployees = async (req, res, next) => {
  let employees;

  try {
    employees = await Employees.find();
  } catch (err) {
    console.log(err);
  }

  // Can't found employees
  if (!employees) {
    return res.status(404).json({ message: "Employee not found" });
  }

  //Display all employees
  return res.status(200).json({ employees });
};

//......Display employees data in employees dashboard......
const getemployeesByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const employees = await Employees.findOne({ email: email });

    if (!employees) {
      return res.status(404).json({ message: "Employees not found" });
    }

    return res.status(200).json({ employees });
  } catch (err) {
    console.error("Error retrieving employees:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//......Get by employees Id......
const getByemployeesId = async (req, res, next) => {
  const id = req.params.id;

  let employees;

  try {
    employees = await Employees.findById(id);
  } catch (err) {
    console.log(err);
  }

  // Not in user
  if (!employees) {
    return res.status(404).send({ message: "Unable to find employees" });
  }
  return res.status(200).send({ employees });
};

//......Update employees data......
const updateemployees = async (req, res, next) => {
  const id = req.params.id;
  const {
    fullName,
    gender,
    dateOfBirth,
    address,
    phoneNumber,
    email,
    jobTitle,
    employeeID,
    department,
    startDate,
    employmentStatus,
    password,
  } = req.body;

  let employees;

  try {
    employees = await Employees.findByIdAndUpdate(id, {
      fullName: fullName,
      gender: gender,
      dateOfBirth: dateOfBirth,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      jobTitle: jobTitle,
      employeeID: employeeID,
      department:department,
      startDate: startDate,
      employmentStatus: employmentStatus,
      password: password,
    });
  } catch (err) {
    console.log(err);
  }

  // User not found
  if (!employees) {
    return res
      .status(404)
      .send({ message: "Unable to update employees details" });
  }

  return res.status(200).send({ employees });
};

//......Delete user data......
const deleteemployees = async (req, res, next) => {
  const id = req.params.id;

  let employees;

  try {
    employees = await Employees.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  // User to delete
  if (!employees) {
    return res
      .status(404)
      .json({ message: "Unable to delete employees details" });
  }

  return res.status(200).json({ employees });
};

exports.getAllUsers = getAllUsers;
exports.addusers = addusers;
exports.getById = getById;
exports.updateuser = updateuser;
exports.deleteuser = deleteuser;
exports.loginuser = loginuser;
exports.loginotp = loginotp;
exports.addotp = addotp;
exports.getUserByEmail = getUserByEmail;
exports.addPet = addPet;
exports.getAllPets = getAllPets;
exports.updatepet = updatepet;
exports.getBypetId = getBypetId;
exports.getPetsBymicrochipId = getPetsBymicrochipId;
exports.deletepet = deletepet;
exports.getPetsByEmail = getPetsByEmail;
exports.addemployee = addemployee;
exports.loginAdmin = loginAdmin;
exports.getAllEmployees = getAllEmployees;
exports.getemployeesByEmail = getemployeesByEmail;
exports.getByemployeesId = getByemployeesId;
exports.updateemployees = updateemployees;
exports.deleteemployees = deleteemployees;
