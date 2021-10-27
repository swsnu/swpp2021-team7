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
