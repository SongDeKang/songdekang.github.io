var spawn = require('child_process').spawn;
hexo.on('new', function(data){
    spawn('C:\\Users\\14944\\AppData\\Local\\Programs\\Microsoft VS Code\\bin\\code.cmd', [data.path]);
});