const { spawn } = require('child_process');
const axios = require('axios');

if(process.argv[2] === undefined || process.argv[3] === undefined)
{
    throw Error ('Argument missing');
}
const ls = spawn('sh', ['./gatsby_script.sh', process.argv[2]]);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    
    axios.post(process.argv[3], {
            error: data.toString('utf8'),
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
    });
  console.log(`stderr: ${data.toString('utf8')}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

