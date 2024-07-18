import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_email(to_addrs, body):
    from_addr = "jfqic6mwrysve3j5@ethereal.email"
    login = "jfqic6mwrysve3j5@ethereal.email"
    password = "4hfnKYn87t8E1SrgT9"

    msg = MIMEMultipart()
    msg["From"] = from_addr
    msg["To"] = ', '.join(to_addrs)
    msg["Subject"] = "Confirmação de viagem!"
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP("smtp.ethereal.email", 587)
        server.starttls()
        server.login(login, password)
        text = msg.as_string()

        for email in to_addrs:
            server.sendmail(from_addr, email, text)
    except Exception as e:
        print(f"Error sending email: {e}")
    finally:
        server.quit()