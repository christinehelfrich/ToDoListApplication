import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  //@Output() documentWasSelected = new EventEmitter<Document>();
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


  onNewDocument() {
    this.router.navigate(['new'], {relativeTo: this.route});
    //const newDocument = new Document('3', 'Mock New Document', "Hey you created a new doc","https://www.youtube.com/watch?v=dQw4w9WgXcQ", [])
    //this.documentService.addDocument(newDocument);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
/*
  onDocumentSelected(document: Document) {
    this.documentWasSelected.emit(document);
   }
*/
}
