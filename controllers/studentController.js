const express= require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');
//let expressValidator = require('express-validator')


router.get('/',(req,res) => {
    res.render("student/addOrEdit",{
        viewTitle:"Insert Student"
    });
});

router.post('/',(req,res) => {
   // console.log(req.body);
   if(req.body._id == '')
   insertRecord(req,res);
   else{
       updateRecord(req,res);
   }
});

function insertRecord(req,res){
    var student = new Student();
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    student.save((err,doc) => {
        if(!err){
            res.redirect('student/list');
        }
        else{
            // if(err.name == ValidationError){
            //    handleValidationError(err,req.body);
            //    router.get('/',(req,res) => {
            //     res.render("student/addOrEdit",{
            //         viewTitle:"Insert Student",
            //         student : req.body
            //     });
            // });
            // }
            console.log('Error during record insertion: ' + err);
        }
    });
}

function updateRecord(req,res){
    Student.findOneAndUpdate({ _id: req.body._id}, req.body, { new:true }, (err,doc) =>{
        if(!err) { res.redirect('student/list'); }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle: 'Update Student',
                    student: req.body
                });
            }
        }
    });
}
router.get('/list', (req,res) => {
   // res.json('from list');
       Student.find((err,docs) => {
            if(!err){
                res.render("student/list", {
                    list: docs
                });
            }
            else{
                console.log("Error in retrieving student list:" + err);
            }
       });
});

function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;    
             default:
                 break;   
        }
    }
}
router.get('/:id', (req,res) => {
    Student.findById(req.params.id, (err, doc) => {
        if(!err)
        {
            res.render("student/addOrEdit", {
                viewTitle: "Update Student",
                student: doc
            });
        }
    });
});

router.get('/delete/:id', (req,res) => {
    student.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/student/list');
        }
        else{
            console.log('Error in student delete: ' + err);
        }
    });
});

module.exports = router;
