const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname,'..','data','library.json');


async function loadBooks(){
    const data = await fs.readFile(DATA_FILE,'utf-8');
    return JSON.parse(data);
}

async function saveBooks(books){
    await fs.writeFile(DATA_FILE,JSON.stringify(books,null,2));
}

//GET /books
router.get('/',async(req,res,next) => {
    try{
        const books = await loadBooks();
        res.json(books);
    }catch(err){
        next(err);
    }
});

//POST /books
router.post('/',async(req,res,next)=>{
     try{
        const {title,author,pages} =req.body;
        if(!title || !author || typeof pages !== 'number'){
            return res.status(400).json({error: 'Missing or invalid fields'});
        }
        const books = await loadBooks();
        const newBook = {
            id: Date.now().toString(),
            title,
            author,
            pages
        };

        books.push(newBook);
        await saveBooks(books);

        res.status(201).json(newBook);
     }catch(err){
        next(err);
     }
});

router.put('/:id',async(req,res,next)=>{
    try{
      const bookId = req.params.id;
      const updates = req.body;

      if(!updates || Object.keys(updates).length === 0){
        return res.status(400).json({error: 'No update data sent'});
      }
      const books = await loadBooks();
      const idx = books.findIndex(b=>b.id === bookId);

      if(idx === -1){
        return res.status(404).json({error: "Book not found"});
      }

      const allowed = ['title', 'author', 'pages'];

      allowed.forEach(key => {
      if (updates[key] !== undefined) {
      if (key === 'pages' && typeof updates[key] !== 'number') return; 
       books[idx][key] = updates[key];
  }
});


      await saveBooks(books);
      res.json(books[idx]);
    }catch(err){
        next(err);
    };
});

router.delete('/:id',async(req,res,next)=>{
    try{
        const bookId = req.params.id;
        const books  = await loadBooks();
        const filtered  = books.filter(b => b.id !== bookId);

        if(filtered.length === books.length){
            return res.status(404).json({error: 'Book not found'});
        }
        await saveBooks(filtered);
        res.status(204).end();
    }catch(err){
        next(err);
    }
});

module.exports = router;
