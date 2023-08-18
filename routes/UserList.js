const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle(["relationship", "complicated", "single"])[0],
  };
};

function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const data = makeData(10000);

router.get("/", (req, res) => {
  console.log("res.query", req.query);
  const { pageIndex, pageSize } = req.query;

  const rows = data.slice(
    Number(pageIndex) * Number(pageSize),
    (Number(pageIndex) + 1) * Number(pageSize)
  );
  const totalPage = Math.ceil(data.length / Number(pageSize));
  console.log("rows.length", rows.length);
  res.send({
    rows,
    totalPage,
  });
});

module.exports = router;
