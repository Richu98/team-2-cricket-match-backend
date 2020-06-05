# team-2-cricket-match-backend
https://api-cricket-match.herokuapp.com/

## Project Rubics
| Requirement | Description |
| --- | --- |
| `Update Score` |this will be a common API for the team Batting or Bowling. When a team bats you pass in the type as “bat” and score against the teamId declared for each team.|
| `Who is winning` |You pass the score of both team to the backend to declare the winner from there. This operation will update the DB as well who has won, so no foul games accepted!!|
| `Clean Code` | Code needs to be clean and intended! Also please try to optimise ‘requires’ , make things in modular manner, every domain logic should go into a different function.|
| `Comments` | User interactive comments for every part where you might think is hard to understand in first go |
| `Error Handling` | Error handling on all the data input on API’s , so that you don’t end up in messing up database|
| `Create Team` | Create a team API, you can accept an array of team players while first time creating or else you can update the existing team, so this will be an upsert operation in DB.Note: you can always add or delete fields in this basic schema provided. The basic model is |

```
{
    "teamName": "",
    "players": [
        {
            "name": "",
            "position": ""
        }
    ],
    "runs": 0,
    "scored": 0,
    "matchResult":1,
    "action":[{
    	"type":"bat",
    	"runs":0
    }]
}

```
