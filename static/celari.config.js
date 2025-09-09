self.__celari__$config = {
    prefix: "/celari/prefix/",
    clientUrl: "/celari.client.js",
    configUrl: "/celari.config.js",
    // yall mfs can implement your own encoding
    encodeUrl: ((x) => {return encodeURIComponent(x)}),
    decodeUrl: ((x) => {return decodeURIComponent(x)})
}