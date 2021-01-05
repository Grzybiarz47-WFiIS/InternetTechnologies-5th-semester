onmessage = function(e) {
    e.data[0] = 20;
    e.data[1] = 0;
    postMessage(e.data);
}