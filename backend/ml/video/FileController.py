import os

class FileController:
    def  __init__(self):
        pass
    def checkPath(self, path=""):
        if os.path.exists(path) and os.path.isdir(path):
            return True
        if not os.access(path,os.W_OK):
            return False
        try:
            os.makedirs(path)
            return True
        except OSError:
            return False
    def checkVideo(self, path=""):
        if os.path.exists(path) and os.path.isfile(path):
            return True
        else:
            return False
        