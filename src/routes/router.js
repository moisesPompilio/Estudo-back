module.exports = (app) => {
    app.route("/teste")
        .get(() => {res.json("Hello")});
}