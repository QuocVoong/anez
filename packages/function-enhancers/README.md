A set of helpers to enhance functions.

## Usage

### `memoize`

```js
import {memoize} from '@anez/function-enhancers';

const addOne = (number) => {
  return number + 1;
};

const addOneMemoized = memoize(addOne);

addOneMemoized(1); // -> 2, addOne is executed
addOneMemoized(1); // -> 2, result is from cache
```

#### Memoizing a function with object as argument

When memoizing a function with object as first argument, make sure the object is immutable.

```js
import {memoize} from '@anez/function-enhancers';

const getValues = (someObject) => {
  return;
};

const getValuesMemoized = memoize(getValues);

const testObject1 = {one: 1, two: 2};
getValuesMemoized(testObject1); // -> [1, 2], getValues is executed
getValuesMemoized(testObject1); // -> [1, 2], result is from cache

testObject1.two = 3;
getValuesMemoized(testObject1); // -> [1, 2], result is from cache, BAD
```

#### Memoizing a function while providing a resolver

The resolver takes in the same arguments as the function it is enhancing.
Be sure that the resolver returns a unique identifer.

```js
import {memoize} from '@anez/function-enhancers';

const getByCommand = (command, value) => {
  // implementation for getByCommand
};

const getByCommandMemoized = memoize(
  getByCommand,
  (command, value) => `${command}${value}`,
);

const testObject1 = {id: 1, value: 2};
getByCommandMemoized(testObject1); // -> [1, 2], getValues is executed
getByCommandMemoized(testObject1); // -> [1, 2], result is from cache

testObject1.value = 3;
getByCommandMemoized(testObject1); // -> [1, 3], getValues is executed
```