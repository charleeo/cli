const fs = require('fs');
const path = require('path');

    const LogUtils = {
        logData(result,req,res, message, statusCode,status=false){
            let emptyCheck = true
            let  logPath = 'logs'
            let  extension = '.txt'
            let file =  "log-"+ getDate()
            const fullPath = `${logPath}/${file}${extension}`
            let responseBody = JSON.stringify(result)
            let requestBody = JSON.stringify(req.body)
            let requestHeaders = JSON.stringify(req.headers)
            let route = JSON.stringify(req.route)
            let data = {
                RequestHeaders:  requestHeaders + "\n\r",
                RequestRoute:  route  + "\r\n",
                path: req.originalUrl + "\n\r",
                RequetBody : requestBody  + "\r\n",
                RequestResponse: responseBody + "\n\r",
                Message: message + "\n\r",
                StatusCode: statusCode,
                Status: status,
                StatusMessage: res.statusMessage
            }

            if(!fs.existsSync(path.join(__dirname, 'logs'))){
                fs.mkdir(path.join(__dirname, 'logs'), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
               
            }
   
            if(fs.existsSync(fullPath)){
                emptyCheck = checkEmptyFile(fullPath)
            }

            if(emptyCheck){
                fs.writeFile(fullPath, JSON.stringify(data),(err)=>{
                    if(err) { console.error(err); return}
                     return;
                });
            }else{
               fs.appendFile(fullPath, '\n\r', (err)=>{
                if(err) { console.error(err); return}
                 return;
               })
               fs.appendFile(fullPath, JSON.stringify(data), (err)=>{
                if(err) { console.error(err); return}
                 return;
               })
            }
        },

        logErrors(error){
            let err = error.stack
            let emptyCheck = true
            let  logPath = 'logs'
            let  extension = '.txt'
            let file =  "log-"+ getDate()
            const fullPath = `${logPath}/${file}${extension}`
            
            if(!fs.existsSync(path.join(__dirname, 'logs'))){
                fs.mkdir(path.join(__dirname, 'logs'), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
               
            }
   
            if(fs.existsSync(fullPath)){
                emptyCheck = checkEmptyFile(fullPath)
            }

            if(emptyCheck){
                fs.writeFile(fullPath, err,(err)=>{
                    if(err) { console.error(err); return}
                     return;
                });
            }else{
               fs.appendFile(fullPath, '\n\r', (err)=>{
                if(err) { console.error(err); return}
                 return;
               })
               fs.appendFile(fullPath, err, (err)=>{
                if(err) { console.error(err); return}
                 return;
               })
            }
        }
    }
    
    const getDate=()=>{
        let date_ob = new Date();

        // current date
        // adjust 0 before single digit date
        let day = ("0" + date_ob.getDate()).slice(-2);
        
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        
        // current year
        let year = date_ob.getFullYear();
        const date  = `${year}-${month}-${day}`
        return date
 }

 const  checkEmptyFile=(file)=>{
     let  empty = false;
     fs.readFile(file, (err, file) => {
        if(file.length == 0){
            empty= true
        }
        return empty
    })
 }
   
 module.exports = LogUtils



