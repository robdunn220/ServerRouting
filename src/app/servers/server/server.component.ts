import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  allowEdit: boolean;
  server: { id: number, name: string, status: string };
  paramsSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data
    .subscribe(
      (data: Data) => {
        this.server = data.server;
      }
    );
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams.allowedEdit === '1' ? true : false;
      }
    );
    // this.paramsSubscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(Number(params.id));
    //   }
    // );
  }

  onEdit() {
    this.router.navigate(['edit'], { queryParamsHandling: 'preserve', relativeTo: this.route });
  }
}
