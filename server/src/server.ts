import express, {Express,Request,Response} from "express"
import dotenv from "dotenv"
import axios from "axios";

dotenv.config();

const app:Express = express()
const PORT = process.env.PORT
const API_KEY = process.env.API_KEY;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

app.post('/api', async (req: Request, res: Response) => {
   
    
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', req, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching data from OpenAI API:', error);
      res.status(500).send('Error fetching data from OpenAI API');
    }
  });



app.listen(PORT, ()=>{console.log(`my server started on server ${PORT}`)})