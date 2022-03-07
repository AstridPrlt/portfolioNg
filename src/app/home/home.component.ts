import { animate, query, sequence, style, transition, trigger, group } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    // trigger('animationAvatar', [
    //   transition(':enter', [
    //     query(':self', style({ transform: 'translate(-50%, -50%) scale(1)' })),
    //     query(".textHello, .textWorld", style({ opacity: 0, transform: 'translateY(30px)' })),
    //     query('.avatarImg', style({ transform: 'scale(1)' })),

    //     query('.textHello', animate('600ms', style({ opacity: 1, transform: 'translateY(0)' }))),
    //     query('.textWorld', animate('500ms', style({ opacity: 1, transform: 'translateY(0)' }))),

    //     group([
    //       query('.textHello', animate('300ms', style({ opacity: 0, transform: 'skewX(-50deg) translateX(-50vw)' }))),
    //       query('.textWorld', animate('300ms', style({ opacity: 0, transform: 'skewX(50deg) translateX(50vw)' }))),
    //     ]),

    //     query('.avatarImg', animate('400ms', style({ opacity: 0, transform: 'scale(0)' }))),
    //     query(':self', style({ transform: 'scale(0)' })),
    //   ]),
    // ]),

    trigger('animationHomePage', [
      transition(':enter', [
        query('#welcomeText', style({ opacity: 0 })),
        query('.img img', style({ opacity: 0 })),
        query('#welcomeText', animate('200ms', style({ opacity: 1 }))),
        query('.img .clip1', animate('200ms ease-in', style({ opacity: 1 }))),
        query('.img .clip2', animate('200ms ease-in', style({ opacity: 1 }))),
        query('.img .clip3', animate('200ms ease-in', style({ opacity: 1 }))),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  isMenuShowed: boolean = true;

  @ViewChild('avatar') avatar!: ElementRef;
  @ViewChild('homePage') homePage!: ElementRef;

  constructor(private _renderer: Renderer2) { }

  ngOnInit(): void {

    // setTimeout(() => {
    //   // this._renderer.addClass(this.avatar.nativeElement, 'hidden');
    //   // this._renderer.removeClass(this.homePage.nativeElement, 'hidden')
    //   this.isMenuShowed = true;
    // }, 2200);
  }

}
