from django.test import TestCase

# Create your tests here.
class MyPageTestCase(TestCase):
    
    def test_sample(self):
        four = 4
        self.assertEqual(four, 4)