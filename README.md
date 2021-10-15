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


### 2. Extract Parts of Selected Idol

#### 2.1 Input Video by Link

- Meta specs

  | Index        | Content                      |
  | ------------ | ---------------------------- |
  | FeatureName  | Input Video by Youtube Link  |
  | Actors       | User                         |
  | Precondition | User is on `Video Indexing Page(/video)`         |

- Scenario

  - **GIVEN** the user is on Video Indexing - Entry Page.
  - **WHEN** the user types the link of the video to index and clicks `Extract My Idol Parts` button.
  - **THEN** the user is redirected to <em>`Search and Select Idol Page`</em>.

- Execptions
  - The link user inputs is not working.
  - The link user inputs is not from Youtube.
 
- Acceptance test
  - 'Extract My Idol Parts' button gets active when the user inputs a valid link.


#### 2.2 Search Idol

- Meta specs

  | Index        | Content                      |
  | ------------ | ---------------------------- |
  | FeatureName  | Search idol to extract parts of |
  | Actors       | User                         |
  | Precondition | User submitted the link of the video         |

- Scenario

  - **GIVEN** the user is on Video Indexing - Search Page
  - **WHEN** the user types the keyword of idol and clicks search button
  - **THEN** the search result with each idol's availabilty(of pre-trained model) appears
 
- Exceptions
  - The keyword has less than 2 letters.
 
- Acceptance test
  - When the user clicks search button, list of idols matching the keyword appears at the bottom of search bar.
  
#### 2.3 Request Support(ML training)

- Meta specs

  | Index        | Content                      |
  | ------------ | ---------------------------- |
  | FeatureName  | Request training on idols Vidol doesn't have pre-trained model of  |
  | Actors       | User                         |
  | Precondition | User searched idol and is seeing the search result         |

- Scenario

  - **GIVEN** the user searched idol and is seeing the search result
  - **WHEN** the user clicks 'Request Support' button next to one of the idol not supported
  - **THEN** the user gets toast message 'Successfully submitted'.

- Acceptance test
  - When the user clicks the 'Request Support' button, toast message appears and disappears a bit later.


#### 2.4 Select Idol

- Meta specs

  | Index        | Content                      |
  | ------------ | ---------------------------- |
  | FeatureName  | Select idol to extract parts of  |
  | Actors       | User                         |
  | Precondition | User searched idol and is seeing the search result         |

- Scenario

  - **GIVEN** the user searched idol and is seeing the search result
  - **WHEN** the user clicks one of the idol
  - **THEN** the user is redirected to the result page.

- Acceptance test
  - When the user clicks the idol, loader appears on the screen and when video processing is done, the user is redirected to the result page.
 
#### 2.5 Edit Video

- Meta specs

  | Index        | Content                      |
  | ------------ | ---------------------------- |
  | FeatureName  | Edit video with the indexing  |
  | Actors       | User                         |
  | Precondition | User is on `Video Indexing Result Page(/video/result)`         |

- Scenario

    - **GIVEN** the user is on Video Indexing - Result Page.
    - **WHEN** the user checks videos and picks the parts to keep by clicking scenes
    - **THEN** the selected scenes are marked with check mark and total length of the selected parts appears

- Acceptance test
  - The parts with selected idol is coloured.
  - When the user clicks a scene, it gets played immediately in the player on top.
  - When the user right-clicks the scene not selected, a check mark added on the scene.
  - When the user right-clicks the scene already selected, the scene gets back to the initial state(no check mark).
 
 
 #### 2.6 Save Video

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
