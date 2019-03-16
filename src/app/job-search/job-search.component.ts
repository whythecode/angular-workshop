import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Job } from './job.interface';

@Component({
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss'],
})
export class JobSearchComponent implements OnInit {

  jobs$: Observable<Job[]>;

  form = new FormGroup({
    description: new FormControl(''),
    location: new FormControl(''),
    fullTime: new FormControl(false),
  });

  loading = false;

  protected apiUrl = '/api/positions.json';

  constructor (protected httpClient: HttpClient) {}

  ngOnInit () {

    this.jobs$ = this.form.valueChanges.pipe(
      startWith(this.form.value),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.loading = false),
      map(params => this.getParams(params)),
      switchMap(params => this.httpClient.get<Job[]>(this.apiUrl, { params })),
      tap(() => this.loading = false),
    );
  }

  getParams (formObj) {

    // the GitHub API doesn't like empty params, so we only pass on the ones that are not empty

    return Object.keys(formObj).reduce((params, paramKey) => {

      const value = formObj[paramKey];

      if (value) {
        params[paramKey] = value;
      }

      return params;
    }, {});
  }
}
