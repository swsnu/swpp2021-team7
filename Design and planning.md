## 1. Login
1-1. Signin Page ('/sign/login')

| Field name  | Type |
| ------------- | ------------- |
| signin-email-input  | email (regex) |
| signin-password-input  | password (string)  |
| signin-submit-button  | Button (form submit)  |
| signin-account-create-button  | Button |
| signin-find-account-button  | Button |

- User can log in the VIDOL service
- User can type email in `signin-email-input`
- User can type password in `signin-password-input`
- User can submit the form by click `signin-submit-button`
- If user's account information is wrong, remain on the `signin page` and show the error message to the user.
- If user wanted to create new account, click `signin-account-create-button` and redirect to `signup page`.
- If user forgot owned account, click `signin-find-account-button` and redirect to `find account page`.

1-2. Signup Page ('/sign/join')

| Field name  | Type |
| ------------- | ------------- |
| signup-email-input  | email (regex) |
| signup-surname-input  | name (regex) |
| signup-given-name-input  | name (regex) |
| signup-password-input  | password (string, regex)  |
| signup-re-password-input  | password (string, regex)  |
| signup-submit-button  | Button (form submit)  |
| signup-login-button  | Button |
| signup-find-account-button  | Button |

- User can create an account by his/her information
- User can type email in `signup-email-input`
- User can type password in `signup-password-input` and `signup-re-password-input`
- A value of `signup-password-input` and `signup-re-password-input`'s must be same.
- User can type his/her name in `signup-surname-input` and `signup-given-name-input`
- If user forgot owned account, click `signup-find-account-button` and redirect to `find account page`.
- If user have had an account already, click `signup-login-button` and redirect to `signin page`.
- After user click `signup-submit-button`, the form must check the validation of values of inputs.
- If the value of  `signup-email-input` is conflict with exist accounts list from database, remain on the `signup page` and show the error message to user.
- If there is no problem in all fields, create the account by the values in the form and redirect to `signin page`.

1-3. Find Account Page ('/sign/findAccount')

| Field name  | Type |
| ------------- | ------------- |
| find-account-email-input  | email (regex) |
| find-account-submit-button  | Button (form submit)  |
| find-account-login-button  | Button |
| find-account-account-create-button  | Button |


- User can find his/her account.
- User can type email in `find-account-email-input`
- If the value of email in `find-account-email-input` is invalid through regex format, show the error message to the user.
- User can submit the form by click `find-account-submit-button`
- After click `find-account-submit-button`, check the email value exists in database.
- If exists, send a verification mail to the email address that a value of `find-account-email-input`.
- If not exist, show the error message to the user.
- If user have had an account already, click `find-account-login-button` and redirect to `signin page`.
- If user wanted to create new account, click `find-account-create-button` and redirect to `signup page`.
