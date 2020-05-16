from flask import Flask, request, render_template
from keras.models import load_model
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/classify', methods=['POST'])
def predict():
    model = tf.keras.models.load_model('../trained-model.h5')

    try:
        #Processing input
        IMG_SIZE = 256
        img_array = cv2.imread(request.form['imageFile'])
        new_array = cv2.resize(img_array, (IMG_SIZE,IMG_SIZE))
        image = new_array.reshape(1, IMG_SIZE, IMG_SIZE, 3)

        predict = model.predict(image)
        predict_class = CATEGORIES[np.argmax(predict)]

        message = predict_class
        print("Success: ", predict_class)

    except Exception as e:
        #Store error to pass to the web page
        message = "Error encountered. Try another image. ErrorClass: {}, Argument: {} and Traceback details are: {}".format(e.__class__,e.args,e.__doc__)
        predict_class = "Error."

    return render_template('index.html', message=message, predict_class=predict_class)