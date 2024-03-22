import express from "express";
import cors from "cors";
import mysql from "mysql";
// import path from "path";

export const app = express();
const PORT = 3001; // 포트번호 설정

// MySQL 연결
export const db = mysql.createConnection({
  host: "localhost", // 호스트
  user: "root", // 데이터베이스 계정
  password: "0000", // 데이터베이스 비밀번호
  database: "accountbook", // 사용할 스키마
});

// const __dirname = path.resolve();

// json 형태의 req body를 파싱하기 위해 미들웨어 사용
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// 기본 static 주소 설정하기

// 회원가입
app.post("/api/users/insert", (req, res) => {
  const { userId, userName, passWord } = req.body;

  const sql =
    "INSERT INTO users (`userId`, `userName`, `userPwd`) VALUES (?, ?, ?)";

  db.query(sql, [userId, userName, passWord], (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: err });
    } else {
      res.status(200).send({ success: true });
    }
  });
});

// 아이디 중복 검사
app.post("/api/users/find", (req, res) => {
  const { userId } = req.body;

  const sql = "SELECT * FROM users WHERE userId = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.status(500).send("Internal Server Error", err);
    } else {
      if (result.length > 0) {
        // api 호출은 성공 했으니 status는 200, 대신 success와 message 입력
        res
          .status(200)
          .send({ success: false, message: "중복된 아이디입니다." });
      } else {
        res
          .status(200)
          .send({ success: true, message: "사용 가능한 아이디입니다." });
      }
    }
  });
});
