const { MongoClient, Int32 } = require("mongodb")
const dotenv = require("dotenv").config({path: ".env.local"})

const client = new MongoClient(process.env.MONGODB_URL)
let db = client.db(process.env.DB_NAME)

/**
 *  Question:
        title
        content
        tags
        views
        upvotes
        downvotes
        author
        answers
        creation_time
 */

export async function retrieveThreads() {
    console.log("[Fetch] Fetching the list of threads...")
    return db.collection("new_questions").find().toArray()
}

export async function retrieveThreadById(id) {
    console.log("[DEBUG] qid " + id)
    return db.collection("new_questions").findOne({ qid: Number(id) })
}

export async function postReply(qid, aid, content, author, creationTime) {
    console.log('[DEBUG | POST] Adding a new reply to the question with qid ' + qid)
    db.collection("new_questions").updateOne({ qid: Number(qid) }, {
        "$push": {
            "answers" : {
                "aid": Number(aid),
                "authorUsername" : author,
                "views" : 0,
                "upvotes" : 0,
                "downvotes" : 0,
                "createdAt" : creationTime,
                "content" : content
            }
        }
    })
}

export async function deleteReply(qid, aid) {
    console.log("[DEBUG | DELETE] Deleting reply from question (qid " + qid + ")...")
    db.collection("new_questions").updateMany({ qid: Number(qid) }, {
        "$pull": {
            "answers": {
                "aid" : Number(aid)
            }
        }
    })
}

// export default {
//     retrieveThreads,
//     retrieveThreadById,
//     postReply,
//     deleteReply
// }