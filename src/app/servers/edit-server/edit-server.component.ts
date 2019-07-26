import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  paramsSubscription: Subscription;
  server: { id: number, name: string, status: string };
  serverName: string;
  serverStatus: string;
  allowEdit = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams.allowedEdit === '1' ? true : false;
      }
    );
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(Number(params.id));
      }
    );

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
  }
}
