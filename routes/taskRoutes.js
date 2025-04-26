const express = require('express');
const joi = require('joi');
const router = express.Router();
const Task = require('../models/Task');

//define joi schema
const taskSchema = joi.object({

    title: joi.string().required().messages({
        
        'string.empty' : 'Title is Required'
    }),
    completed: joi.boolean().optional().messages({

        'boolean.base' : 'Completed must be true or false'
    })

}).unknown(true);

//add task
router.post('/tasks', async (req, res) => {

    const { error, value } = taskSchema.validate(req.body);

    if(error) { return res.status(400).json({ status: false, message: error.details[0].message }); }

    try{
        const task = await Task.create(value); // use validated `value` instead of raw req.body

        res.status(201).json(task);
    }
    catch (err){

        res.status(400).json({ error: err.message });
    }

})

//get all task
router.get('/tasks', async(req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
})

//update task
router.put('/tasks/:id', async(req, res) => {

    const { error, value } = taskSchema.validate(req.body);

    if(error) { return res.status(400).json({ status: false, message: error.details[0].message }); }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, value, {new: true});

        if(!task) return res.status(404).json({ message: 'Task not found' });

        res.status(200).json({ message: 'Task Updated', task});
    }
    catch (err){

        res.status(500).json({ error: 'Internal server error' });
    }
});

//delete task
router.delete('/tasks/:id', async(req, res) => { 
    try 
    {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task) { return res.status(404).json({ message: 'Task Not Found' }); }

        res.status(200).json({ message: 'Task Deleted' })

    } catch (err) { 

        res.status(500).json({ error: 'Internal server error' }); 
    }
})

module.exports = router;