const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const app = express();
const session = require("express-session");
const adminRouter = require("./routes/adminRouter");

app.engine("handlebars", engine({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        eq: (a, b) => a === b,
    },
}));
app.set("view engine", "handlebars");

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(session({
    secret: 'school',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.use("/admin", adminRouter)
//app.use("/stundent", studentRouter)
//app.use("/teacher", teacherRouter)

app.listen(8080, () => {
    console.log(`Servidor rodando na porta http://localhost:8080`)
});