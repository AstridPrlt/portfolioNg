import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectItem } from 'src/app/_models/project-item.model';
import ProjectsJson from '../../../assets/projectsJson.json';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit, AfterViewInit {
  projectToShow!: string;
  projectDetails!: ProjectItem;
  indexOfActualProject!: number;

  @ViewChild("wrapper") wrapper!: ElementRef;

  constructor(private route: ActivatedRoute, private elem: ElementRef, private _renderer: Renderer2) { }

  ngOnInit(): void {

    let routeParam = this.route.params.subscribe({
      next: param => {
        console.log(param['name']);
        this.projectToShow = param['name'];
        this.indexOfActualProject = ProjectsJson.findIndex(p => p.path == this.projectToShow);
        this.projectDetails = ProjectsJson[this.indexOfActualProject];
        console.log(this.projectDetails);
      },
      error: err => console.log(err)
    });
  }

  ngAfterViewInit(): void {
    this.showResponsive();
  }

  showResponsive(): any {
    let sliderArray = this.elem.nativeElement.querySelectorAll('.dot');

    setInterval(() => {
      let leftOffset = this.wrapper.nativeElement.getBoundingClientRect().left;
      if(this.wrapper.nativeElement) {
        if(leftOffset > document.body.clientWidth *(1/3)) {
          this._renderer.addClass(sliderArray[0], 'active');
          this._renderer.removeClass(sliderArray[1], 'active');
          this._renderer.removeClass(sliderArray[2], 'active');
        } else if(leftOffset < document.body.clientWidth * (-1/3)) {
          this._renderer.addClass(sliderArray[2], 'active');
          this._renderer.removeClass(sliderArray[1], 'active');
          this._renderer.removeClass(sliderArray[0], 'active');
        } else {
          this._renderer.addClass(sliderArray[1], 'active');
          this._renderer.removeClass(sliderArray[0], 'active');
          this._renderer.removeClass(sliderArray[2], 'active');
        }
      }
    }, 1000)
  }

}
