import express from "express";
import cors from "cors";
import mysql from "mysql";
const app = express();
const PORT = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createConnection({
  host: "localhost", // 호스트
  user: "root", // 데이터베이스 계정
  password: "0000", // 데이터베이스 비밀번호
  database: "accountbook", // 사용할 스키마
});

app.use(cors());

// json 형태의 req body를 파싱하기 위해 미들웨어 사용
app.use(express.json());

// 서버 연결 시 발생
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// 기본 static 주소 설정하기

app.post("/api/users/insert", (req, res) => {
  const { userId, userName, passWord } = req.body;

  const sql =
    "INSERT INTO user (`userId`, `userName`, `userPwd`) VALUES (?, ?, ?)";

  db.query(sql, [userId, userName, passWord], (err, result) => {
    if (err) {
      res.status(500).json({ success: false });
    } else {
      res.status(200).send({ success: true });
    }
  });
});
