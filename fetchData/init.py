from utils.db import fetch_one_result

query = "SELECT * FROM users"
result = fetch_one_result(query)
print(result)