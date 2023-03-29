let authentication = (req, res, next) => {
    const payload = req.body;
    let token = req.headers.token
    let blacklisttokens = JSON.parse(fs.readFileSync("./blacklist.json", "utf8")) || [];
    let flag = "yes";
    for (let i = 0; i < blacklisttokens.length; i++) {
        if (token == blacklisttokens[i]) {
            flag = "no"
        }
    }
    if (flag == "no") res.send({ "msg": "Token expire" })

    if (token) {
        var decoded = jwt.verify(token, "9168");
        if (decoded) {
            
            // req.body.userID = decoded.userID;
            next();
        }
        else {
            res.send("Token Failed")
        }
    } else {
        res.send("Please Login First")
    }
};

module.exports(authentication)