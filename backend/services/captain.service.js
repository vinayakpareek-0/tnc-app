const captainModel = require('../models/captainmodel');



module.exports.createCaptain = async ({
   firstName ,lastName, email, password, 
   color, plate, capacity, vehicleType }) => {
   if(!firstName || !email || !password) {
       throw new Error("All fields are required");
   }
   const captain = await captainModel.create({
       fullname: {
           firstName: firstName,
           lastName: lastName
       },
       email,
       password,
       vehicle: {
           color: color,
           plate: plate,
           capacity: capacity,
           vehicleType: vehicleType
       }
   });
   return captain;
}