import webbrowser
import random

websites = [
  "https://www.wikipedia.org",
  "https://www.reddit.com",
  "https://www.leetcode.com",
  "https://www.github.com",
]

chosen_site = random.choice(websites)

print(f"Opening: {chosen_site}")

webbrowser.open(chosen_site)
