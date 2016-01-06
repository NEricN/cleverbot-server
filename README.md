# Usage

To create a new conversation:

    curl -X POST -H "Content-Type: application/json" -d '{
       "message" : "How are you?"
    }' 'http://localhost:3000/write'

You receive

     {
       "response": "Hello.",
       "state": STATE
     }
     
To continue conversation, keep state and make similar post:

    curl -X POST -H "Content-Type: application/json" -d '{
       "message" : "Hi.",
       "state" : STATE
    }' 'http://localhost:3000/write'
    
Keep copying state over to continue.