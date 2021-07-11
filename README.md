## JS Skeleton loader

Simple but very powerful loader package built with full javascript.

## Installation

To install this package, include **_index.js_** file into your site **_head_** or _end of the_ **_body_** section as a script.

~~~html
<head>
    <!-- <script src="index.js"></script> -->
</head>
<body>
    <!-- Component in which loader will be initiated -->
    <div id="loader"></div>

    <!-- OR -->
    <!-- <script src="index.js"></script> -->
</body>
~~~

## Basic Use

JS Skeleton loaders is very easy to use. It works with initializing of **_Loader_** class and _render_ with given _widget_ of view. A demo of input widget is given bellow,

~~~javascript
new Loader('loader').render([
    ['round'],
    ['line*3', {
        style: [{
            borderRadius: "5px"
        }, {
            borderRadius: "5px",
            width: '60%'
        }]
    }]
], {
    numbers: 3,
    parentStyle: {
        height: "50px",
        width: "80%"
    },
    style: {
        width: "100%"
    }
});
~~~

It should looks like,\
<img src="./blobs/looks.png" width="80%" />

## Authors

_Initial development_ - **_A. M. Sadman Rafid_**

## Security Vulnerabilities

If you discover a security vulnerability within JS Skeleton Loader, please send an e-mail to _A. M. Sadman Rafid_ via [amsrafid@gmail.com](mailto:amsrafid@gmail.com). All security vulnerabilities will be promptly addressed.

## License

The JS Skeleton Loader is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).