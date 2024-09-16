import torch
import cv2
from PIL import Image
import numpy as np
import torchvision.models as models
import torchvision.transforms as transforms

# Load YOLOv5 model for object detection
yolo_model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

# Load pre-trained ResNet for classification
resnet_model = models.resnet50(pretrained=True)
resnet_model.eval()

# Define transformations for ResNet input
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Define complaint categories (you can adjust this list based on your system)
complaint_categories = ['track_issue', 'signal_issue', 'coach_issue', 'station_infrastructure', 'cleanliness', 'other']

def classify_image(image):
    """
    Classify the given image using ResNet.
    """
    image = transform(image).unsqueeze(0)  # Add batch dimension
    with torch.no_grad():
        outputs = resnet_model(image)
        _, predicted = outputs.max(1)
    return complaint_categories[predicted.item()]

def process_frame(frame):
    """
    Process a single frame: detect objects with YOLOv5 and classify with ResNet.
    """
    # Convert frame (OpenCV BGR) to RGB
    img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(img_rgb)

    # Step 1: Detect objects in the frame using YOLOv5
    results = yolo_model(pil_image)
    bboxes = results.xyxy[0]  # Extract bounding boxes

    # Step 2: Iterate over detected objects and classify
    for bbox in bboxes:
        x1, y1, x2, y2, conf, cls = bbox
        
        # Crop the detected object
        cropped_img = pil_image.crop((x1, y1, x2, y2))
        
        # Classify the cropped object using ResNet
        department = classify_image(cropped_img)
        
        # Draw bounding box and label on the original frame
        cv2.rectangle(frame, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
        label = f'{department} ({conf:.2f})'
        cv2.putText(frame, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 0, 0), 2)

    return frame

def process_video(video_path, output_path):
    """
    Process the video frame by frame and categorize complaints based on objects detected.
    """
    # Capture the video
    cap = cv2.VideoCapture(video_path)

    # Get video properties
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')

    # Create video writer for saving output
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Process each frame for complaint detection and categorization
        processed_frame = process_frame(frame)
        
        # Write the processed frame to the output video
        out.write(processed_frame)

        # Optionally, display the frame in real-time (for debugging purposes)
        cv2.imshow('Complaint Categorization', processed_frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    out.release()
    cv2.destroyAllWindows()

# Example usage
process_video('input_video.mp4', 'output_video.mp4')