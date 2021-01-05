onmessage = function(e) {
    e.data[0] = 30;
    e.data[1] = 40;
    postMessage(e.data);
}