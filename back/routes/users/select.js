import { app, db } from "../../server";

app.post("/api/users/find", (req, res) => {
  const { userId } = req.body;

  const sql = "SELECT * FROM users WHERE userId = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        res
          .status(401)
          .send({ success: false, message: "중복된 아이디입니다." });
      } else {
        res
          .status(200)
          .send({ success: true, message: "사용 가능한 아이디입니다." });
      }
    }
  });
});
