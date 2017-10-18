

## Binance SDK - React-Native

**This library is wrapping the binance.com API. Made to be compatible with react-native**



## Installation and Usage

### usage

Install the library with 
```js
npm install binancesdk
```

### Configs and Example

pass the config object to the constructor.
this example is on react native.

```js
import Services from 'binancesdk';

var config = {
    endPointUrl: 'https://www.binance.com/api/',
    APIKey: '',
    secretKey: ''
};

let services = new Services(Configs);

//simple useage with react native app. the return value is a promise for all functions

    services.test().then((responseJson) => {

      if (responseJson) {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {
          // do something with new state
        });
      } else {
        this.setState({
          isLoading: true
        }, function () {
          // do something with new state
        });
      }

    })
      .catch((error) => {
        console.error(error);
      });

```



## License (MIT)


Copyright (c) 2017 Abdulhamid Alattar <forever.ag2001@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

