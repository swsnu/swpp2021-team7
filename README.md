# swpp2021-team7
## Project Abstract
Vidol is a K-POP related web service that helps idol fans enjoy their favorite idols' contents much more diversely. and conveniently. There are two main problems idol fans encounter when following up K-POP contents: they are so scattered and it is extremely hard to exclude unwanted parts in video contents. Therefore,  Vidol provides two main features: serving integrated data and extracting user-wanted parts in videos.<br/><br/>Vidol collects and processes data of idols in advance by crawling. With the well-organized data we provide, users can follow up updates of their favorites easily. All users need to do is just typing the name of  idols. It is the same in video indexing service. When users input the video url and the idol they want to extract parts of, with machine learning, Vidol scans the video and index it either by scene change or appearing figures. With the result, users can recreate contents by saving and editing it.<br/><br/>Our goal is to boost K-POP fanship culture up by enabling effiecient content consumption and recreation. As K-POP market is growing and Vidol itself promotes creating contents, the importance and the utility of Vidol would get more significant over time.

## User Stories

### Video Indexing

### 1. Index Video by Scene Changes

#### 1.1 Input Video by Link

- Meta specs

  | Index        | Content                      |
  | ------------ | ---------------------------- |
  | FeatureName  | Input Video by Youtube Link  |
  | Actors       | User                         |
  | Precondition | User is on `Video Indexing Page(/video)`         |

- Scenario

  - **GIVEN** the user is on Video Indexing - Entry Page.
  - **WHEN** the user types the link of the video to index and clicks `Cut Scenes` button.
  - **THEN** the user is redirected to <em>`Scene Cut Page`</em>.

- Exceptions
  - The link user inputs is not working.
  - The link user inputs is not from Youtube.
 
- Acceptance test
  - 'Cut Scenes' button gets active when the user inputs a valid link.
  - When user clicks the button, video scanning process starts and user sees loader until the process ends and finally gets redirected to the result page.


#### 1.2 Edit Video

- Meta specs

  | Index        | Content                      |
  | ------------ | ---------------------------- |
  | FeatureName  | Edit video with the indexing  |
  | Actors       | User                         |
  | Precondition | User is on `Video Indexing Result Page(/video/result)`         |

- Scenario

  - **GIVEN** the user is on Video Indexing - Result Page.
  - **WHEN** the user checks videos and picks the parts to keep by clicking scenes
  - **THEN** the selected scenes are marked with colors and total length of the selected parts appears

- Acceptance test
  - When the user clicks a scene, it gets played immediately in the player on top.
  - When the user right-clicks the scene not selected, the scene gets coloured.
  - When the user right-clicks the scene already selected, the scene gets back to the initial state(white).
 
 
 #### 1.3 Save Video

- Meta specs

  | Index        | Content                      |
  | ------------ | ---------------------------- |
  | FeatureName  | Save Video of Selected Parts  |
  | Actors       | User                         |
  | Precondition | User is on `Video Indexing Result Page(/video/result)`         |

- Scenario

  - **GIVEN** the user is on Video Indexing - Result Page.
  - **WHEN** the user clicks 'Save Selected Scenes' button.
  - **THEN** downloading the video of selected scenes in the user's device starts.

- Exceptions
  - No scene is selected.
 
- Acceptance test
  - When the user clicks the 'Save Selected Scenes' button, loader appears on the screen and downloading starts when the video is ready.

