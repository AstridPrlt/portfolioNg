import { Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProjectItem } from '../_models/project-item.model';
import ProjectsJson from '../../assets/projectsJson.json';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  list: ProjectItem[] = ProjectsJson;

  @ViewChild("listOfProjects") listOfProjects!: ElementRef;
  @ViewChild("growingPart") growingPart!: ElementRef;
  @ViewChild("fixePart") fixePart!: ElementRef;

  listPositionLeft!: number;
  listPositionRight!: number;
  navScroll: number = 200;

  widthProgressionBar!: number;
  listWidth!: number;
  barWidth!: number;

  @HostListener('mousemove', ['$event']) onMousemove(event: MouseEvent): void {
    console.log(event);

  }

  constructor(private _renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    console.log(this.list);

  }

  ngAfterViewInit(): void {
    this.listPositionLeft = this.listOfProjects.nativeElement.getBoundingClientRect().left;
    this.listPositionRight = this.listOfProjects.nativeElement.getBoundingClientRect().right;
    this.listWidth = this.listOfProjects.nativeElement.getBoundingClientRect().width;
    this.barWidth = this.fixePart.nativeElement.getBoundingClientRect().width;

    this.widthProgressionBar = 1 - ((this.listPositionRight - this.document.body.clientWidth)/ this.listWidth);
    this._renderer.setStyle(this.growingPart.nativeElement, 'width', `${this.widthProgressionBar*100}%`);
  }

  navNext(): void {
    this.listPositionRight = this.listOfProjects.nativeElement.getBoundingClientRect().right;
    if(this.listPositionRight > this.document.body.clientWidth*0.95) {
        let distanceToMove;
        if(this.listPositionRight - this.navScroll < this.document.body.clientWidth*0.95 ) {
          distanceToMove = this.listPositionLeft - (this.listPositionRight - this.document.body.clientWidth*0.95);
        } else {
          distanceToMove = this.listPositionLeft - this.navScroll;
        }

      if(distanceToMove < -(this.listWidth - this.listPositionRight)) {
      this._renderer.setStyle(this.listOfProjects.nativeElement, 'transform', `translateX(${distanceToMove}px)`);
      this.listPositionLeft -= this.navScroll;
      this.setProgressionBarTranslate();
      }

      console.log(distanceToMove, this.listOfProjects.nativeElement.getBoundingClientRect());
  }
}
  navBack(): void {
    this.listPositionRight = this.listOfProjects.nativeElement.getBoundingClientRect().right;
    this.listPositionLeft = this.listOfProjects.nativeElement.getBoundingClientRect().left;
    if(this.listPositionLeft < 0) {
      let distanceToMove;
      if(this.listPositionLeft > -(this.navScroll)) {
        distanceToMove = 0;
      } else {
        distanceToMove = this.listPositionLeft + this.navScroll;
      }
      this._renderer.setStyle(this.listOfProjects.nativeElement, 'transform', `translateX(${distanceToMove}px)`);
      this.setProgressionBarTranslate();

      console.log(this.listOfProjects.nativeElement.getBoundingClientRect());
    }
  }

  setProgressionBarTranslate(): void {
    console.log(this.widthProgressionBar);
    let widthProgressionBarCalculation = 1 - ((this.listPositionRight - this.navScroll - this.document.body.clientWidth)/this.listOfProjects.nativeElement.getBoundingClientRect().width);
    this.widthProgressionBar = widthProgressionBarCalculation > 1 ? 1 : widthProgressionBarCalculation;
    this._renderer.setStyle(this.growingPart.nativeElement, 'width', `${this.widthProgressionBar*100}%`);

    console.log(this.widthProgressionBar);

  }

}
