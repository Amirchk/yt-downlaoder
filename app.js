const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
var port = process.env.PORT || 3000;
app.set("view engine", "ejs");

app.use( express.static( "public" ) );

app.get("/", (req, res) => {
	return res.render("index");
});
app.get("/HowToUse",(req,res)=>{
    return res.render("HowToUse")
})
app.get("/AboutUs",(req,res)=>{
    return res.render("AboutUs")
})
app.get("/download", async(req, res) => {
	const v_id = req.query.url.split('v=')[1];
    const info = await ytdl.getInfo(req.query.url);
    // console.log(info.formats[4]);
    console.log( info )
    // console.log(info.formats[1]);

	return res.render("download", {
		url: "https://www.youtube.com/embed/" + v_id,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
        title :info.videoDetails.title,
        thumnail:info.videoDetails.embed.iframeUrl       
	});
});


app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
