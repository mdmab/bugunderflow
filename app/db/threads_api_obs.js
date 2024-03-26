var express = require("express")
const { retrieveThreads, retriveThreadById, postReply, deleteReply } = require("../db/threads")
const bodyParser = require("body-parser")
var router = express.Router()

const jsonParser = bodyParser.json()

router.get('/get-all', async (req, res) => {
    console.log("[FETCH] Fetching all the threads...")
    res.status(200).json(await retrieveThreads());
})

router.post('/post-question', (req, res) => {
    const [title, content, tags, views, upvotes, downvotes, author, answers, creation_time] = req.body
})

router.get('/get/:qid', async (req, res) => {
    console.log("[Fetch] Fetching a thread with qid " + req.params.qid + "...")
    console.log(req.params.qid)

    let response = await retriveThreadById(req.params["qid"])

    if (response === null) {
        console.log("[Fetch] Thread with qid " + req.params.qid + " not found.")

        res.status(404).json({
            found: false
        })
    }

    console.log("[Fetch] Thread with qid " + req.params.qid + " successfully found.")
    res.status(200).json({
        found: true,
        thread: response
    })
})

router.post('/post-reply', jsonParser, async (req, res) => {
    console.log("[POST] Posting a new reply to the server...")
    // const [qid, aid, content, author, creationTime] = req.body
    await postReply(req.body.qid,
                    req.body.aid,
                    req.body.content,
                    req.body.author,
                    req.body.createdAt)
    console.log("[POST] Posting reply to question (qid " + req.body.qid + ") successfully done.")
})

router.post('/remove-reply', jsonParser, async (req, res) => {
    console.log("[DELETE] Deleting reply...")
    await deleteReply(
        req.body.qid,
        req.body.aid
    )

    console.log("*** DONE...")
})

module.exports = router