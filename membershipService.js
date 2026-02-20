
const supabase = require("../supabase")

async function activate(userId, packageType){
  const start = new Date()

  if(packageType === "clip"){
    const expire = new Date()
    expire.setDate(start.getDate()+30)

    await supabase.from("memberships").upsert({
      user_id:userId,
      tier:"clip",
      start_date:start,
      expire_date:expire,
      is_lifetime:false,
      status:"active"
    })
  }

  if(packageType === "secret"){
    await supabase.from("memberships").upsert({
      user_id:userId,
      tier:"secret",
      start_date:start,
      expire_date:null,
      is_lifetime:true,
      status:"active"
    })
  }
}

module.exports = { activate }
