import { Component, ElementRef, HostListener, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // @ViewChild("avatar") avatar!: ElementRef;
  // @ViewChild("description") description!: ElementRef;

  constructor(private _renderer: Renderer2) { }

  ngOnInit(): void {
  }

  // ngAfterViewInit(): void {
  //   let imageXInitial = this.avatar.nativeElement.getBoundingClientRect().left;
  //   let imageYInitial = this.avatar.nativeElement.getBoundingClientRect().top;
  //   this.followCursorWithTranslate(imageXInitial, imageYInitial)
  // }

  // followCursorWithTranslate(left: number, top: number) {

  //   this._renderer.listen(this.description.nativeElement, 'mousemove', e => {
  //     let descriptionPosition = this.description.nativeElement.getBoundingClientRect();
  //     console.log(descriptionPosition);

  //       if(descriptionPosition.bottom > (descriptionPosition.height / 2)) {
  //       this._renderer.setStyle(this.avatar.nativeElement, 'transform', `translate(${ e.pageX - left }px, ${ e.pageY - top }px)`);
  //       this._renderer.setStyle(this.avatar.nativeElement, 'opacity', 0.5);
  //     }
  //     })
  //     this._renderer.listen(this.description.nativeElement, 'mouseleave', () => {
  //       this._renderer.setStyle(this.avatar.nativeElement, 'transform', 'none');
  //       this._renderer.setStyle(this.avatar.nativeElement, 'opacity', 1);
  //     })
  //   }
}
