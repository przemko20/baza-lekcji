const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()


const Lesson = mongoose.model('Lesson', new mongoose.Schema({
    title: String,
    author: String,
    lead_tech: String,
    tags:[String],
    repo: String,
    desc: String,
    link: String,
    editor: {
        person:String,
        modi_date:{type:Date, default:null}
    },
    create_date:{type:Date, default:Date.now},
    //pdf_path: 
})  )

async function createLesson(){
    
    const lesson = new Lesson({
        title: "LiczeniePizzy",
        author: "Przemek",
        lead_tech:"JavaScript",
        tags:['javascript', 'inputy', 'front-end',],
        repo: "jakieś repo",
        desc: "Program liczy powierzchnie pizzy i rozstrzyga, co się bardziej opłaca",
        
    })
    const result = await lesson.save()
    console.log(result)
    
}
//createLesson()

//GET ALL
router.get('/', async (req,res) => {
    const lessons = await Lesson.find( )
    res.send(lessons)
})
//GET by ID
router.get('/:id', async (req,res) => {
    //const id = `ObjectId("${req.params.id}")`
    const lesson = await Lesson.findById(req.params.id)
    res.send(lesson)
})

// POST
router.post('/', async (req,res) => {
    let lesson = new Lesson({
        title: req.body.title,
        author: req.body.author,
        lead_tech: req.body.lead_tech,
        tags: req.body.tags.split(','),
        repo: req.body.repo,
        desc: req.body.desc    
    })
    lesson = await lesson.save()
    res.send(lesson)
})

//PUT
router.put('/:id', async (req, res) => {


    let lesson = await Lesson.findByIdAndUpdate(req.params.id, {name:req.body.name},{new:true})
    if(!lesson) return res.status(404).send('The lesson does not exist')

    /*
    const { error } = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    */ 
    res.send(lesson)
})

//DELETE
router.delete('/:id', async (req, res) => {

    const lesson = await Lesson.findByIdAndRemove(res.params.id)
    if(!lesson) return res.status(404).send('The lesson does not exist')
    res.send(lesson)
})


module.exports = router