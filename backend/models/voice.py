import speech_recognition as sr
import torch
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification

# Initialize recognizer for audio transcription
recognizer = sr.Recognizer()

def transcribe_audio(audio_path):
    """
    Transcribe audio file to text using SpeechRecognition.
    """
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
        try:
            # Use Google Web Speech API for transcription (or replace with other recognizers)
            text = recognizer.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand the audio")
            return ""
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")
            return ""


# Load pre-trained DistilBERT tokenizer and model
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=6)  # Change num_labels as per your categories

# Define complaint categories (you can adjust this based on your use case)
complaint_categories = ['track_issue', 'signal_issue', 'coach_issue', 'station_infrastructure', 'cleanliness', 'other']

def classify_text(text):
    """
    Classify the transcribed text using DistilBERT.
    """
    # Tokenize the input text
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    
    # Perform inference
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Get the predicted label
    logits = outputs.logits
    predicted_class_id = torch.argmax(logits, dim=1).item()
    
    return complaint_categories[predicted_class_id]


def process_audio(audio_path):
    """
    Process an audio file: transcribe it and categorize the complaint using DistilBERT.
    """
    # Step 1: Transcribe the audio to text
    transcribed_text = transcribe_audio(audio_path)
    
    if not transcribed_text:
        print("Transcription failed or audio is empty.")
        return
    
    # Step 2: Classify the transcribed text using DistilBERT
    category = classify_text(transcribed_text)
    
    print(f"Complaint Category: {category}")
    return category

# Example usage
process_audio('complaint_audio.wav')


