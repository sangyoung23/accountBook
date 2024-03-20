import { app, db } from "../../server";

// app.post("/api/users/insert", (req, res) => {
//   const { userId, userName, passWord } = req.body;

//   const sql =
//     "INSERT INTO users (`userId`, `userName`, `userPwd`) VALUES (?, ?, ?)";

//   db.query(sql, [userId, userName, passWord], (err, result) => {
//     if (err) {
//       res.status(500).json({ success: false, message: err });
//     } else {
//       res.status(200).send({ success: true });
//     }
//   });
// });
