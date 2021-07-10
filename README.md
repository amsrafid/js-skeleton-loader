## JS Skeleton loader

Simple but very powerful loader package built with full javascript.

## Installation

To install this package, include **_index.js_** file into your site _<head>_ or end of the _<body>_ section as a script.

~~~html
<head>
    <!-- <script src="index.js"></script> -->
</head>
<body>
    ...
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
