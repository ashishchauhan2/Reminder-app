const fs = require('fs');
const  path = process.env.PWD + "/public/reminder.json";
const { emitSocket } = require('./socket'); 

/*************************************
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    |
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)

********************************************************/
// '0 0 1 * *' (*/1 * * * * (per minute))run command at 12:00AM on the first of every month----//

var schedule = require("node-schedule");
schedule.scheduleJob("*/3 * * * * *", function() {
    const rawdata = fs.readFileSync(path);
    const reminderArray = JSON.parse(rawdata);
    const currentTime = new Date().getTime();
    if(reminderArray?.length){
        for(var i = 0; i < reminderArray.length; i++) {
            if (!reminderArray[i]?.check && currentTime >= new Date(reminderArray[i]?.dateTime).getTime()){
              reminderArray[i].check = true;
              emitSocket(reminderArray[i]);
              fs.writeFile(path, JSON.stringify(reminderArray), 'utf8', function (err) {
                console.log('err',err);
              });
            }
        }
    }
});
