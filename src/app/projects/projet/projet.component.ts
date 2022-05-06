import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectItem } from 'src/app/_models/project-item.model';
import ProjectsJson from '../../../assets/projectsJson.json';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjetComponent implements OnInit, AfterViewInit {
  projectToShow!: string;
  projectDetails!: ProjectItem;
  indexOfActualProject!: number;

  imgOfPreviousProjectUrl!: string | null;
  imgOfNextProjectUrl!: string | null;
  pathOfPreviousProject!: string | null;
  pathOfNextProject!: string| null;

  strokeDashoffset!: number;

  @ViewChild("projectTitle") projectTitle!: ElementRef;
  @ViewChild("objectivesTitle") objectivesTitle!: ElementRef;
  @ViewChild("wrapper") wrapper!: ElementRef;
  @ViewChild("responsive") responsive!: ElementRef;
  @ViewChild("responsiveText") responsiveText!: ElementRef;

  @ViewChildren("sliderImage") sliderImage!: QueryList<ElementRef>;
  actualSlide: number = 0;

  @HostListener('window:scroll') onScroll(e: Event): void {
    this.closeButtonAnimation();
    if(this.document.body.getBoundingClientRect().width > 768) {
      this.translateOnScroll();
    }
  }

  constructor(private route: ActivatedRoute, private elem: ElementRef, private _renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    window.scrollTo(0,0);

    let routeParam = this.route.params.subscribe({
      next: param => {
        this.projectToShow = param['name'];
        this.indexOfActualProject = ProjectsJson.findIndex(p => p.path == this.projectToShow);
        this.projectDetails = ProjectsJson[this.indexOfActualProject];
        this.navProjectsFromIndex();
      },
      error: err => console.log(err)
    });
    this.closeButtonAnimation();

    this.actualSlide = 0;
  }

  ngAfterViewInit(): void {
    this.document.body.getBoundingClientRect().width > 768 ? (this.showResponsive(), this.translateOnScroll()) : this.showResponsiveSmall();
  }

  previousSlide(): void {
    if(this.actualSlide > 0) {
      let imgToRemove = this.sliderImage.get(this.actualSlide)?.nativeElement;
      this._renderer.removeClass(imgToRemove, 'show');
      this.actualSlide -= 1;
    }
  }
  nextSlide(): void {
    if(this.actualSlide < this.sliderImage.length -1) {
      this.actualSlide += 1;
      let imgShowed = this.sliderImage.get(this.actualSlide)?.nativeElement;
      this._renderer.addClass(imgShowed, 'show');
    }
  }


  closeButtonAnimation(): any {
    let scrollTop = this.document.documentElement.scrollTop;
    let docHeight = this.document.documentElement.getBoundingClientRect().height;
    let percentage = 1-((scrollTop) / (docHeight - window.innerHeight));
    this.strokeDashoffset = percentage;
  }

  translateOnScroll(): void {
    let responsiveTop = this.responsive.nativeElement.getBoundingClientRect().top;
    let projectTitleTop = this.projectTitle.nativeElement.getBoundingClientRect().top;
    let objectivesTitleTop = this.objectivesTitle.nativeElement.getBoundingClientRect().top;

    this._renderer.setStyle(this.responsiveText.nativeElement, 'transform', `translate3d(${0.5 * responsiveTop}px, ${0.35 * responsiveTop}px, 0px)`);
    this._renderer.setStyle(this.projectTitle.nativeElement, 'transform', `translate3d(0px, ${0.4 * projectTitleTop}px, 0px)`);
    this._renderer.setStyle(this.objectivesTitle.nativeElement, 'transform', `translate3d(${-1.5 * objectivesTitleTop}px, 0px, 0px)`);

  }

  scrollAuto(event: Event): void {
    // window.removeEventListener('scroll', this.scrollAuto);
    // let sectionDesc = document.getElementById('descProject');
    // let top = sectionDesc?.getBoundingClientRect().top;
    // if(top != undefined && top <= window.innerHeight / 2) {
    //   sectionDesc?.scrollIntoView({block: "start", behavior: 'smooth'})
    // }
  }

  showResponsive(): any {
    let sliderArray = this.elem.nativeElement.querySelectorAll('.dot');

    setInterval(() => {
      let leftOffset = this.wrapper.nativeElement.getBoundingClientRect().left;
      if(this.wrapper.nativeElement) {
        if(leftOffset > this.document.body.clientWidth*0.85 *(1/3)) {
          this._renderer.addClass(sliderArray[0], 'active');
          this._renderer.removeClass(sliderArray[1], 'active');
          this._renderer.removeClass(sliderArray[2], 'active');
        } else if(leftOffset < this.document.body.clientWidth*0.85 * (-1/3)) {
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

  showResponsiveSmall(): any {
    let sliderArray = this.elem.nativeElement.querySelectorAll('.dot');

    setInterval(() => {
      let leftOffset = this.wrapper.nativeElement.getBoundingClientRect().left;
      if(this.wrapper.nativeElement) {
        if(leftOffset > this.document.body.clientWidth * (-1/3)) {
          this._renderer.addClass(sliderArray[0], 'active');
          this._renderer.removeClass(sliderArray[1], 'active');
          this._renderer.removeClass(sliderArray[2], 'active');
        } else if(leftOffset < this.document.body.clientWidth * (-1)) {
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

  navProjectsFromIndex(): void {
    let previousProject = ProjectsJson[this.indexOfActualProject - 1];
    let nextProject = ProjectsJson[this.indexOfActualProject + 1];

    this.imgOfPreviousProjectUrl = previousProject ? previousProject.images.main : null;
    this.pathOfPreviousProject = previousProject ? previousProject.path : null;
    this.imgOfNextProjectUrl = nextProject ? nextProject.images.main : null;
    this.pathOfNextProject = nextProject ? nextProject.path : null;
  }

  loadProject(): void {
    this.ngOnInit();
    this.ngAfterViewInit();
  }

}
