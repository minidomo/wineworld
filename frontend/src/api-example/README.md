# API Example

An [Axios](https://axios-http.com/docs/intro)-like object to simulate using axios with an API. This is a temporary directory and was made to help familiarize frontend developers with working with axios in regards to sending and receiving data while the backend is in development and an unusable state.

If you're unsure about my type definitions, feel free to take a look at `index.d.ts` or any other files in this directory. The definitions may not entirely accurately represent what is on our API documentation as I realized some things could be better as I was creating this. Feel free to ask me for help or anyone else.

## Usage

```jsx
import * as siteapi from './api-example/siteapi'; // make sure the relative path is correct

siteapi
    .get('https://api.wineworld.me/wines')
    .then(response => {
        console.log(response.status, response.statusText);
        console.log(response.data);
    })
    .catch(errRes => {
        console.error(errRes);
    });

// or in an asynchronous function
async function func() {
    try {
        const response = await siteapi.get('https://api.wineworld.me/wines');
        console.log(response.status, response.statusText);
        console.log(response.data);
    } catch (errRes) {
        console.error(errRes);
    }
}
```

## More examples

### Getting all results

```jsx
siteapi
    .get('https://api.wineworld.me/regions')
    .then(response => {
        console.log(response.data);
    });
```

### Filtering results

Not all endpoints, `/wines`, `/vineyards`, and `/regions`, have the same filters, so refer to the file `index.d.ts` or VS Code's intellisense.

```jsx
siteapi
    .get('https://api.wineworld.me/regions', {
        params: {
            startReviews: 200, // must have at least 200 reviews
            tripTypes: ['Business', 'Friends'], // must have both 'Business' and 'Friends' (order does not matter)
            name: 'a', // name must contain the string 'a'
        },
    })
    .then(response => {
        console.log(response.data);
    });
```

### Sorting results 1

```jsx
siteapi
    .get('https://api.wineworld.me/regions', {
        params: {
            nameSort: true, // sorts using the name in alphabetical order
        },
    })
    .then(response => {
        console.log(response.data);
    });
```

### Sorting results 2

```jsx
siteapi
    .get('https://api.wineworld.me/regions', {
        params: {
            nameSort: false, // sorts using the name in reverse alphabetical order
        },
    })
    .then(response => {
        console.log(response.data);
    });
```

### Filtering and sorting results

```jsx
siteapi
    .get('https://api.wineworld.me/regions', {
        params: {
            startReviews: 200, // must have at least 200 reviews
            nameSort: true, // sorts using the name in alphabetical order
        },
    })
    .then(response => {
        console.log(response.data);
    });
```

### Getting a single item

```jsx
siteapi
    .get('https://api.wineworld.me/wine/2')
    .then(response => {
        console.log(response.data);
    });
```

## Handling errors

It's possible that an API call results in an error, so they should be handled appropriately, and in regards to frontend, we should display appropriate/expected things to the user when an error arises. For example, a 404 Not Found error could display a "Page not found" page. Everything else could display a page saying an error occurred. The behavior is up to you but should be handled consistently across for all API calls. 

## Error-inducing API call examples

### 404 Not Found 1

The structure of `errRes` is defined in `index.d.ts`.

```jsx
siteapi
    .get('https://api.wineworld.me/something') // the /something endpoint does not exist
    .then(response => { // never reaches this function
        console.log(response.data);
    })
    .catch(errRes => { // enters here
        console.error(errRes);
    });
```

### 404 Not Found 2

```jsx
siteapi
    .get('https://api.wineworld.me/vineyard/7') // there is no vineyard with id=7
    .then(response => { // never reaches this function
        console.log(response.data);
    })
    .catch(errRes => { // enters here
        console.error(errRes);
    });
```

### General error

```jsx
siteapi
    .get('https://api.wineworld.me/wines') // hypothetically could fail any time (maybe the backend server is down, or an error occurs on the backend, etc.)
    .then(response => { // never reaches this function
        console.log(response.data);
    })
    .catch(errRes => { // enters here
        console.error(errRes);
    });
```

### Forced error

I included this to make it easier to get an error that is not 404 as the frontend may handle those two errors differently. This is **not** something in axios and was merely implemented for testing purposes.

```jsx
siteapi
    .get('https://api.wineworld.me/wines', {
        failOnPurpose: true, // will guarantee a 500 Internal Server Error
    })
    .then(response => { // never reaches this function
        console.log(response.data);
    })
    .catch(errRes => { // enters here
        console.error(errRes);
    });
```

## React usage examples

Use this in combination with React functions `useState` and `useEffect` to update values display on a page. Both of following examples are rough ideas/suggestions.

> I'm not very familiar with React, so I'm not sure what the best practice is in regards to using this. However, other groups have done this approach from what I've seen.

### Instance pages

```jsx
import React, { useState, useEffect } from 'react';
import * as siteapi from './api-example/siteapi';

const Wine = (id) => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        siteapi
            .get(`https://api.wineworld.me/wine/${id}`)
            .then(response => {
                setName(response.data['name']);
                setRating(response.data['rating']);
            })
            .catch(errRes => {
                console.error(errRes);
            });
    });

    return (
        <div>
            name: {name}, rating: {rating}
        </div>
    );
};
```

### Model pages

```jsx
import React, { useState, useEffect } from 'react';
import * as siteapi from './api-example/siteapi';

const Wines = () => {
    // maybe create an array state of Cards

    useEffect(() => {
        siteapi
            .get(`https://api.wineworld.me/wines`)
            .then(response => {
                const { list } = response.data;
                // set the state of cards with list somehow
            })
            .catch(errRes => {
                console.error(errRes);
            });
    });

    return (
        // display all the Cards
    );
};
```