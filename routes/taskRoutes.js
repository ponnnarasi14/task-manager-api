const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//add task
router.post('/tasks', async (req, res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json(task);
    }
    catch (err){
        res.status(400).json({ error: err.message });
    }

})

//get all task
router.get('/tasks', async(req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
})

//update task
router.put('/tasks/:id', async(req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task Updated', task});
    }
    catch (err){
        res.status(500).json({ error: 'Something Went Wrong' });
    }
});

//delete task
router.delete('/tasks/:id', async(req, res) => { 
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task Deleted' })
})

module.exports = router;