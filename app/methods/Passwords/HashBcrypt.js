const bcrypt = require("bcrypt")

module.exports.Hasher = async (Password)=>{
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND))
  const Hash = await bcrypt.hash(Password,salt) 

  return Hash
}

module.exports.Comparer = async (Password,Hash)=>{
    const result = await bcrypt.compare(Password,Hash);
    return result;
}