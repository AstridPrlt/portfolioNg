import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProjectItem } from '../_models/project-item.model';
import ProjectsJson from '../../assets/projectsJson.json';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  list: ProjectItem[] = ProjectsJson;

  @ViewChild("listOfProjects") listOfProjects!: ElementRef;
  listPositionLeft!: number;
  listPositionRight!: number;
  navScroll: number = 200;

  constructor(private _renderer: Renderer2) { }

  ngOnInit(): void {
    console.log(this.list);

  }

  ngAfterViewInit(): void {
    this.listPositionLeft = this.listOfProjects.nativeElement.getBoundingClientRect().left;
    this.listPositionRight = this.listOfProjects.nativeElement.getBoundingClientRect().right;
    console.log(this.listPositionLeft);
    console.log(document.body.clientWidth);

  }

  navNext(): void {
    this.listPositionRight = this.listOfProjects.nativeElement.getBoundingClientRect().right;
    if(this.listPositionRight > document.body.clientWidth) {
      this._renderer.setStyle(this.listOfProjects.nativeElement, 'transform', `translateX(${this.listPositionLeft - this.navScroll}px)`);
      this.listPositionLeft -= this.navScroll;
    }
  }
  navBack(): void {
    if(this.listPositionLeft <= 0) {
      this._renderer.setStyle(this.listOfProjects.nativeElement, 'transform', `translateX(${this.listPositionLeft + this.navScroll}px)`);
      this.listPositionLeft += this.navScroll;
    }
  }

}
