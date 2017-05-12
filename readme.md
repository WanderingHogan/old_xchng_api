### Requires nodejs 7.10 (maybe other versions of 7.x? not sure).

### To run: 
`npm install && npm start`

The application runs on port 3k.

### API routes:
localhost:3000/api/ > a help document I have not filled out yet
localhost:3000/api/help > the same document as /api
localhost:3000/api/listExchanges > This is just an array of the exchanges stored in the database
localhost:3000/api/getLatestExchanges/:exchange > This lists the most recent exchanges for the three exchanges I am tracking. The /:exchange parameter is optional (put in one of the responses from listExchanges
localhost:3000/api/getBestRate/:btc > This route returns the best rate for each currency, and how much of each currency you would get for :btc.

### shitty frontend to see results of API
localhost:3000