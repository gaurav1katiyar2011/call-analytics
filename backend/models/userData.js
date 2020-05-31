const pg = require("./db.js");
const format = require('pg-format');

const UserData = function(userData) {
  this.call_id = userData.call_id;
  this.phone = userData.phone;
  this.customer_id = userData.customer_id;
  this.user_id = customer.user_id;
  this.user_name = customer.user_name;
};

UserData.bulkCreate = (req_arr,result) =>{
  let users =  req_arr;
  console.log('user>>>',users)
  let query = format('INSERT INTO txn_user_data(call_id, phone, customer_id, user_id, user_name) VALUES %L returning id', users);
  console.log('query--',query)
  pg.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    console.log("created customer: ", { id: res.call_id, number_of_records: req_arr.length });
    result(null, {records:req_arr.length, status:'Sucess'});
  });
};


UserData.getAll = result => {
  pg.query("SELECT * FROM txn_user_data", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user data: ", res);
    result(null, res);
  });
};

module.exports = UserData;
