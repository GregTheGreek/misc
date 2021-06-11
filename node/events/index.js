const { EventEmitter } = require('events');

class Listener {
  constructor(e) {
    this.emitter = e;
    this.handle = this.handle.bind(this);
  }

  start = () => {
    this.emitter.on("data", this.handle);
  }

  handle = (data) => {
    console.log("Received data... ", {data});
  }
}

class Emitter extends EventEmitter {
  start = async () => {
    const r = await this.send();
    this.emit("data", r);
  }

  send = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({code: 200, data: "blah"}), 5000)
    })
  }
}

(async () => {
  const e = new Emitter();
  const l = new Listener(e);
  l.start();
  e.start();
})()
