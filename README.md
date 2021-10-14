# swpp2021-team7

## Main Page
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

## Search Result Page
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
