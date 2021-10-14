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

- **GIVEN** the User is on `Search Result Page('/search')`
- **WHEN** the User clicks `comment-like` button next to a comment
- **THEN** Likes on the comment increase by 1.

### Acceptance test
```
GIVEN the User is on `Search Result Page('/search')`
WHEN the User types content(content length > 0) in `comment-input` input and clicks `comment-create` button
THEN the User's comment is added to the page.

GIVEN the User is on `Search Result Page('/search')`
WHEN the User types empty content in `comment-input` input
THEN the User can't click `comment-create` button.

GIVEN the User is on `Search Result Page('/search')`
WHEN the User clicks `comment-like` button next to a comment
THEN Likes on the comment increase by 1.
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
WHEN the User types content(content length > 0) in `comment-input` input and clicks `comment-create` button
THEN the User's comment is added to the page.

GIVEN the User is on `Search Result Page('/search')`
WHEN the User types empty content in `comment-input` input
THEN the User can't click `comment-create` button.

GIVEN the User is on `Search Result Page('/search')`
WHEN the User clicks `comment-like` button next to a comment
THEN Likes on the comment increase by 1.
```
