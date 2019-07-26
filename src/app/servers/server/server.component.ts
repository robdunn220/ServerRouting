import { Component, OnInit, Input } from '@angular/core';
import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  paramsSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(Number(params.id));
      }
    );
  }

  onEdit() {
    this.router.navigate(['edit'], { queryParamsHandling: 'preserve', relativeTo: this.route });
  }
}
