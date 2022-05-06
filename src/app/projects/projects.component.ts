import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

}
