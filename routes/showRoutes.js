const express   = require("express"),
      router    = express.Router(),
      Nail      =require("../models/Nails"),
      {isLoggedIn} =require("../midleware");
      

router.get("/",function(req,res){
    res.render("Home")
});

router.get("/collections",function(req,res){
    Nail.find({},function(err,allNails){
        if(err){
            console.log(err)
            console.log("here is the error")
        }else{
            res.render("Collections",{nails:allNails,currentUser:req.user})
        }
    })
})

//New route 
router.post("/collections",function(req,res){
    const name=req.body.name;
    const image=req.body.image;
    const description=req.body.description;

    const newNail={name:name,image:image,description:description}
    Nail.create(newNail,function(err,newNail){
        if(err){
            console.log(err)
        }else{
            req.flash("success","Successfully made a new Nail")
            res.redirect("/collections");
        }
    })
})
router.get("/new",isLoggedIn, function(req,res){
    res.render("new")
})


//SHOW MORE INFO ABOUT ONE NAIL
router.get("/nail/:id",function(req,res){
    //FIND THE NAIL WITH ID PROVIDED
   Nail.findById(req.params.id,function(err, foundNail){
      if(!foundNail){
          req.flash("error","Cannot find that nail")
          return res.redirect("/collections")
      }
      res.render("Show",{nail:foundNail})
   })
});

//Edit nail route
router.get("/:id/edit",isLoggedIn,function(req,res){
    Nail.findById(req.params.id,function(err,foundNail){
        res.render("Edit",{nail:foundNail})
    })
})
//Update nail route
router.put("/collections/:id",isLoggedIn, function (req,res){
    Nail.findByIdAndUpdate(req.params.id,req.body.nail,function(err,updateNail){
        if(!updateNail){
                req.flash("error","Cannot find that nail")
                return res.redirect("/collections")
        }
            req.flash("success","Successfully updated nail!")
            res.redirect("/collections")
    })
})

//Delete nail route
router.delete("/:id",isLoggedIn,function(req,res){
    Nail.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err)
            res.redirect("/collections")
        }
        req.flash("success","Successfully deleted Nail!")
        res.redirect("/collections")
    })
})

//register route

module.exports = router;