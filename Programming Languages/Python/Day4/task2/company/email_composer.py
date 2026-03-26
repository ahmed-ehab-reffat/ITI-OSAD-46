import os
import time


def compose_email(sender, to, subject, receiver_name):
    os.makedirs('emails', exist_ok=True)
    
    time_stamp = int(time.time())
    
    safe_receiver = receiver_name.replace(' ', '_')
    
    filename = os.path.join('emails', f"{safe_receiver}_{time_stamp}.txt")
    
    with open(filename, 'w') as f:
        f.write(f"From: {sender}\n")
        f.write(f"To: {to}\n")
        f.write(f"Subject: {subject}\n\n")
        f.write(f"\nHi, {receiver_name}\n")
        f.write(f"This is an email tamplate\n")
        f.write(f"Thanks\n")
    
    print(f"Email written to {filename}")
    return filename
