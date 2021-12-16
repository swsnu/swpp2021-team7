import face_recognition
import cv2
import requests

class faceRecognition:
    def __init__(self, video="", idol=[]):
        self.video = video
        self.idol = idol
    
    def setVideo(self, video = ""):
        self.video = video
    
    def setIdol(self, idol = []):
        self.idol = idol

    def parse(self, real_fps=0.1, tolerance=0.50):
        if(len(self.video) == 0):
            print("no video file, please set the video url.")
            return []
        if(len(self.idol) == 0):
            print("no targeted idols.")
            return []
        
        input_movie = cv2.VideoCapture(self.video)
        input_movie.set(cv2.CAP_PROP_FPS, 1)

        
        length = int(input_movie.get(cv2.CAP_PROP_FRAME_COUNT))
        fps = float(input_movie.get(cv2.CAP_PROP_FPS))
        time = length / fps

        # Load some sample pictures and learn how to recognize them.
        known_faces = []
        results = []
        for img in self.idol:
            raw_image = requests.get(img, stream=True).raw
            face_image = face_recognition.load_image_file(raw_image)
            face_encoding = face_recognition.face_encodings(face_image)[0]
            known_faces.append(face_encoding)
            results.append([])
   

        # Initialize some variables
        face_locations = []
        face_encodings = []
        face_names = []
        frame_number = 0

        while True:
            # Grab a single frame of video
            ret, frame = input_movie.read()
            
            frame_number += 1
            
            # Quit when the input video file ends
            if not ret:
                break
            if frame_number % round(fps / real_fps) == 0:
                # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
                rgb_frame = frame[:, :, ::-1]

                # Find all the faces and face encodings in the current frame of video
                face_locations = face_recognition.face_locations(rgb_frame)
                face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

                face_names = []
                
                for face_encoding in face_encodings:
                    # See if the face is a match for the known face(s)
                    match = face_recognition.compare_faces(known_faces, face_encoding, tolerance=tolerance)
                    
                    name = None
                    index_number = 0
                    for i in known_faces:
                        if match[index_number]:
                            name = self.idol[index_number]
                            results[index_number].append(frame_number * real_fps)
                        index_number += 1
                    face_names.append(name)

                # Check the progress
                print("Writing frame {} / {}".format(frame_number, length))

        #  finish the file
        input_movie.release()
        cv2.destroyAllWindows()
        return results