const Coffeed = require('../models/mdiary');

module.exports = {
      index,
      diaryEntry,
      show,
      details,
      delete: delEntry,
};

function index(req, res, next) {
      let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
      let sortKey = req.query.sort || 'name';
            Coffeed.find(modelQuery)
            .sort(sortKey).exec(function(err, users) {
                  if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
            res.render('front.ejs', { 
            user: req.user, // req.user represents our currently logged-in user
            users, 
            name: req.query.name, 
            sortKey,
            });
      });
}

async function diaryEntry(req, res, next) {
      console.log('being added', req.body)
      if (req.user){
            let obj = {
                  Bean: req.body.bean,
                  Roast: req.body.roast,
                  Region: req.body.region,
                  Ratio:req.body.ratio,
                  Grind:req.body.grind,
                  Weight:req.body.weight,
                  Water:req.body.water,
                  Review:req.body.review,
            }
      req.user.diaryEntries.push(obj)
      // console.log('this is object',obj)
      await req.user.save()
      res.redirect('/coffee')
      }
};

async function show(req, res){
      let dshow = await Coffeed.find({});
      res.render('entries.ejs',{dshow, user: req.user});
}

async function details(req,res){
      console.log("req params in details", req.params.id);
      let entrys = await Coffeed.find({})
      let correctEntry;
      for (let entry of entrys[0].diaryEntries){
            if (entry._id == req.params.id){
                  correctEntry = entry
            }
      }
      res.render('details.ejs', {correctEntry})
}

function delEntry(req,res) {
      console.log("in del entry", req.params.id, req.user);
      let user = req.user;
      let entryIndex=0;
      let correctEntryIndex;
      for (let entry of user.diaryEntries) {
            if (entry._id === req.params.id){
                  correctEntryIndex = entryIndex;
            }
            entryIndex++;
      }
      user.diaryEntries.splice(correctEntryIndex, 1);
      user.save();
      res.redirect('/coffee/entries');
};