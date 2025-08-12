import re
import statistics
import sys
from groq import Groq
from pymongo import MongoClient

# DB connection
client = MongoClient('mongodb://127.0.0.1:27017')
db = client["PROFILE_MATCHER"]
candidate_collection = db["candidates"]
expert_collection = db["experts"]

# Groq API
groq_client = Groq(api_key="//YourGroqAPIKeyHere")

system_prompt = """
Given two lists of skills, Skills1 and Skills2, calculate the similarity score between them from 0 to 100 
based on Domain Relevance, Functional Overlap, Technical Similarity, Interchangeability, Compatibility, 
Usage Context, and Outcome Similarity. Provide only the score.
"""

# Data holders
expert_dict = {}
candidate_data = {}

def process_all_experts():
    for expert in expert_collection.find():
        expert_dict[expert['_id']] = {
            "technical_skills": expert.get('domain', []),
            "non_technical_skills": expert.get('non_technical_skills', [])
        }

def get_candidate_domain(candidate_id):
    candidate_user = candidate_collection.find_one({"_id": candidate_id})
    if not candidate_user:
        print("Candidate not found!")
        sys.exit(1)
    
    candidate_data["technical_skills"] = candidate_user.get("domain", [])
    candidate_data["non_technical_skills"] = candidate_user.get("non_technical_skills", [])

def getScore(prompt):
    scores = []
    for _ in range(3):
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            model="llama3-groq-70b-8192-tool-use-preview",
        )
        result = chat_completion.choices[0].message.content
        match = re.search(r'\d+', result)
        if match:
            scores.append(int(match.group()))
    return statistics.median(scores) if scores else 0

# Weights
w1, w2 = 2, 1
adjusted_w1, adjusted_w2 = w1 / (w1 + w2), w2 / (w1 + w2)

# Prepare data
get_candidate_domain(sys.argv[1])
process_all_experts()

dict_score_technical = {}
dict_score_non_technical = {}

for exp_id, exp_data in expert_dict.items():
    prompt_technical = f"skills1: {candidate_data['technical_skills']}\nskills2: {exp_data['technical_skills']}"
    prompt_non_technical = f"skills1: {candidate_data['non_technical_skills']}\nskills2: {exp_data['non_technical_skills']}"

    dict_score_technical[exp_id] = getScore(prompt_technical)
    dict_score_non_technical[exp_id] = getScore(prompt_non_technical)

# Final relevance score
relevancy_score = {
    exp_id: dict_score_technical[exp_id] * adjusted_w1 + dict_score_non_technical[exp_id] * adjusted_w2
    for exp_id in expert_dict
}

# Sort by score
sorted_relevancy = sorted(relevancy_score.items(), key=lambda x: x[1], reverse=True)

def get_top_experts():
    return [exp_id for exp_id, _ in sorted_relevancy[:3]]

top_experts = get_top_experts()
print(top_experts)
