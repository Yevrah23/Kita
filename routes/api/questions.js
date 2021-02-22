const express = require('express');
const router = express.Router();
var Questions = require('../../Questions');
var Users = require('../../Users');

const moment = require('moment');


var AutoNumber = parseInt(Questions.length);

//Get Questions depending
router.get('/', (req,res) => {
    var QList = []
    counter = 1
    Questions.forEach(q => {
        if (q.IsActive){
            QList.push(counter + '. ' + q.question);
            counter += 1
        }
    });

    if (req.query.page != null){
        const page = req.query.page;
        const limit = req.query.limit;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const result = QList.slice(startIndex, endIndex);
        res.json(result);
    }else {
        res.json(Questions.filter(Questions => Questions.IsActive == true));
    }
})
// Return Question with Details
router.get('/:id', (req, res) => {
    const found = Questions.some(Questions => Questions.id === parseInt(req.params.id));
    if (found) {
        res.json(Questions.filter(Question => Question.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `A question with an id of ${req.params.id} does not exist` })
    }
})

//Create Questions
router.post('/', (req, res)=> {
    const newQ = {
        'id' : AutoNumber,
        'uuid' : req.body.uuid,
        'question' : req.body.question,
        'CreatedAt' : moment().format(),
        'CreatedBy': Users['users'][req.body.uuid].name,
        'UpdatedAt' : null,
        'UpdatedBy' : null,
        'IsActive' : true

    }
    if (!newQ.question) {
      return res.status(400).json({msg: "Please input a question"});
    }

    Questions.push(newQ);
    AutoNumber = parseInt(Questions.length);
    res.send('Successfully Inserted');

})

//Update Question
router.put('/:id', (req, res)=> {
    const found = Questions.some(Questions => Questions.id === parseInt(req.params.id));

    if (found){
        const updQ = req.query;
        console.log(updQ);
        if (!updQ.question || !updQ.uuid){
            res.status(400).json({msg : 'Please input a question'})
        }else {
            Questions.forEach(q => {
                if (q.id === parseInt(req.params.id)) {
                    q.question = updQ.question;
                    q.UpdatedAt = moment().format();
                    q.UpdatedBy = Users['users'][updQ.uuid].name
                }
            });
            res.send('Successfully Updated');
        }
    }else {
        res.status(400).json({ msg: `A question with an id of ${req.params.id} does not exist`})
    }
})

// Delete Question
router.delete('/:id', (req, res) => {
    const found = Questions.some(Questions => Questions.id === parseInt(req.params.id));
    if (found) {
        Questions.forEach(q => {
            if (q.id === parseInt(req.params.id)) {
                q.IsActive = false; 
            }
        });
        res.send('Successfully Deleted');        
    } else {
        res.status(400).json({ msg: `A question with an id of ${req.params.id} does not exist` })
    }
})

module.exports = router;