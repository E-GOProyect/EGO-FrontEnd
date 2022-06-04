import express from 'express'; 
import path from 'path';

const app = express();

app.use(express.static('./dist/ego-app'));
app.get('/*',(req,res) => 
    res.sendFile('index.html', {root: 'dist/ego-app/'})
);

app.listen(process.env.PORT || 8080);