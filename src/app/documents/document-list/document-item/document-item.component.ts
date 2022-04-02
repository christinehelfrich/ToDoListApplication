import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from '../../document.model';
import { DocumentService } from '../../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  documents: Document[];
  private subscription: Subscription;
  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { 

    }

  ngOnInit(): void {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents
        
      }
    )
  }



}
