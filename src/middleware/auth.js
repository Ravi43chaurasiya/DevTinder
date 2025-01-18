const adminAuth=(req,res,next)=>{
  const adminAuth="xyzabc";
  const authnticated=(adminAuth==="xyz");
  if(authnticated){
    next();
  }
  else{
    res.status(400).send("unauthorized user")
  }
}

const userAuth=(req,res,next)=>{
  const userAuth="xyz";
  console.log("user is being authnticated.")
  const authnticated=(userAuth==="xyz");
  if(authnticated){
    next();
  }
  else{
    res.status(400).send("unauthorized user")
  }
}


module.exports={adminAuth,userAuth};