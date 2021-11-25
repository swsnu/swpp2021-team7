from django.http import response
from django.test import TestCase, Client
import json

# Create your tests here.
class AccountTestCase(TestCase):
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        
        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.delete('/api/token/', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)
        