# swpp2021-team7

### Customer

---

Vidol is for all who loves K-Pop idol.

Specifically, Vidol can give best user experience for those 

* Tired of finding information about idols scattered around.
* Who wants to gather their favorite idols from one place. 
* Who manually made the idol cut video.
* Who spends a lot of time manually finding editing point.



### User Stories

---

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

### 







