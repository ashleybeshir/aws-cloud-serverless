const { spawn } = require('child_process');
const axios = require('axios');

if(process.argv[2] === undefined || process.argv[3] === undefined)
{
    throw Error ('Argument missing');
}
const ls = spawn('sh', ['./gatsby_script.sh', process.argv[2]]);

//for some reason gatsby build process is outputing some normal stuff to stderr. So need to check if their is a actual error
//even though this process isnt accurate
var errorCheckList = ["error","fatal","exception"];

ls.stdout.on('data', (data) => {
  //console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    let formattedData = data.toString('utf8');
    errorCheckList.forEach((e)=>{
        let sendError = true;
        if(formattedData.includes(e) && sendError === true)
        {
            axios.post(process.argv[3], {
                error: "Gatsby build error: "+formattedData,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            sendError = false;
        }
    });
  //console.log(`stderr: ${data.toString('utf8')}`);
});

ls.on('close', (code) => {
  //console.log(`child process exited with code ${code}`);
});

