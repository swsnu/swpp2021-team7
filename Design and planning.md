# **Design and Planning** 



## **Member ** <br />

Eunbin Kang, Sohyun Kim, Jiho Kim, Youngchae Yoon

## **System Architecture** <br />

## **Model** <br />

Entity-Relationship diagram (E-R Diagram) of out model design is as follows:

![ERDiagram](VIDOL-ver2.pdf)

Each square means Entity and Entities are connected by a line, which means Relationship. This means that when a line enters an entity in multiple branches, several entities may correspond.

## **View**<br />

User interface for our view design is as follows:
![UI Specification](https://user-images.githubusercontent.com/52434833/137576862-bdc16bab-3fec-4d32-b677-04bae43652b8.jpg)

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


2. Main Page ('/')
- User can check the top 10 idol search rankings in `hottest-idol-tab`
- User can click one of the idol in the `hottest-idol-tab`. When user clicks one of the idol in the `hottest-idol-tab`, user is redirected to `Search Result Page('/search/:id')`
- User can click `hottest-idol-tab`. When user clicks `hottest-idol-tab`, user is redirected to `Ranking Page('/rank')`
- User can type idol search keyword in `search-input` input and click `search-button` button
- After searching, user can check the search result list
- User can click one of the search result list. When user clicks one one of the search result list, user is redirected to `Search Result Page('/search/:id')`
3. Search Result Page ('/search/:id')
- User can see crawled information from Internet, SNS, Youtube and shared indexed video 
- User can see comments for the corresponding idol
- If user types content in `comment-input` input and clicks `comment-create` button, a new comment written by the user is posted to the current page
- If user already wrote a comment, the user can click `comment-edit` button
- After clicking `comment-edit` button, corresponding comment becomes editable and user can change comment content.
- After changing comment content, user can click `comment-edit` button and the corresponding comment becomes uneditable
- If user already wrote a comment, the user can click `comment-delete` button
- After clicking `comment-delete` button, `delete-comment-confirm` pops up
- After clicking `confirm` button in `delete-comment-confirm`, corresponding comment is deleted
- User can click `go-video-indexing` button. When user clicks `go-video-indexing` button, user is redirected to `Video Indexing Page('/video')`
4. Ranking Page ('/rank')
- Users can check all the idol search rankings
- User can click one of the idol in the page. When user clicks one of the idol, user is redirected to `Search Result Page('/search/:id')`

5. My Page('/mypage/:id')

- Users can check my activities in `My Page('/mypage/:id')`
- Users can see their favorite idols list in `List of my idols`
- When user clicks one of the idol in `List of my idols`, user is redirected to `Search Result Page('/search/:id')`
- When user clicks `cancel-like` button next to idol's name, that idol is removed from `List of my idols` and user redirects to updated page. 
- Users can see their scraped articles list in `Scraped articles`
- When user clicks one of the articles in `Scraped articles`, user is redirected to `Search Result Page('/search/:id')` where that article exists
- When user clicks `delete` button next to article, that article is removed from `Scraped articles` and user redirects to updated page
- Users can see their comments in `My Comments`
- When user clicks comment's content, user is redirected to `Search Result Page('/search/:id')`

## **Frontend Components**<br />
Tables below are the frontend components. The attributes and the methods of each component are listed in each box.

## Video Indexing
1-1. Entry Page ('/video')
| Field name  | Type |
| ------------- | ------------- |
| Video link  | YouTube video link (regex) |
| Cut Scenes Button | Button  |
| Extract my idol parts button  | Button  |

- User can type the link of the video to get indexed.
- If typing nothing or link with wrong format, the buttons are disabled.
- User can move to /video/result by clicking Cut Scenes Button.
- User can move to /video/search by clicking Extract my idol parts button.
- Server starts to get the video from the link and index it.
- If the link is invalid, which means that the format is appropriate but the video is deleted or is private, alert appears and the page does not change.

1-2. Search Idol Page ('/video/search/')

| Field name  | Type |
| ------------- | ------------- |
| Search input  | text |
| Search button  | Button |
| Search result button  | Button |
| Request support button  | Button  |

- User can type the name of the idol trying to get parts of. 
- If user types nothing, search button is disabled.
- If user clicks search button with input, search result appears under the input box.
- Buttons of idols that we have pretrained model are activated.
- Buttons of idols with no pretrained model are disabled.
- When user clicks idol button activated, the user gets redirected to /video/result.
- Next to idol buttons which are disabled, there is a 'Request support' button.
- When clicking 'Request support' button, request gets sent to the server.
- 'Request support' button gets diasbled when once clicked.

1-3. Scene Cut Page ('/video/result')

| Field name  | Type |
| ------------- | ------------- |
| Save Selected Scenes Button  | Button |
| Scene  | Button  |

- Users can see the timeline of the video indexed with scene changes.
- Users can click each scene to include or exclude it in the final video.
- When clicking not selected scene, it gets colored.
- When clicking already selected scene, its background gets removed.
- If no scene is selected, Save Selected Scenes button is disabled.
- When clicking Save Selected Scenes button, the video with selected scenes gets downloaded. User can stay at the page and keep editing.

1-4. Extracting Selected Idol Page ('/video/result')

| Field name  | Type |
| ------------- | ------------- |
| Save Selected Scenes Button  | Button |
| Share Timelines Button | Button |
| Scene  | Button  |

- Users can see the timeline of the video indexed with the selected idol.
- Users can click each scene to include or exclude it in the final video.
- When clicking not selected scene, it gets colored.
- When clicking already selected scene, its background gets removed.
- If no scene is selected, Save Selected Scenes button is disabled.
- When clicking Save Selected Scenes button, the video with selected scenes gets downloaded. User can stay at the page and keep editing.
- When clicking Share Timelines button, the server saves the timeline and matches it to the seleted idol.
- When sharing process is done, confirm button suggesting moving to the search result page of the idol to check the shared timelines appears.
