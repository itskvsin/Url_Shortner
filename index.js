const express = require("express");
const mongoose = require("mongoose");
const shortUrl = require("./models/shortUrl")
const app = express();

app.set("view engine" , "ejs")
app.use(express.urlencoded({extended : true}))

mongoose.connect('mongodb+srv://forum102:admin@cluster0.vu50p.mongodb.net/shortUrlSchema?retryWrites=true&w=majority&tls=true');

app.get("/" , async (req,res) => {
    const shortUrls = await shortUrl.find()
    res.render("index" , {shortUrls : shortUrls})
})

app.post("/shortUrls" , async(req,res) => {
    await shortUrl.create({full : req.body.fullUrl})

    res.redirect("/")
})

app.get("/:shortUrl" , async (req,res) => {
    const foundUrl = await shortUrl.findOne({short : req.params.shortUrl})
    if (foundUrl == null) {
        return res.sendStatus(404)
    }

    foundUrl.clicks++ 
    foundUrl.save()

    res.redirect(foundUrl.full)
})


app.listen(9000);