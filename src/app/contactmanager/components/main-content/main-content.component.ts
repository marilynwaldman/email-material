import { Component, OnInit } from '@angular/core';
import { Sender } from '../../models/sender';
import { ActivatedRoute } from '@angular/router';
import { SenderService } from '../../services/sender.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  sender: Sender;
  constructor(
    private route: ActivatedRoute,
    private service: SenderService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 1;
      this.sender = null;

      this.service.senders.subscribe(senders => {
        if (senders.length == 0) return;

        setTimeout(() => {
          this.sender = this.service.senderById(id);
        }, 500);
      });

    })
  }

}
