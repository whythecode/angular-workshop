import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Job } from './job.interface';

@Component({
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss'],
})
export class JobSearchComponent implements OnInit {

  jobs: Job[];

  description = '';

  location = '';

  fullTime = false;

  loading = false;

  protected apiUrl = '/api/positions.json';

  constructor (protected httpClient: HttpClient) {}

  ngOnInit () {

    this.search();
  }

  public search () {

    this.loading = true;

    const params = {
      description: this.description,
      location: this.location,
      full_time: (!!this.fullTime).toString(),
    };

    this.httpClient.get<Job[]>(this.apiUrl, { params }).subscribe(jobs => {

      this.loading = false;

      this.jobs = jobs;
    });
  }
}
