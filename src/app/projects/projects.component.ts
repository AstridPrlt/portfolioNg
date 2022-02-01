import { Component, OnInit } from '@angular/core';
import { ProjectItem } from '../_models/project-item.model';
import ProjectsJson from '../../assets/projectsJson.json';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  list: ProjectItem[] = ProjectsJson;

  constructor() { }

  ngOnInit(): void {
    console.log(this.list);

  }

}
