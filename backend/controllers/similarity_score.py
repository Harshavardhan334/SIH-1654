import re
import statistics
import sys
from groq import Groq
from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:27017')

db = client["PROFILE_MATCHER"]
candidate_collection = db["candidates"]

expert_collection = db["experts"]

groq_client = Groq(
    api_key="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",
)
system_prompt = "Given two lists of skills, Skills1 and Skills2, calculate the similarity score between them from 0 to 100 based on your Domain Relevance,Functional Overlap,Technical Similarity,Interchangeability,Compatibility,Usage Context,Outcome Similarity. Provide only the score."
expert_dict={}
candidate={}
def process_all_experts():
    for expert in expert_collection.find():
         expert_dict.update({expert['_id'],{"technical_skills":(expert['domain']),"non_technical_skills":(expert['non_technical_skills'])}})


def get_candidate_domain(candidate_id):
    try:
        # Find the candidate by their ID
        candidate_user = candidate_collection.find_one({"_id": candidate_id})

        if not candidate_user:
            print("Candidate not found!")
            return

        domain = candidate_user.get("domain", [])
        non_tech_skill = candidate_user.get("non_technical_skills", [])
        candidate.update({candidate_id:{"technical_skills":domain,"non_technical_skills":non_tech_skill}})

    except Exception as e:
        print("An error occurred:", e)

def getScore(prompt):
    scores = []
    for i in range(3):
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama3-groq-70b-8192-tool-use-preview",
        )

        result = (chat_completion.choices[0].message.content)
        match = re.search(r'\d+', result)
        matched_value = int(match.group())
        print(matched_value)
        scores.append(matched_value)

    return (statistics.median(scores))

w1=2
w2=1
adjusted_w1=w1/(w1+w2)
adjusted_w2=w2/(w1+w2)
dict_score_non_technical={}
dict_score_technical={}
get_candidate_domain(sys.argv[1])

for i in expert_dict:
    prompt_technical = (
        f"skills1: {', '.join(candidate['technical_skills'])} "+"\n "+
        f"skills2: {', '.join(expert_dict['i']['technical_skills'])}"
    )
    prompt_non_technical = (
        f"skills1: {', '.join(expert_dict[candidate]['non_technical_skills'])} "+"\n "+
        f"skills2: {', '.join(expert_dict['i']['non_technical_skills'])}"
    )

    dict_score_technical.update({i:getScore(prompt_technical)})
    dict_score_non_technical.update({i:getScore(prompt_non_technical)})

relevancy_score={}
for i in expert_dict:
    score=dict_score_technical[i]*adjusted_w1+dict_score_non_technical[i]*adjusted_w2
    relevancy_score.update({i,score})

sorted_relevancy = sorted(relevancy_score.items(), key=lambda x: x[1], reverse=True)

def get_top_experts():
    if len(sorted_relevancy) <= 6:
        return [key for key, value in sorted_relevancy]
    return [key for key, value in sorted_relevancy[:6]]

top_experts = get_top_experts()
print(top_experts)