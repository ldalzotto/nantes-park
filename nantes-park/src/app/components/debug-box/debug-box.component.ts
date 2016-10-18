import {Component} from "@angular/core/src/metadata/directives";
import {element} from "protractor";
import {OnInit} from "@angular/core";
import {ParkService} from "../../services/park.service";
/**
 * Created by ldalzotto on 18/10/2016.
 */

@Component({
  selector: 'debug-box',
  templateUrl: './debug-box.component.html',
  styleUrls: ['./debug-box.component.css'],
  providers: [ParkService]
})
export class DebugBoxComponent {


  constructor(private parkService: ParkService) {
  }

  private isClicked: boolean = false;
  private isMockedWSEnabled = false;


  private initialElementX: number = 0;
  private initialElementY: number = 0;

  private initialMouseX: number;
  private initialMouseY: number;

  private offsetX: number;
  private offsetY: number;

  private afterMouseX: number;
  private afterMouseY: number;

  public clickingDebugBox(event: MouseEvent){
      this.isClicked = true;
    this.initialMouseX = event.clientX;
    this.initialMouseY = event.clientY;
  }

  public mouseMoving(event: MouseEvent) {
    if(this.isClicked) {
      this.afterMouseX = event.clientX;
      this.afterMouseY = event.clientY;

      this.offsetX = this.afterMouseX - this.initialMouseX;
      this.offsetY = this.afterMouseY - this.initialMouseY;
      var d = document.getElementById("debugBox");
      d.style.left = (this.offsetX + this.initialElementX)+'px';
      d.style.top = (this.offsetY + this.initialElementY)+'px';

    }
  }

  public existingDebugBox(event: MouseEvent) {
    this.isClicked = false;
    this.initialElementX = this.initialElementX + this.offsetX;
    this.initialElementY = this.initialElementY + this.offsetY;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  public changeMockedWSStatus(){
    this.isMockedWSEnabled = !this.isMockedWSEnabled;
    this.parkService.updateGenericOpenDataMockedStatus(this.isMockedWSEnabled)
    if(this.isMockedWSEnabled) {
      console.log("Mocking external call enabled");
    } else {
      console.log("Mocking external call disabled");
    }
  }

}
