from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class ContactView(APIView):
    def post(self, request, format=None):
        name = request.data.get('name')
        email = request.data.get('email')
        subject = request.data.get('subject')
        message = request.data.get('message')

        email_subject = f'We got you covered {name}'
        email_body = f'Hi {name}, \n' \
                     f'Thanks for contacting us!\n' \
                     f'We received you message: \n' \
                     f'\'{subject}\'.\n' \
                     f'\'{message}\'\n' \
                     f'We will get back to you as soon as possible.\n' \
                     f'Best Regards'
        send_mail(
            email_subject,
            email_body,
            settings.EMAIL_HOST_USER,
            [email],
        )
        return Response({'detail': 'Email send successfully'}, status=status.HTTP_200_OK)
