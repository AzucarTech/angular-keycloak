const { parse } = require("csv-parse");
const fs = require('fs')

// import {  } from "./";

export async function readCSV(file: string) {
  let csvUsers = [];
  try {
    const csvParser = fs.createReadStream(file)
                        .pipe(parse());
    for await (const row of csvParser) {
      csvUsers.push(row);
    }
  }catch (err) {
    console.error("Error occurred while reading CSV file.", err);
    throw err;
  }

  if(!csvUsers) {
    const err = "CSV file has no content. File must contain header row and users."
    console.error(err);
    throw err;
  }

  // separate the header and user rows of the csv file
  const csvHeader = csvUsers[0];
  const csvSlice = csvUsers.slice(1);

  // create a map for each user with the (header, value) pair for each entry.
  const users = [];
  csvSlice.forEach((user) => {
    const userMap = {};
    user.forEach((value, index) => {
      userMap[csvHeader[index]] = value;
    });
    users.push(userMap)
  });

  return users;
}
