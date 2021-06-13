// file system module to perform file operations
const fs = require('fs');
const uuid = require('uuid');
const  path = process.env.PWD + "/public/reminder.json";
const createReminder = (req, res) => {
    try {
        const { reminderText='', dateTime } = req.body;
        const reminderObj = {
            id: uuid.v1(),
            dateTime,
            reminderText
        }
        // stringify JSON Object
        const jsonContent = JSON.stringify([reminderObj]);
        if (fs.existsSync(path)) {
            const rawdata = fs.readFileSync(path);
            const reminderArray = JSON.parse(rawdata);
            reminderArray.push(reminderObj);
            fs.writeFile(path, JSON.stringify(reminderArray), 'utf8', function (err) {
                res.status(200).jsonp({msg: 'Reminder Added sucessfully', data: {} });
            });
        }else{
            fs.writeFile(path, jsonContent, 'utf8', function (err) {
                res.status(200).jsonp({msg: 'Reminder Added sucessfully', data: {} });
            });
        }
   } catch (err) {
       res.status(400).jsonp({ msg: err, data: null });
   }
};

const remindersList = (req, res) => {
    const rawdata = fs.readFileSync(path);
    const reminderArray = JSON.parse(rawdata);
    res.status(200).jsonp({
        msg: 'Render reminder list',
        data:reminderArray
    });
};

const reminderDetail = (req, res) => {
   const {id} = req.params;
    const rawdata = fs.readFileSync(path);
    const reminderArray = JSON.parse(rawdata);
    const reminderDetail = reminderArray.filter((el)=>{
        return el.id == id
    } );
    res.status(200).json({
        msg: 'data fetched sucessfully',
        data:reminderDetail[0]
    });
};

const updateReminder = (req, res) => {
    const {id} = req.params;
    const { reminderText='', dateTime } = req.body;
    const rawdata = fs.readFileSync(path);
    const reminderArray = JSON.parse(rawdata);
    const index = reminderArray.findIndex(x => x.id === id);
    reminderArray[index].reminderText = reminderText;
    reminderArray[index].dateTime = dateTime;
    fs.writeFile(path, JSON.stringify(reminderArray), 'utf8', function (err) {
        res.status(200).jsonp({msg: 'Reminder updated sucessfully', data: {} });
    });
};

const deleteReminder = (req, res) => {
    const {id} = req.params;
    const rawdata = fs.readFileSync(path);
    const reminderArray = JSON.parse(rawdata);
    const index = reminderArray.findIndex(x => x.id === id);
    reminderArray.splice(index,1);
    fs.writeFile(path, JSON.stringify(reminderArray), 'utf8', function (err) {
        res.status(200).jsonp({msg: 'Reminder deleted sucessfully', data: {} });
    });
};

module.exports = {createReminder, reminderDetail, updateReminder, deleteReminder, remindersList}