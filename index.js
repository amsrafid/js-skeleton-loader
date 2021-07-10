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

    let shape = {
        round (frag, options){
            let style = {
                borderRadius: '50%',
                width: Style.child.height,
                height: Style.child.height
            }
            
            parentStyle = {
                height: style.height,
                width: style.width,
                padding: "0 5px"
            }

            options.parentStyle = {...parentStyle, ...(options.parentStyle !== undefined ? options.parentStyle : {})}
            options.style = {...style, ...(options.style !== undefined ? options.style : {})};

            this.line(frag, options);
        },
        line (frag, options){
            let elem = document.createElement('div');
            let number = options.numbers || 1;
            let lineRoot = new DocumentFragment();
            let identicalHeight = parseInt(parseInt(Style.child.height) / (number + 2)) + "px";
            let style = {
                height: identicalHeight
            };
            let parentStyle = {
                width: '100%',
                display: "grid",
                alignItems: 'center',
                padding: "0 5px"
            };
            
            if (options.parentStyle !== undefined) {
                parentStyle = {...parentStyle, ...options.parentStyle};
            }
            
            elem.setAttribute('class', 'text');
            Style.setStyles(elem, parentStyle);

            if (options.style !== undefined && ! Array.isArray(options.style)) {
                options.style = [options.style];
            }

            for (let i = 0; i < number; i++) {
                if (options.style[i] !== undefined) {
                    style = {...style, ...options.style[i]};
                }
                
                this.drawLine(elem, style);
            }
            
            frag.appendChild(elem);
        },
        drawLine(frag, style) {
            let elem = document.createElement('div');
            elem.setAttribute('class', 'text-line');
            Style.setStyles(elem, style);

            frag.appendChild(elem);
        }
    };

    let loader = {
        color: "#DFDFDF",
        options: {},
        domDesign: [],
        rootComponent: null,
        renderWidget: {},
        component: component,
        getComponent: () => { return document.getElementById(component); },
        appendStyleSheet() {
            let head = document.getElementsByTagName('head');
            let styleTag = document.createElement('style');
            let css = `
                @-webkit-keyframes jsSkeletonLoader {
                    0% {
                        background-position: -500px 0;
                    }
                    100% {
                        background-position: 500px 0;
                    }
                }
                
                @keyframes jsSkeletonLoader {
                    0% {
                        background-position: -500px 0;
                    }
                    100% {
                        background-position: 500px 0;
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
                    background: linear-gradient(to right, ${this.color} 8%, #F0F0F0 18%, ${this.color} 33%);
                    background-size: 800px 104px;
                    height: ${Style.parent.height};
                    position: relative;
                }
            `;

            styleTag.type = 'text/css';

            if (styleTag.styleSheet) {
                styleTag.styleSheet.cssText = css;
            } else {
                styleTag.appendChild(document.createTextNode(css));
            } 
            
            head[0].appendChild(styleTag);
        },
        rescueName: (name) => {
            let match = name.match(/[\*]\d*$/);
            let domDesign = {
                shape: name,
                options: {}
            };

            if (! match) {
                return domDesign;
            }

            domDesign.shape = match.input.replace(match[0], '');
            domDesign.options.numbers = parseInt(match[0].replace(/[\*]/, ''));

            return domDesign;
        },
        renderSubsection() {
            let fragment = new DocumentFragment();

            if (this.options.style) {
                Style.child = {...Style.child, ...this.options.style};
            }
            
            for (i in this.renderWidget) {
                this.domDesign[i] = this.rescueName(this.renderWidget[i][0]);

                if (this.renderWidget[i][1] !== undefined) {
                    this.domDesign[i].options = {...this.domDesign[i].options, ...this.renderWidget[i][1]};
                }

                shape[this.domDesign[i].shape](fragment, this.domDesign[i].options);
            }
            
            return fragment;
        },
        render(renderWidget, options = {}) {
            this.options = options;
            this.renderWidget = renderWidget;
            this.numbers = this.options.numbers || 1;
            let fragment = new DocumentFragment();
            
            if (this.options.color !== undefined) {
                this.color = this.options.color;
            }
            
            if (this.options.parentStyle) {
                Style.parent = {...Style.parent, ...this.options.parentStyle};
            }
            
            this.appendStyleSheet();
            
            let root = document.createElement('div');

            Style.setStyles(root, {
                position: 'relative',
                display: 'flex',
                height: Style.parent.height,
                width: Style.parent.width,
            });

            for (let i = 0; i < this.numbers; i++) {
                fragment = this.renderSubsection();
                root.appendChild(fragment);
            }

            if (! this.getComponent()) {
                this.rootComponent = root;

                return this;
            }
            
            return this.getComponent().append(root);
        },
        toDOM() {
            return this.rootComponent;
        },
        toString() {
            if (! this.rootComponent) {
                return "";
            }

            return new XMLSerializer().serializeToString(this.rootComponent);
        },
        toAppend(selector) {
            let component = document.querySelector(selector);

            if (component) {
                component.append(this.rootComponent);
            }
            
            return this;
        }
    };

    return loader;
}
