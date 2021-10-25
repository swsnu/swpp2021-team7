## **View**<br />
User interface for our view design is as follows:
![UI Specification](https://user-images.githubusercontent.com/52434833/137576862-bdc16bab-3fec-4d32-b677-04bae43652b8.jpg)
2. Main Page ('/')
- User can check the idol search rankings in `hottest-idol-tab`
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
- User can click `go-video-indexing` button. When user clicks `go-video-indexing` button, user is redirected to Video Indexing Page('/video')
4. Ranking Page ('/rank')
- Users can check the idol search rankings
- User can click one of the idol in the page. When user clicks one of the idol, user is redirected to `Search Result Page('/search/:id')`
