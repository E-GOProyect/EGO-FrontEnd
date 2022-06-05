import express from 'express'; 
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','*');
//     next();
// });
app.get('/*',cors(), (req, res, next) => {
    res.sendFile('index.html', {root: 'dist/ego-app/'})
}
);

app.listen(process.env.PORT || 8080);