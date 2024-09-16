import torch
import cv2
from PIL import Image
import numpy as np

# Load pre-trained YOLOv5 model
yolo_model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

def detect_objects(image_path):
    # Perform object detection using YOLOv5
    results = yolo_model(image_path)
    return results

import torchvision.models as models
import torchvision.transforms as transforms

# Load pre-trained ResNet model
resnet_model = models.resnet50(pretrained=True)
resnet_model.eval()

# Define transforms to match the input size expected by ResNet
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Define your complaint categories
complaint_categories = ['track_issue', 'signal_issue', 'coach_issue', 'station_infrastructure', 'cleanliness', 'other']

def classify_image(image):
    # Preprocess image for ResNet input
    image = transform(image).unsqueeze(0)  # Add batch dimension
    
    # Perform inference using ResNet
    with torch.no_grad():
        outputs = resnet_model(image)
        _, predicted = outputs.max(1)
    
    return complaint_categories[predicted.item()]

def process_image(image_path):
    # Step 1: Detect objects in the image using YOLOv5
    results = detect_objects(image_path)
    
    # Extract bounding boxes from YOLOv5 results
    bboxes = results.xyxy[0]  # x1, y1, x2, y2, confidence, class
    
    # Load the image using OpenCV
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Convert OpenCV image to PIL Image
    pil_image = Image.fromarray(img_rgb)

    # Step 2: Iterate over detected objects and classify them
    for bbox in bboxes:
        x1, y1, x2, y2, conf, cls = bbox
        
        # Crop the detected object from the image
        cropped_img = pil_image.crop((x1, y1, x2, y2))
        
        # Step 3: Classify the cropped object using ResNet
        department = classify_image(cropped_img)
        
        # Print the result
        print(f"Detected Department: {department} (Confidence: {conf:.2f})")
    
# Example usage
process_image('railway_complaint_image.jpg')
