import face_recognition
import cv2

class faceRecognition:
    def __init__(self, video="", idol=[]):
        self.video = video
        self.idol = idol
    
    def setVideo(self, video = ""):
        self.video = video
    
    def setIdol(self, idol = []):
        self.idol = idol

    def parse(self):
        if(len(self.video) == 0):
            print("no video file, please set the video url.")
            return
        if(len(self.idol) == 0):
            print("no targeted idols.")
            return
        input_movie = cv2.VideoCapture(self.video)
        length = int(input_movie.get(cv2.CAP_PROP_FRAME_COUNT))

        # Create an output movie file (make sure resolution/frame rate matches input video!)
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        output_movie = cv2.VideoWriter('output.avi', fourcc, 29.97, (640, 360))

        # Load some sample pictures and learn how to recognize them.
        known_faces = []
        for img in self.idol:
            face_image = face_recognition.load_image_file(img.src)
            face_encoding = face_recognition.face_encodings(face_image)[0]
            known_faces.append(face_encoding)
   

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

            # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
            rgb_frame = frame[:, :, ::-1]

            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_frame)
            face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

            face_names = []
            index_number = 0
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                match = face_recognition.compare_faces(known_faces, face_encoding, tolerance=0.50)

                # If you had more than 2 faces, you could make this logic a lot prettier
                # but I kept it simple for the demo
                name = None
                if match[index_number]:
                    name = self.idol[index_number]

                face_names.append(name)
                index_number += 1

            # Label the results
            for (top, right, bottom, left), name in zip(face_locations, face_names):
                if not name:
                    continue

                # Draw a box around the face
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

                # Draw a label with a name below the face
                cv2.rectangle(frame, (left, bottom - 25), (right, bottom), (0, 0, 255), cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6), font, 0.5, (255, 255, 255), 1)

            # Write the resulting image to the output video file
            print("Writing frame {} / {}".format(frame_number, length))
            output_movie.write(frame)

        # All done!
        input_movie.release()
        cv2.destroyAllWindows()