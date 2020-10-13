


const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {

    const about = {
        avatar_url: "https://media-exp1.licdn.com/dms/image/C4E03AQFpnxn6QJ3MDw/profile-displayphoto-shrink_200_200/0?e=1606953600&v=beta&t=Vz8jbMswYDBmXmHezUtlnjxUFtk-mN_7qRJydSR7vCc",
        name: "Fernanda Dias",
        role: "Developer Front-End",
        description: 'Graduated in Systems Analysis and Development at Unopar. My goal is to transform layouts into code, using HTMl, CSS, JavaScript. Student of Rocketseat: GoStack Bootcamp. Training around techs, such as: Node.js, React.js, React Native. Usage of libraries like Express, Adonis, Mongoose, Sequelize, Json Web Token, Multer, Bee Queue (Redis). Usage of databases, such as PostgreSQL, MongoDB and Redis. I currently work as a sales assistant at <a href="https://casashopdecor.com.br" target="_blank">CasaShopDecor</a> and front end developer at studio <a href="https://instagram.com/pina.criacao_" target="_blank">Piná</a>.',
        link: [
            { name: "Github", url: "https://github.com/FernandaDsilva" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/fernanda-dias-silva/" },
            { name: "Whatsapp", url: "https://api.whatsapp.com/send?phone=5543996870552&text=Ol%C3%A1%2C%20Ferna!%20Visitei%20seu%20site%20e%20tenho%20uma%20d%C3%BAvida%2C%20pode%20me%20ajudar%3F" },
            { name: "Instagram", url: "https://instagram.com/falaprafeer" }
        ]

    }
    return res.render("about", { about })
})

server.get("/projetos", function (req, res) {
    return res.render("projetos", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id
    const video = videos.find(function (video) {
        return video.id == id 
    })

    if (!video) {

        return res.send("Video not found!")
    }
    return res.render("video", { item: video })
})

server.listen(5000, function () {
    console.log("Server Is Running")
})
