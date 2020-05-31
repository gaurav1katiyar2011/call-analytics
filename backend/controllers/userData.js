const UserData = require("../models/userData");

exports.bulkCreate = (req, res) => {
  const req_arr = Object.values(req.body).map((v) => Object.values(v));
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  UserData.bulkCreate(req_arr, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while sending data.",
      });
    else res.send(data);
  });
};
function createData(name, campaignName, processName, arr) {
  return {
    name,
    campaignName,
    processName,
    list: arr,
  };
}


// Accepts the array and key
// const groupBy = (array, key) => {
//   // Return the end result
//   return array.reduce((result, currentValue) => {
//     // If an array already present for key, push it to the array. Else create an array and push the object
//     (result[currentValue[key]] = result[currentValue[key]] || []).push(
//       currentValue
//     );
//     // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
//     return result;
//   }, {}); // empty object is the initial value for result object
// };

exports.findAll = (req, res) => {
  UserData.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user data.",
      });
    // const merged = data.rows.reduce((r, { user_name, user_id, customer_id, ...rest }) => {
    //   const key = `${user_name}-${user_id}-${customer_id}`;
    //   r[key] = r[key] || { user_name, user_id, 'campaignName': 'campaignName', 'ProcessName': 'ProcessName' , 'history': [] };
    //   r[key]["history"].push({ user_name, user_id, ...rest })
    //   return r;
    // }, {})
    // const users = Object.values(merged)
    // console.log(users);
    res.send(data.row);
  });
};
