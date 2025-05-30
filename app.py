from flask import Flask, request, send_file
from flask_cors import CORS
import smtplib
from email.message import EmailMessage
import os

app = Flask(__name__)
CORS(app)

SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
EMAIL_RECEIVER = os.environ.get("EMAIL_RECEIVER")

@app.route("/")
def home():
    return send_file("index.html")

@app.route("/send", methods=["POST"])
def send_file_route():
    name = request.form.get("name")
    file = request.files.get("file")

    if not name or not file:
        return "Имя и файл обязательны", 400

    msg = EmailMessage()
    msg["Subject"] = f"Домашняя работа от {name}"
    msg["From"] = SMTP_USER
    msg["To"] = EMAIL_RECEIVER
    msg.set_content(f"{name} отправил(а) домашнюю работу.")

    msg.add_attachment(
        file.read(),
        maintype="application",
        subtype="octet-stream",
        filename=file.filename
    )

    try:
        with smtplib.SMTP("mail.privateemail.com", 587) as smtp:
            smtp.starttls()
            smtp.login(SMTP_USER, SMTP_PASSWORD)
            smtp.send_message(msg)
        return '''
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Отправка успешна</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding-top: 80px;
                background-color: #f9f9f9;
            }
            h1 {
                color: #2e7d32;
                font-size: 32px;
            }
        </style>
    </head>
    <body>
        <h1>Письмо отправлено успешно!</h1>
    </body>
    </html>
''', 200
    except Exception as e:
        return f"Ошибка при отправке письма: {e}", 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
