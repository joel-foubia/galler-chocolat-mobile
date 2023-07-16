import { Component, Input } from '@angular/core';

@Component({
    selector: 'maps-layout-2',
    templateUrl: 'maps.html'
})

export class MapsLayout2 {
    defaultLogo: string;
    defaultImg: string;
    @Input() data: any;
    @Input() events: any;
    
	public isAbout = false;
	
    constructor() {
        this.defaultImg = "assets/images/team.jpg";
        this.defaultLogo = "assets/images/icon.png";
		if(typeof this.data!=="undefined"){
            
            console.log(this.data);
			this.isAbout = true;
		}
	}

    onEvent(event: string, current) {
        if (this.events[event]) {
            this.events[event]({
				'parameter' : current
			});
        }
        console.log(event);
    }
}