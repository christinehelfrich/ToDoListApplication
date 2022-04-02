var express = require('express');
var router = express.Router();
module.exports = router; 

const sequenceGenerator = require('./sequenceGenerator');
const ToDo = require('../models/todo');

//router.get('/:id', (req, res, next) => {
//    res.send(req.params.id)
//  });



router.get('/', (req, res, next) => {
    ToDo.find().then(todos => {
        res.status(200).json({
            message: "todos fetched successfully",
            todos: todos
        });
    })
    .catch(err => {
        res.status(500).json({
            err: err
        })
    })
})

router.post('/', (req, res, next) => {
    const maxToDoId = sequenceGenerator.nextId("todos");
    const todo = new ToDo({
        id: maxToDoId,
        name: req.body.name,
        description: req.body.description,
        priority: req.body.priority
    });
    console.log(todo)
    todo.save()
        .then(createdToDo => {
            res.status(201).json({
                message: 'ToDo added successfully',
                todo: createdToDo
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'An error occurred',
                err: err
            });
        });
});

router.put('/:id', (req, res, next) => {
    ToDo.findOne({ id: req.params.id })
        .then(todo => {
            //console.log(document)
            todo.name = req.body.name;
            todo.description = req.body.description;
            todo.priority = req.body.priority;
            ToDo.updateOne({ id: req.params.id }, todo)
        .then( result => {
            res.status(204).json({
                message: 'ToDo updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'An Error Occurred', 
                error: error
            });
        });

        });
});



router.delete("/:id", (req, res, next) => {
    ToDo.findOne({ id: req.params.id })
      .then(todo => {
        ToDo.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "ToDo deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'ToDo not found.',
          error: { todo: 'ToDo not found'}
        });
      });
  });