import tweepy
from ntscraper import Nitter
import time
import re
import requests
import os
import tempfile
import google.generativeai as genai

# Twitter API Authentication
client = tweepy.Client(
    consumer_key="F3T6VWd7p1Oquhiz5DFLkG44I",
    consumer_secret="f7JNflwQhaTvJ8in9pPOnqYBQ9LJchmLMZBKcvs7lXIaXVvIay",
    access_token="1679536837956878336-WN2WEfq6hHvowx1kQPo3gHpi0YSoKj",
    access_token_secret="jnk10tA7yelBaZcMvctJmPgGwQV058uYB2SEsXVEwJiSG"
)

# Initialize Nitter scraper
scraper = Nitter()

# Configure the Gemini API
genai.configure(api_key="AIzaSyC6iqFmmBrHeAzOu4VSgO7SYCkNtmwCZM8")
model = genai.GenerativeModel('gemini-pro-vision')

# Define search terms and file paths
search_term = "@RailMadad"
results_file = "tweets_analysis.txt"

def is_complaint_tweet(text):
    # Check for complaint indicators
    complaint_keywords = ['issue', 'problem', 'complaint', 'help', 'assistance', 'not working', 'delay', 'cancel']
    return any(keyword in text.lower() for keyword in complaint_keywords)

def contains_relevant_info(text):
    patterns = [
        r'\b(?:PNR|pnr|Pnr)\b',
        r'\b(?:coach|COACH)\s*(?:no\.?|number)?\s*[A-Z0-9]+\b',
        r'\b(?:train|TRAIN)\s*(?:no\.?|number)?\s*\d+\b',
        r'\b(?:seat|SEAT)\s*(?:no\.?|number)?\s*[A-Z0-9]+\b',
        r'\b(?:berth|BERTH)\s*(?:no\.?|number)?\s*[A-Z0-9]+\b'
    ]
    return any(re.search(pattern, text) for pattern in patterns)

def download_image(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.content
    except Exception as e:
        print(f"Error downloading image: {e}")
    return None

def analyze_image_with_gemini(image_path, tweet_text):
    with open(image_path, 'rb') as f:
        image_data = f.read()

    prompt = f"Analyze this image and the following tweet text. Extract the main complaint or issue, any relevant information such as PNR numbers, coach numbers, train numbers, seat numbers, or any other railway-related details:\n\nTweet: {tweet_text}"

    response = model.generate_content([prompt, image_data])
    return response.text

# Scrape tweets and process with Gemini
tweets_data = []
try:
    posts = scraper.get_tweets(search_term, mode='term', number=10)  # Increased number of tweets to search through
    for post in posts['tweets']:
        if is_complaint_tweet(post['text']) and contains_relevant_info(post['text']):
            tweet_data = {
                'id': post['link'].split('/')[-1].split('#')[0],
                'text': post['text'],
                'images': post.get('images', []),
                'analysis': []
            }

            # Process images
            for image_url in tweet_data['images']:
                image_content = download_image(image_url)
                if image_content:
                    with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_image:
                        temp_image.write(image_content)
                        temp_image_path = temp_image.name

                    analysis = analyze_image_with_gemini(temp_image_path, tweet_data['text'])
                    tweet_data['analysis'].append(analysis)

                    # Remove temporary image file
                    os.unlink(temp_image_path)

            tweets_data.append(tweet_data)
    time.sleep(5)  # Wait for 5 seconds between requests
except Exception as e:
    print(f"Error fetching or processing tweets: {e}")

# Save tweets and analysis to results file
with open(results_file, 'w', encoding='utf-8') as file:
    for tweet in tweets_data:
        file.write(f"Tweet ID: {tweet['id']}\n")
        file.write(f"Text: {tweet['text']}\n")
        file.write("Image Analyses:\n")
        for i, analysis in enumerate(tweet['analysis'], 1):
            file.write(f"Image {i} Analysis:\n{analysis}\n")
        file.write("-" * 50 + "\n")

print(f"Retrieved, analyzed, and saved {len(tweets_data)} relevant complaint tweets mentioning @RailMadad and containing railway-related information.")
print("Bot run completed.")