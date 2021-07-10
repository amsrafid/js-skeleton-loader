function Loader(component = null) {
    'use-strict'

    let Style = {
        parent: {
            height: "50px",
            width: "100%",
        },
        child: {
            height: '50px',
            width: '100%'
        },
        setStyles(elem, styles) {
            Object.keys(styles).forEach(e => {
                elem.style[e] = styles[e];
            });
        }
    }

    let loader = {
        color: "#DFDFDF",
        options: {},
        domDesign: [],
        renderWidget: {},
        component: component,
        getComponent: () => { return document.getElementById(component); },
        appendStyleSheet() {
            let head = document.getElementsByTagName('head');
            let styleTag = document.createElement('style');
            let css = `
                @-webkit-keyframes jsSkeletonLoader {
                    0% {
                        background-position: -468px 0;
                    }
                    100% {
                        background-position: 468px 0;
                    }
                }
                
                @keyframes jsSkeletonLoader {
                    0% {
                        background-position: -468px 0;
                    }
                    100% {
                        background-position: 468px 0;
                    }
                }
                .animated-background, .text-line, .image {
                    -webkit-animation-duration: 1.25s;
                                    animation-duration: 1.25s;
                    -webkit-animation-fill-mode: forwards;
                                    animation-fill-mode: forwards;
                    -webkit-animation-iteration-count: infinite;
                                    animation-iteration-count: infinite;
                    -webkit-animation-name: jsSkeletonLoader;
                                    animation-name: jsSkeletonLoader;
                    -webkit-animation-timing-function: linear;
                                    animation-timing-function: linear;
                    background: ${this.color};
                    background: linear-gradient(to right, ${this.color} 8%, ${this.color} 18%, ${this.color} 33%);
                    background-size: 800px 104px;
                    height: ${Style.parent.height};
                    position: relative;
                }
            `;

            if (styleTag.styleSheet) {
                styleTag.styleSheet.cssText = css;
            } else {
                styleTag.appendChild(document.createTextNode(css));
            } 
            
            head[0].appendChild(styleTag);
        }
    };

    return loader;
}
