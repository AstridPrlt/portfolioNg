import { animate, query, sequence, style, transition, trigger, group } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('animationHomePage', [
      transition(':enter', [
        query('#welcomeText', style({ opacity: 0 })),
        query('.img img', style({ opacity: 0 })),
        query('.img .clip1', animate('200ms ease-in-out', style({ opacity: 1 }))),
        query('.img .clip2', animate('200ms ease-in-out', style({ opacity: 1 }))),
        query('.img .clip3', animate('200ms ease-in-out', style({ opacity: 1 }))),
        query('#welcomeText', animate('200ms ease-in-out', style({ opacity: 1 }))),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  isMenuShowed: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
