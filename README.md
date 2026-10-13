### note: while moving from dashboard to expanded client page you need to wait for 2 to 3 min as we are using free tier of llm 

## deployed link (on render) : https://matchmaking-s522.onrender.com

### dummy details (assumption : the employee is already assigned his name and pass so that he can easily enter to the dashboard to see his assigned clients)
- email : matchmaker@company.com
- password : secret123

## things accomplished :
- login page with dummy details to enter:
- created dashboard to see all the assigned clients
- created json and stored on the backend (100 of the created with every property mentioned but for the sake of free tier of llm passing only some of the them to save the tokens)
- created details View page with 3 top matches done by ai llm
- once clicked send match you get a mini pop on top of that 
### while moving from dashboard to expanded client page you need to wait for 2 to 3 min as we are using free tier of llm 

### tech used
- Next.js (so that we dont need to create seperate frontend and backend)
- tried groq, gemini and lastly used OpenRouter integration for hitting the llm
- tailwind
- node.js
- lucide-react for small icons

  ## Matching login is purely based on system prompt (will paste the system prompt below)
  - You are an expert matchmaking CRM assistant. Analyze the target customer against the candidate pool and provide concise compatibility insights the matching should be done only with opposite gender. Give me the top 3 matches with a couple of points on why they match, along with basic details like first_name, last_name, dob, designation, gender and height_cm .Return ONLY a JSON object with this exact key structure: { "matches": [  { "id": number"first_name": "string","last_name": "string","match_score": number (e.g. 92),"designation": "string", "age": number,"height_cm": number,"reasons": ["Point 1", "Point 2", "Point 3"]   }

  ## How ai is used
  - as recommended used ai for matching the details by hitting the llm and passing the json data to it 


