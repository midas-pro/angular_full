import { Component } from '@angular/core';
import { fadeInAnimation } from 'src/app/animations';

@Component({
    templateUrl: './home.component.html',
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': '' }
})
export class HomeComponent {
    constructor() {
       // this.blockingScript(2000);
        this.runInWorker();
    }

    private blockingScript(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    private runInWorker() {
        if (typeof Worker !== 'undefined') {
            console.time('web worker duration');
            const worker = new Worker('./home.worker', { type: 'module' });
            worker.onmessage = ({ data }) => {
                console.log(data);
                console.timeEnd('web worker duration');
            };
            worker.postMessage(2000);
          } else {
            // Web Workers are not supported in this environment (IE 6-9 ?).
            // Check support: https://caniuse.com/?search=web%20worker
            // You should add a fallback so that your program still executes correctly.
          }
    }
}