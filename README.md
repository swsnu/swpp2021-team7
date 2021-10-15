
# swpp2021-team7


### Customer

---

Vidol is for all who loves K-Pop idol.

Specifically, Vidol can give best user experience for those 

* Tired of finding information about idols scattered around.
* Who wants to gather their favorite idols from one place. 
* Who manually made the idol cut video.
* Who spends a lot of time manually finding editing point.


## Competitive Landscape

  According to the rapid growth of the K-pop idol market, many idol businesses and services are launched for fans of idols such as, IDOLPICK, IDOL Live and Choi-Ae-dol in south Korea. Their service provides some information of specific idols and some participatory features such as, quiz or scheduler.
 </br>
![Competitive Landscape](vidol_landscape.png)
  In our service, VIDOL, we could be a game changer of K-pop idol market through special features and distinctive ideas.
 </br>
  First, VIDOL offers higher user engagement than the others. Users can leave comments on all content in VIDOL. It means that users can express their opinions free and participate on complementary discussion. Function of extracting video clips from the original also improve user engagement. Users who want to get own video clips which their favorite idols come out. It could be the most famous and innovative idea in this market.
 </br>
 Second, we manage abroad range of idol data scope by crawling from many platforms provided information of K-pop idol. Many existing services offered only few datasets of idol or stored data by manually typed. But VIDOL offers a large dataset by crawling from search engines or social media such as, Naver, Instagram and Youtube. Users who want to get information of their favorite idol can get information easily without excessive effort by searching.

### User Stories

---
## Search keyword
### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can type a search keyword             |
| Actors                                   |User|
| Precondition                         |User is on `Main Page('/')`|

### Scenario
- **GIVEN** the User is on `Main Page('/')`
- **WHEN** the User clicks `search-input` input and types search keyword and clicks `search-button` button
- **THEN** a list of idols related to the search keyword is displayed on the `Main page('/')`.

### Acceptance test
```
GIVEN the User is on `Main Page('/')` and there is 1 searh result for "IU" keyword
WHEN the User clicks `search-input` input and types "IU" and clicks `search-button` button
THEN a list of idols' length must be 1.
```

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can click each idol that comes up as a result of a search and be redirected to `Search Result Page(/search)`           |
| Actors                                   |User|
| Precondition                         |User is on `Main Page('/')`, User types a search keyword and clicks `search-button` button and get results(results' length > 0)|

### Scenario
- **GIVEN** the User is on `Main Page('/')` and get search results
- **WHEN** the User clicks one of the idols in the search results
- **THEN** the User shuold be redirected to `Search Result Page('/search')` containing idol information.

### Acceptance test
```
GIVEN the User is on `Main Page('/')` and there are one more search results
WHEN the User clicks "IU" in the search results
THEN the User shuold be redirected to `Search Result Page('/search')` containing "IU" information.
```
### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can click each idol in `Hottest idol tab` and be redirected to `Search Result Page(/search)`          |
| Actors                                   |User|
| Precondition                         |User is on `Main Page('/')`|

### Scenario
- **GIVEN** the User is on `Main Page('/')`
- **WHEN** the User clicks one of the idols in `Hottest idol tab`
- **THEN** the User shuold be redirected to `Search Result Page('/search')` containing idol information.

### Acceptance test
```
GIVEN the User is on `Main Page('/')` and there is "IU" in `Hottest idol tab`
WHEN the User clicks "IU" in `Hottest idol tab`
THEN the User shuold be redirected to `Search Result Page('/search')` containing "IU" information.
```

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can click `go-video-indexing-button` and be redirected to `Video Indexing Page('/vidoe/indexing')`               |
| Actors                                   |User|
| Precondition                         |User is on `Search Result Page('/search')`|

### Scenario
- **GIVEN** the User is on `Search Result Page('/search')`
- **WHEN** the User clicks `go-video-indexing-button` button
- **THEN** the User shuold be redirected to `Video Indexing Page('/vidoe/indexing')`.
- 
### Acceptance test
```
GIVEN the User is on `Search Result Page('/search')`
WHEN the User clicks `go-video-indexing-button` button
THEN the User shuold be redirected to `Video Indexing Page('/vidoe/indexing')`.
```

## See idol ranking
### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can go to `Rank page('/rank')`          |
| Actors                                   |User|
| Precondition                         |User is on `Main Page('/')`|

### Scenario
- **GIVEN** the User is on `Main Page('/')`
- **WHEN** the User clicks `Hottest idol tab`
- **THEN** the User shuold be redirected to `Ranking Page('/rank')`.

### Acceptance test
```
GIVEN the User is on `Main Page('/')`
WHEN the User clicks `Hottest idol tab`
THEN the User shuold be redirected to to `Ranking Page('/rank')`.
```

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can see idol rankings          |
| Actors                                   |User|
| Precondition                         |User is on `Ranking Page('/rank')`|

### Scenario
- **GIVEN** the User is on `Ranking Page('/rank')`
- **WHEN** the User on the n'th page
- **THEN** the User can see the 10*n-9 ~ 10*n'th idols.

### Acceptance test
```
GIVEN the User is on `Ranking Page('/rank')`
WHEN the User clicks the 9'th page
THEN the User shuold see the 81 ~ 90'th idols.
```

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can click each idol in `Ranking Page('/rank')` and be redirected to `Search Result Page(/search)`          |
| Actors                                   |User|
| Precondition                         |User is on `Ranking Page('/rank')`|

### Scenario
- **GIVEN** the User is on `Ranking Page('/rank')`
- **WHEN** the User clicks one of the idols
- **THEN** the User shuold be redirected to `Search Result Page('/search')` containing idol information.

### Acceptance test
```
GIVEN the User is on `Ranking Page('/rank')` and there is "IU" in ranking
WHEN the User clicks "IU"
THEN the User shuold be redirected to `Search Result Page('/search')` containing "IU" information.
```

## Create & like comment
### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can type a comment or like comment                  |
| Actors                                   |User|
| Precondition                         |User logged in , User is on `Search Result Page('/search')`|

### Scenario
- **GIVEN** the User is on `Search Result Page('/search')`
- **WHEN** the User types content in `comment-input` input and clicks `comment-create` button
- **THEN** the User's comment is added to the page.

- **GIVEN** the User is on `Search Result Page('/search')`
- **WHEN** the User clicks `comment-like` button next to a comment
- **THEN** Likes on the comment increase by 1.

### Acceptance test
```
GIVEN the User is on `Search Result Page('/search')`
WHEN the User types "Hello" in `comment-input` input and clicks `comment-create` button
THEN the User's comment "Hello" is added to the page.

GIVEN the User is on `Search Result Page('/search')`
WHEN the User types empty content in `comment-input` input
THEN the User can't click `comment-create` button.

GIVEN the User is on `Search Result Page('/search')` and the User hasn't liked first comment before
WHEN the User clicks `comment-like` button next to first comment
THEN Likes on the first comment increase by 1.
```

## Edit & delete comment
### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can edit a comment                 |
| Actors                                   |User|
| Precondition                         |User logged in , User is on `Search Result Page('/search')`, User is author of comment|

### Scenario
- **GIVEN** the User is on `Search Result Page('/search')` and  the User is author of the comment
- **WHEN** the User clicks `comment-edit` button next to the comment
- **THEN** the comment becomes editable.
- **GIVEN** the User is author of the comment and the comment is editable
- **WHEN** the User types other content and clicks `comment-edit` button
- **THEN** the comment is edited.

### Acceptance test
```
GIVEN the User is on `Search Result Page('/search')` and  User is author of comment1
WHEN the User clicks `comment-edit` button next to the comment1
THEN the comment1 becomes editable.

GIVEN the User is author of the comment1 and the comment1 is editable
WHEN the User types "this is edited comment" and clicks `comment-edit` button
THEN the content of comment1 is "this is edited comment".
```

### Meta specs
|        Index                             |                                                                        Content                                                                       |
|---------------------------------|:---------------------------------------------------------------------------------------------------------------|
| FeatureName                        |User can delete a comment                 |
| Actors                                   |User|
| Precondition                         |User logged in , User is on `Search Result Page('/search')`, User is author of comment|

### Scenario
- **GIVEN** the User is on `Search Result Page('/search')` and  the User is author of the comment
- **WHEN** the User clicks `comment-delete` button next to the comment
- **THEN** `delete-comment-confirm` pops up.
- **GIVEN** the `delete-comment-confirm` poped up on `Search Result Page('/search')`
- **WHEN** the User clicks `confirm` button
- **THEN** the comment is deleted.

### Acceptance test
```
GIVEN the User is on `Search Result Page('/search')` and  User is author of comment1
WHEN the User clicks `comment-delete` button next to the comment1
THEN confirm[Are you sure delete this comment?] pops up.

GIVEN the `delete-comment-confirm` poped up on `Search Result Page('/search')`
WHEN the User clicks `confirm` button
THEN the comment1 is deleted.
```

## Case 8. List of my idols

### Meta specs

| Index        | Content                      |
| ------------ | ---------------------------- |
| FeatureName  | List of user's favorite idol |
| Actors       | User                         |
| Precondition | User is on `My Page`         |

### Scenario

- **GIVEN** the user is on the <em>```MyPage```</em> 

- **WHEN** the user scroll down to see <em>```List of my idols```</em> 

- **THEN** appear idol list who clicked like on the <em> `Search Result Page (Case 5)`</em>

  

- **GIVEN** the user is on the <em>```List of my idols```</em> 

- **WHEN** the user click idol name

- **THEN** user is redirected to <em> `Search Result Page (Case 5)`</em> and see specific information of idol.

  

- **GIVEN** the user is on the <em>```List of my idols```</em> 

- **WHEN** the user click 'edit' or 'cancel like' button

- **THEN** user is redirected to <em> `MyPage`</em> and profile is updated.

### Acceptance test

```
GIVEN the user is on the `MyPage`

WHEN the user scroll down to see `List of my idols` 

THEN appear idol list who clicked like on the `Search Result Page (Case 5)`

  

GIVEN the user is on the `List of my idols`

WHEN the user click idol name

THEN user is redirected to `Search Result Page (Case 5)` and see specific information of idol.

  

GIVEN the user is on the `List of my idols` 

WHEN the user click 'edit' or 'cancel like' button

THEN user is redirected to `MyPage` and profile is updated.
```



## Case 9. Scraped articles

### Meta specs

| Index        | Content                         |
| ------------ | ------------------------------- |
| FeatureName  | List of user's scraped articles |
| Actors       | User                            |
| Precondition | User is on `My Page`            |

### Scenario

- **GIVEN** the user is on the <em>```MyPage```</em> 
- **WHEN** the user scroll down to see <em>```Scraped articles```</em> 
- **THEN** appear article list which scraped from the <em> `Search Result Page (Case 5)`</em> 

- **GIVEN** the user is on the <em>```Scraped articles```</em> 
- **WHEN** the user click article name
- **THEN** user is redirected to article page in <em> `Search Result Page (Case 5)`</em> and see article of idol.

- **GIVEN** the user is on the <em>```Scraped Articles```</em> 
- **WHEN** the user click 'delete' button
- **THEN** user can delete scraped article and redirected to <em> `MyPage`</em> and profile is updated.

### Acceptance test

```
GIVEN the user is on the `MyPage`
WHEN the user scroll down to see `Scraped articles`
THEN appear article list which scraped from the `Search Result Page (Case 5)`

GIVEN the user is on the `Scraped articles` 
WHEN the user click article name
THEN user is redirected to article page in `Search Result Page (Case 5)` and see article of idol.

GIVEN the user is on the `Scraped Articles` 
WHEN the user click 'delete' button
THEN user can delete scraped article and redirected to `MyPage` and profile is updated.
```

## Case 10. My Comments 

### Meta specs

| Index        | Content                 |
| ------------ | ----------------------- |
| FeatureName  | List of user's comments |
| Actors       | User                    |
| Precondition | User is on `My Page`    |

### Scenario

- **GIVEN** the user is on the <em>```MyPage```</em>  
- **WHEN** the user scroll down to see <em>```My Comments ```</em> 
- **THEN** appear list of comments which is in the<em> `Search Result Page (Case 5)`</em>

- **GIVEN** the user is on the <em>```My Comments```</em> 
- **WHEN** the user click comment content
- **THEN** user is redirected to<em> `Search Result Page (Case 5)`</em> of idol and can delete or edit their comment.

### Acceptance test

```
GIVEN the user is on the `MyPage`  
WHEN the user scroll down to see `My Comments` 
THEN appear list of comments which is in the`Search Result Page (Case 5)`

GIVEN the user is on the `My Comments` 
WHEN the user click comment content
THEN user is redirected to `Search Result Page (Case 5)` of idol and can delete or edit their comment.
```
