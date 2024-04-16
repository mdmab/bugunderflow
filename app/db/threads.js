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
    let res = (await db.collection("new_questions").find({}, {
        "projection": {
            "qid": 1,
            "title" : 1,
            "content" : 1,
            "tags" : 1,
            "views" : 1,
            "upvotes" : {
                "$size" : "$upvoters"
            },
            "downvotes" : {
                "$size" : "$downvoters"
            },
            "upvoters" : 1,
            "downvoters" : 1,
            "authorUsername" : 1,
            "createdAt" : 1,
            "answerCount" : {
                "$size" : "$answers"
            }
            // "answers" : 1,
        }
    }).toArray())

    return res
}

export async function retrieveThreadById(id) {
    console.log("[DEBUG] qid " + id)
    return db.collection("new_questions").findOne({ qid: Number(id) }, {
        "projection" : {
            "qid": 1,
            "title" : 1,
            "content" : 1,
            "tags" : 1,
            "views" : 1,
            "upvotes" : {
                "$size" : "$upvoters"
            },
            "downvotes" : {
                "$size" : "$downvoters"
            },
            "upvoters" : 1,
            "downvoters" : 1,
            "authorUsername" : 1,
            "createdAt" : 1,
            "answerCount" : {
                "$size" : "$answers"
            },
            "answers" : {
                "aid" : 1,
                "authorUsername" : 1,
                "views" : 1,
                "createdAt" : 1,
                "content" : 1,
                "upvotes" : {
                    "$size" : "$upvoters"
                },
                "downvotes" : {
                    "$size" : "$downvoters"
                },
                "upvoters" : 1,
                "downvoters" : 1
            }
        }
    })
}

export async function getAnswerCountByQid(id) {
    console.log("[DEBUG | GET] Getting the number of answers for qid " + id + "...")
    return (await db.collection("new_questions").findOne({ qid: Number(id) }, {
        "projection" : {
            "aCount" : {
                "$size" : "$answers"
            }
        }
    }))
}

export async function deleteThreadById(id) {
    console.log("[DELETE] Deleting thread with qid " + id + "...")
    await db.collection("new_questions").deleteOne({"qid" : Number(id)})
    console.log("*** SUCCESS ***")
}

export async function retrieveMaxQid() {
    console.log("[DEBUG | RETREIVE] Retrieving the max qid...")
    const maxQidThread = await db.collection("new_questions").find({}, {
        "_id" : 0,
        "qid" : 1
    }).sort({"qid" : -1}).limit(1).toArray()
    console.log("*** SUCCESS ***")

    return maxQidThread[0].qid
}

export async function retrieveNextQid() {
    return (await retrieveMaxQid()) + 1
}

export async function postThread(title, content, tags, authorUsername, createdAt) {
    // To be implemented...
    console.log("[POST] Creating a new thread...")
    const nqid = await retrieveNextQid()

    await db.collection("new_questions").insertOne({
        "qid" : Number(nqid),
        "title" : title,
        "content" : content,
        "tags" : tags,
        "views" : 0,
        "upvotes" : 0,
        "downvotes" : 0,
        "upvoters" : [],
        "downvoters" : [],
        "answers" : [],
        "authorUsername" : authorUsername,
        "createdAt" : createdAt
    })

    console.log("*** SUCCESS ***")
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
                "upvoters" : [],
                "downvoters" : [],
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

export async function search(searchString) {
    let words = searchString.split(" ").filter(word => word != "").join("|")
    console.log("[SEARCH] Searching...")

    const res = (await db.collection("new_questions").find({
        "title": {
            "$regex" : words,
            "$options" : "i"
        }}, {
        "projection" : {
            "qid": 1,
            "title" : 1,
            "content" : 1,
            "tags" : 1,
            "views" : 1,
            "upvotes" : {
                "$size" : "$upvoters"
            },
            "downvotes" : {
                "$size" : "$downvoters"
            },
            "upvoters" : 1,
            "downvoters" : 1,
            "authorUsername" : 1,
            "createdAt" : 1,
            "answerCount" : {
                "$size" : "$answers"
            },
            "answers" : {
                "aid" : 1,
                "authorUsername" : 1,
                "views" : 1,
                "createdAt" : 1,
                "content" : 1,
                "upvotes" : {
                    "$size" : "$upvoters"
                },
                "downvotes" : {
                    "$size" : "$downvoters"
                },
                "upvoters" : 1,
                "downvoters" : 1
            }
        }
    }).toArray())

    return res
}

export async function addView(qid) {
    console.log("[DEBUG] Incrementing the view count for qid " + qid + "...")
    await db.collection("new_questions").updateOne({ "qid" : Number(qid) }, {
        "$inc" : {
            "views" : 1
        }
    })
}

export async function retrieveThreadsSortedByView() {
    console.log("[DEBUG] Retrieving the threads, sorted by their view count...")
    const records = (await db.collection("new_questions").find({}, {
        "projection" : {
            "_id" : 0,
            "qid" : 1,
            "title" : 1
        }
    }).sort({ "views" : -1 }).limit(5).toArray())

    return records
}

export async function retrieveThreadsByAuthor(authorUsername) {
    console.log("[RETRIEVE] Retrieving the threads written by " + authorUsername + "...")
    const records = (await db.collection("new_questions").find({
        "authorUsername" : authorUsername
    }).toArray())

    return records
}

export async function retrieveThreadsByQidAndAuthor(qid, authorUsername) {
    console.log("[RETRIEVE] Retrieving the threads written by " + authorUsername + "...")
    const records = (await db.collection("new_questions").find({
        "authorUsername" : authorUsername,
        "qid" : Number(qid)
    }).toArray())

    return records
}

// export default {
//     retrieveThreads,
//     retrieveThreadById,
//     postReply,
//     deleteReply
// }