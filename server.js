const express = require("express");
const app = express();

const userList = require("./src/mocks/users.json");
const companyList = require("./src/mocks/companies.json");

const cors = require("cors");
const port = 3001;

const queryTypes = {
  includes: 1,
  greaterThanOrEqual: 2,
  lessThanOrEqual: 3,
  equal: 4,
};

const mapKeyValue = (query) => {
  const mapper = mappers[query.key];
  const mappedQueryValue = mapper?.queryValue
    ? mapper.queryValue(query.value)
    : query.value;
  const mappedItemValue = (x) => {
    return mapper?.itemValue ? mapper.itemValue(x) : x[query.key];
  };
  return { queryValue: mappedQueryValue, itemValueFunc: mappedItemValue };
};

const queryFuncs = [
  {
    type: queryTypes.includes,
    func: (query, data) => {
      const mapper = mapKeyValue(query);
      return data?.filter(
        (item) =>
          mapper
            .itemValueFunc(item)
            ?.toLowerCase()
            ?.indexOf(mapper.queryValue?.toLowerCase()) !== -1
      );
    },
  },
  {
    type: queryTypes.greaterThanOrEqual,
    func: (query, data) => {
      const mapper = mapKeyValue(query);
      return data?.filter(
        (item) => mapper.itemValueFunc(item) >= mapper.queryValue
      );
    },
  },
  {
    type: queryTypes.lessThanOrEqual,
    func: (query, data) => {
      const mapper = mapKeyValue(query);
      return data?.filter(
        (item) => mapper.itemValueFunc(item) <= mapper.queryValue
      );
    },
  },
  {
    type: queryTypes.equal,
    func: (query, data) => {
      const mapper = mapKeyValue(query);
      return data?.filter(
        (item) => mapper.itemValueFunc(item) === mapper.queryValue
      );
    },
  },
];

const queries = {
  name: queryTypes.includes,
  age: queryTypes.equal,
  email: queryTypes.includes,
  birthDateFrom: queryTypes.greaterThanOrEqual,
  birthDateTo: queryTypes.lessThanOrEqual,
  isAvailable: queryTypes.equal,
  companyName: queryTypes.includes,
  companyTitle: queryTypes.includes,
};

const mappers = {
  name: { itemValue: (x) => x.firstName?.concat(x.lastName) },
  age: { queryValue: (x) => +x },
  birthDateFrom: {
    queryValue: (x) => +x,
    itemValue: (x) => x.birthDate,
  },
  birthDateTo: {
    queryValue: (x) => +x,
    itemValue: (x) => x.birthDate,
  },
  isAvailable: {
    queryValue: (x) => x === "true",
    itemValue: (x) => x.available,
  },
  companyName: { itemValue: (x) => x.company?.name },
  companyTitle: { itemValue: (x) => x.company?.title },
};

app.use(cors());

app.get("/api/users", (req, res) => {
  let result = userList;
  for (const key in req.query) {
    const queryValue = req.query[key];
    const queryFunc = queryFuncs.find((qF) => qF.type === queries[key])?.func;
    if (queryFunc) result = queryFunc({ key: key, value: queryValue }, result);
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(result));
});

app.get("/api/companies", (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(companyList));
});

app.listen(port, () => {
  console.log(`Mock API listening`);
});
