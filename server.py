from flask import Flask, request
import smtplib
from email.message import EmailMessage
import os

app = Flask(__name__)

SMTP_USER = os.environ.get("SMTP_USER")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")
EMAIL_RECEIVER = os.environ.get("EMAIL_RECEIVER")

@app.route("/send", methods=["POST"])
def send_file():
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
except Exception as e:
    return f"Ошибка при отправке письма: {e}", 500
