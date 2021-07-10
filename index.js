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
        getComponent: () => { return document.getElementById(component); }
    };

    return loader;
}
